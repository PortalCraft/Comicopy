class Config:
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
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
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

# 使用方式
from config import Config
print(Config.API_URLS['search']) 