from flask import Flask, request, jsonify
from flask_cors import CORS
import execjs
import aiohttp
import requests
import os

class Config:
    """配置中心（硬编码方式）"""
    # 应用配置
    APP_CONFIG = {
        'host': '127.0.0.1',
        'port': 4718,
        'debug': True
    }
    
    # API配置
    API_URLS = {
        'search': 'https://www.copymanga.tv/api/kb/web/searchbc/comics',
        'comic_info': 'https://www.mangacopy.com/comic/{}'
    }
    
    HEADERS = {
        'accept': '*/*',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
        'referer': 'https://www.mangacopy.com/'
    }
    
    COOKIES = {
        'webp': '1',
        '_ga': 'GA1.1.602481794.1735981222',
        '_ga_SS4LL7K6CL': 'GS1.1.1740210219.12.1.1740211857.60.0.0'
    }
    
    SEARCH_PARAMS = {
        'default_limit': 12,
        'default_offset': 0,
        'default_platform': 2
    }

    def __init__(self):
        """支持环境变量覆盖"""
        self._override_with_env()
    
    def _override_with_env(self):
        """环境变量覆盖配置"""
        # 覆盖端口
        if 'APP_PORT' in os.environ:
            self.APP_CONFIG['port'] = int(os.environ['APP_PORT'])
        
        # 覆盖调试模式
        if 'APP_DEBUG' in os.environ:
            self.APP_CONFIG['debug'] = os.environ['APP_DEBUG'].lower() == 'true'

# 初始化应用
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 加载JS上下文
with open("backend/mangacopy.js", "r") as f:
    js_ctx = execjs.compile(f.read())

class MangaService:
    def __init__(self, config: Config, js_ctx):
        self.config = config
        self.js_ctx = js_ctx
        self.session = requests.Session()
        self.async_session = None  # 延迟初始化

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

    async def get_comic_info_async(self, manga_id: str) -> str:
        """异步获取漫画详情"""
        try:
            # 使用异步上下文管理器
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    self.config.API_URLS['comic_info'].format(manga_id),
                    headers=self.config.HEADERS
                ) as response:
                    response.raise_for_status()
                    return await response.text()
        except aiohttp.ClientError as e:
            app.logger.error(f"异步请求失败: {str(e)}")
            raise RuntimeError("漫画详情获取失败")

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
async def get_comic_info():
    """漫画详情接口"""
    try:
        manga_id = request.form.get('manga', '')
        data = await manga_service.get_comic_info_async(manga_id)
        return jsonify({'success': True, 'data': data})
    
    except Exception as e:
        app.logger.error(f"获取漫画信息失败: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(
        host=config.APP_CONFIG['host'],
        port=config.APP_CONFIG['port'],
        debug=config.APP_CONFIG['debug']
    )

