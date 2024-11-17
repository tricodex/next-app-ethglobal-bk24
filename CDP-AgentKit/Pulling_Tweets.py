import tweepy
import pandas as pd

# Twitter API keys and tokens
BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAAYDxAEAAAAAUovwCYi15IECAzYkY0Lm4BCejkI%3DEWXYdgOQPjBdgRqJh9wNCrRgfSedDcU44nM8sV7In4BmQq7Hg6"

# Authenticate using API v2
client = tweepy.Client(bearer_token=BEARER_TOKEN)

# Search query parameters
search_query = "'Elon Musk' 'crypto' -is:retweet -is:reply"
max_results = 1  # Adjust the number of tweets to fetch

try:
    # Fetch tweets
    response = client.search_recent_tweets(query=search_query, tweet_fields=["created_at", "public_metrics", "source"], max_results=max_results)
    if response.data:
        # Process the response into a DataFrame
        attributes_container = [
            [tweet.author_id, tweet.created_at, tweet.public_metrics["like_count"], tweet.source, tweet.text]
            for tweet in response.data
        ]
        columns = ["User ID", "Date Created", "Number of Likes", "Source of Tweet", "Tweet"]
        tweets_df = pd.DataFrame(attributes_container, columns=columns)

        # Print each tweet from the DataFrame
        for index, row in tweets_df.iterrows():
            print(f"Tweet {index + 1}: {row['Tweet']}")

        # Save the DataFrame to a CSV file
        tweets_df.to_csv("tweets.csv", index=False)
        print("\nTweets saved to 'tweets.csv'.")
    else:
        print("No tweets found for the given query.")
except Exception as e:
    print("Error fetching tweets:", str(e))