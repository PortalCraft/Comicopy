import json

from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import execjs
import aiohttp
import requests

import os

from config import Config

# 初始化应用
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 加载JS上下文
with open("mangacopy.js", "r") as f:
    js_ctx = execjs.compile(f.read())

class MangaService:
    def __init__(self, config: Config, js_ctx):
        self.config = config
        self.js_ctx = js_ctx
        self.session = requests.Session()
        self.async_session = None  # 延迟初始化

        with open("./mangacopy.js", "r") as f:
            js = f.read()
        self.__ctx: execjs._external_runtime.ExternalRuntime.Context = execjs.compile(js)

    def search_manga(self, params: dict) -> list:
        """执行搜索请求"""
        try:
            response = self.session.get(
                self.config.API_URLS['search'],
                params=params,
                cookies=self.config.COOKIES,
                headers=self.config.HEADERS
            )
            response.raise_for_status()
            return response.json()['results']
        except requests.RequestException as e:
            app.logger.error(f"搜索请求异常: {str(e)}")
            raise RuntimeError("搜索服务暂时不可用")

    def get_comic_info(self, manga_id: str) -> str:
        """异步获取漫画详情"""
        try:
            response = self.session.get(
                self.config.API_URLS['comic_info'].format(manga_id),
                headers=self.config.HEADERS
            )
            response.raise_for_status()
            encrypt_data = response.json()['results']
            decrypt_url = json.loads(self.__ctx.call('decrypt', encrypt_data))
            return decrypt_url
        except requests.exceptions.RequestException as e:
            app.logger.error(f"异步请求失败: {str(e)}")
            raise RuntimeError("漫画详情获取失败")

    def get_chapter_info(self, manga_id, chapter_id):
        try:
            response = self.session.get(
                self.config.API_URLS['chapter_info'].format(manga_id, chapter_id),
                headers=self.config.HEADERS
            )
            response.raise_for_status()
            data = response.text
            bs = BeautifulSoup(data, 'html.parser')

            # 获取存在页面里的图片地址加密数据，并解密
            image_data = bs.select_one("div.imageData").attrs["contentkey"]
            images_path = self.__ctx.call("decrypt_image_paths", image_data)
            result_images_path = []
            for idx, url in enumerate(images_path):
                result_images_path.append({
                    'order': idx+1,
                    'url': url
                })
            return result_images_path
        except requests.exceptions.RequestException as e:
            app.logger.error(f"异步请求失败: {str(e)}")
            raise RuntimeError("章节详情获取失败")

# 初始化服务实例
config = Config()
manga_service = MangaService(config, js_ctx)

@app.route('/api/search', methods=['POST'])
def search():
    """搜索接口"""
    try:
        params = {
            'offset': request.form.get('offset', str(config.SEARCH_PARAMS['default_offset'])),
            'platform': request.form.get('platform', str(config.SEARCH_PARAMS['default_platform'])),
            'limit': request.form.get('limit', str(config.SEARCH_PARAMS['default_limit'])),
            'q': request.form.get('manga', ''),
            'q_type': ''
        }
        results = manga_service.search_manga(params)
        return jsonify({'success': True, 'data': results})
    
    except Exception as e:
        app.logger.error(f"搜索失败: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/info', methods=['POST'])
def get_comic_info():
    """漫画详情接口"""
    try:
        manga_id = request.form.get('manga', '')
        data = manga_service.get_comic_info(manga_id)
        return jsonify({'success': True, 'data': data})
    
    except Exception as e:
        app.logger.error(f"获取漫画信息失败: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/chapter', methods=['POST'])
def get_chapter_info():
    """漫画详情接口"""
    try:
        manga_id = request.form.get('manga', '')
        chapter_id = request.form.get('chapter','')
        data = manga_service.get_chapter_info(manga_id, chapter_id)
        return jsonify({'success': True, 'data': data})

    except Exception as e:
        app.logger.error(f"获取章节信息失败: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(
        host=config.APP_CONFIG['host'],
        port=config.APP_CONFIG['port'],
        debug=config.APP_CONFIG['debug']
    )

