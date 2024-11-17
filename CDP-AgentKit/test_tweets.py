import tweepy


API_KEY = "c71lW9FG45zJIHzQV9OccjlJ9"
API_SECRET = "yxpioUp9f0jp6Bw5fuBN8g0n36ureTk2jV1cBlx72iBd3oHCpn"
ACCESS_TOKEN = "1479793321950150659-crZeudfoglPDa6ueswk6Aw10QhsxAw"
ACCESS_SECRET = "R0L0jH5Omx7OYcZmYHwC6TY8KtKzbDo81fSTNBhny2fbp"

# Authenticate using API v2
client = tweepy.Client(bearer_token="bearer_token")

# Search tweets using v2
try:
    response = client.search_recent_tweets(query="crypto", max_results=1)
    for tweet in response.data:
        print(tweet.text)
except Exception as e:
    print("Error fetching tweets:", e)
