from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # 生产环境应指定具体域名

cookies = {
    'webp': '1',
    '_ga': 'GA1.1.602481794.1735981222',
    '_ga_SS4LL7K6CL': 'GS1.1.1740210219.12.1.1740211857.60.0.0',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'priority': 'u=1, i',
    'referer': 'https://www.copymanga.tv/search?q=%E8%BF%B7%E5%AE%AE%E5%B9%B2&q_type=',
    'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0'
}




# 定义API接口
@app.route('/api/search', methods=['POST'])
def search():
    # 获取表单数据
    manga = request.form.get('manga', default='')
    limit = request.form.get('limit', default=12)
    offset = request.form.get('offset', default='0')
    platform = request.form.get('platform', default='2')
    try:
        params = {
            'offset': offset,
            'platform': platform,
            'limit': limit,
            'q': manga,
            'q_type': '',
        }
        response = requests.get('https://www.copymanga.tv/api/kb/web/searchbc/comics', params=params, cookies=cookies,
                                headers=headers).json()
        results = response['results']
        print(response)
        return jsonify({
            'success': True,
            'data': results
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=4718)

