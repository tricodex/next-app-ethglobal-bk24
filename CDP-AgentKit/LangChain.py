import tweepy
import openai
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI

# 设置 OpenAI API 密钥
openai.api_key = "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"

# LangChain 设置
llm = OpenAI(temperature=0.7)

# 定义 LangChain 模板
prompt_template = """你是一个帮助用户分析和总结文本的助手。
请根据以下推文内容总结它的关键点，并给出简短的总结：

推文内容: {tweet_text}

简短总结: """

prompt = PromptTemplate(input_variables=["tweet_text"], template=prompt_template)
chain = LLMChain(llm=llm, prompt=prompt)

# Twitter API 配置
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAAYDxAEAAAAAUovwCYi15IECAzYkY0Lm4BCejkI%3DEWXYdgOQPjBdgRqJh9wNCrRgfSedDcU44nM8sV7In4BmQq7Hg6"

# 认证使用 API v2
client = tweepy.Client(bearer_token=BEARER_TOKEN)

# 获取推文的函数
def fetch_tweets(keyword, count=10):
    try:
        # 搜索推文
        response = client.search_recent_tweets(query=keyword, max_results=count)
        return [tweet.text for tweet in response.data] if response.data else []
    except Exception as e:
        print("Error fetching tweets:", e)
        return []

# 处理和总结推文
def process_and_summarize_tweets(keyword, count=10):
    tweets = fetch_tweets(keyword, count)
    if not tweets:
        print("No tweets found.")
        return

    for i, tweet in enumerate(tweets, 1):
        print(f"Tweet {i}: {tweet}")
        
        # 使用 LangChain 对推文进行总结
        summary = chain.run({"tweet_text": tweet})
        print(f"Summary of Tweet {i}: {summary}\n")

# 主程序
if __name__ == "__main__":
    keyword = "crypto"
    process_and_summarize_tweets(keyword, count=5)