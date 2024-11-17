from cdp import *
import os


if __name__ == "__main__":

    # Get configuration from environment variables
    API_KEY_NAME = os.environ.get("CDP_API_KEY_NAME")
    PRIVATE_KEY = os.environ.get("CDP_PRIVATE_KEY", "").replace('\\n', '\n')

    # Configure CDP with environment variables
    Cdp.configure(API_KEY_NAME, PRIVATE_KEY)

    
    wallet = Wallet.fetch("2b3c63d4-5d58-4c89-b57c-a95efcff17c0")
    wallet.load_seed("wallet_seed.json")

    abi = [
      {
        "inputs": [
          {"internalType": "address", "name": "to", "type": "address"},
          {"internalType": "string", "name": "tokenId", "type": "string"}
        ],
        "name": "mint",
        "type": "function"
      }
    ]
    
    invocation = wallet.invoke_contract(
      contract_address="0xccd02527118641a9623Ae433D070c6cbE2C5773e",
      abi=abi,
      method="transfer",
      args={"to": "0x4F0a252f8D50a779ffCF265A8BC5c84517346E6A", "tokenId": "1"}
    )
    
    invocation.wait()


