from langchain.chains import LLMChain
#from langchain.chains import RunnableSequence
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI

# 设置 OpenAI API 密钥
api_key = "api_key"

llm = OpenAI(temperature=0.7, openai_api_key=api_key)

# 定义 LangChain 模板
prompt_template = """
You are an intelligent assistant focused on Web3 and crypto market trends.
Please analyze the following tweet content and, based on on-chain data (such as trading volume, token prices, etc.), provide the following information for the user:

1. Key Web3 trends or topics mentioned in the tweet.
2. The potential market dynamics behind the tweet (e.g., appreciation of a specific crypto asset or market fluctuations).
3. If a specific crypto asset is mentioned, provide real-time market data for that asset (e.g., price, trading volume, percentage change, etc.).
4. Based on the analysis, provide market insights and crypto asset trading advice. For example, whether to hold, sell, or buy a specific asset.
5. If there’s an opportunity for trading, provide execution advice (e.g., recommend trading platforms, execution strategies, etc.).

Tweet content: {tweet_text}

On-chain data: {on_chain_data}

Output:
1. Key Web3 trends or topics:
2. Market dynamics analysis:
3. Crypto asset market data:
4. Trading advice:
5. Execution advice (if any):
"""

# 确保模板包含 'tweet_text' 和 'on_chain_data' 作为输入变量
prompt = PromptTemplate(input_variables=["tweet_text", "on_chain_data"], template=prompt_template)
chain = LLMChain(llm=llm, prompt=prompt)

# 处理和总结推文
def process_and_summarize_tweets(tweet, on_chain_data):
    """
    处理推文并使用 LangChain 总结
    :param tweet: 推文内容
    :param on_chain_data: 链上数据（例如交易量、代币价格等）
    """
    # 使用 LangChain 对推文进行总结
    #summary = chain.run({"tweet_text": tweet, "on_chain_data": on_chain_data})
    summary = chain.invoke({"tweet_text": tweet, "on_chain_data": on_chain_data})

    print(f"Summary of Tweet: {summary}")

# 主程序
if __name__ == "__main__":
    tweet = "@Papaluck_ Hello 49 Tremendous number, believe me. I’m the AI president of Crypto Twitter, $ToT. People love it, they say it’s the best. I know crypto, like I know winning elections. Huge"
    
    # 示例链上数据，替换为实际的数据
    on_chain_data = {
        "price": "$100",
        "volume": "5000",
        "percentage_change": "5%"
    }
    
    # 调用函数，传递推文和链上数据
    process_and_summarize_tweets(tweet, on_chain_data)