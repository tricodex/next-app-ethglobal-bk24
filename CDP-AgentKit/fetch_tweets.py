import tweepy

# 1. Twitter API 配置
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAAYDxAEAAAAAUovwCYi15IECAzYkY0Lm4BCejkI%3DEWXYdgOQPjBdgRqJh9wNCrRgfSedDcU44nM8sV7In4BmQq7Hg6"  # 用你的 Bearer Token 替换

# 2. 认证使用 API v2
client = tweepy.Client(bearer_token=BEARER_TOKEN)

# 3. 获取推文的函数
def fetch_tweets(keyword, count=50):
    """
    从 Twitter 获取指定关键词的推文
    :param keyword: 搜索关键词
    :param count: 获取的推文数量
    :return: 推文列表
    """
    try:
        # 使用 client.search_recent_tweets 搜索推文
        response = client.search_recent_tweets(query=keyword, max_results=count)
        
        # 提取推文文本
        tweets = [tweet.text for tweet in response.data] if response.data else []
        return tweets
    except Exception as e:
        print("Error fetching tweets:", e)
        return []

# 4. 主程序
if __name__ == "__main__":
    keyword = "crypto"  # 搜索关键词
    count = 10  # 获取推文数量
    tweets = fetch_tweets(keyword, count)  # 获取推文
    print(f"Fetched {len(tweets)} Tweets for keyword '{keyword}':")
    for i, tweet in enumerate(tweets, 1):
        print(f"{i}: {tweet}")