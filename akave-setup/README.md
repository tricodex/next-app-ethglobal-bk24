# Running AKAVE:

```bash
docker run -d \
  -p 8000:3000 \
  -e NODE_ADDRESS="connect.akave.ai:5500" \
  -e PRIVATE_KEY="0xPrivate" \
  akave/akavelink:latest
```