SMART CONTRACT

1. Mints 4000 NFTs (40 kinds time 100 copies)
2. Send all NFTs to same wallet

DEPLOY SCRIPTS

1. deploy_nft.js -> check UPLOAD_TO_PINATA variable in .env file -> if "true" uploads img and metadata to pinata (edits metadata to include IMG location)
2. deploy_simple.js -> deploys smart contract (must manualy past URI addresses)
3. mint.js -> calls contract mint function (mints 100 NFTs and send to wallet)


