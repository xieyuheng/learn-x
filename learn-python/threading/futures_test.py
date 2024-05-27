import concurrent.futures
import urllib.request

urls = [
    'https://www.baidu.com/',
    'https://xieyuheng.com/',
    'https://readonly.link/'
]

def load_url(url):
    with urllib.request.urlopen(url, timeout=60) as conn:
        return conn.read()

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    print(list(executor.map(load_url, urls)))
