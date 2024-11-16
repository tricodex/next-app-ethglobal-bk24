// Source for this code: https://hackathon-docs.akave.ai/js-docker-example-code

import axios from "axios";

// AWS Public IP:
const API_BASE_URL = "http://54.242.102.133:8000";

async function apiRequest(method, endpoint, data) {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
}

apiRequest("POST", "/buckets", { bucketName: "myBucket3" });
