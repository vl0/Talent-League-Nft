const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
const { storeImages, storeTokenUriMetadata } = require("../utils/uploadToPinata") // tu puca
const fs = require("fs")

const imagesLocation = "./images/"
const metadataLocation = "./metadata/"
let nftUris = [
    "ipfs://QmS5B32nYxiDzaaoet19zsNUX4iERS9Dk4ZU4yetb7wdZp",
    "ipfs://QmZWvrHjSkSoUnFsY92pKRyomy32393mGbLhp38AKykyNv",
    "ipfs://QmSNEn4VRFhBoxkhMT4ZvP78a1oGfXWDUELzNNP1xqNMS1",
    "ipfs://QmVHcimxeKNdUEV9p6Pr72C64f6kW8wbLU65n5VntdSygd",
    "ipfs://Qmd4GY63159kvdgJKCbXys2AgnkdE7H9axmYKSgdLa3Wp4",
    "ipfs://QmZ1Y8qcg4feqw4C1vtSvSAnVQHM4g7Dx8dKHByvMfs1gr",
    "ipfs://QmcNwBPJmaDc2fNNaCochKZ6DK2bHK3j9Z7Ai3bgFQfKez",
    "ipfs://QmejWYjnLQ6qrEBRgtWQqZfaPEZWMDbAcUo55uaR8N9azH",
    "ipfs://QmfDqUfZ85WHiH88gME1yhsxZA6pYKYdWBMLbMeTEorL15",
    "ipfs://QmTKnNLvTkMu58KWS9sVHtkhzrqXFP6WQVH19HHVgbpJZW",
    "ipfs://QmQmnpeLBKdiE71B9fxZWZ8vPKVgpVGt7G28jLgGrwWxkA",
    "ipfs://QmWCs5wxnZbcuyvyACRfm45vB3anuKUhyWXUqrrYPHk2Zf",
    "ipfs://QmfNHcYh4PP4KwGiVqmE658ftRvYD7EdNo3skctDqPkjgb",
    "ipfs://QmSW1WNWY3XiEbqVdkQUQTyC6PzDzMDm79uUccq5617ohA",
    "ipfs://QmRTHBmzLbTKsHCZg5JUxDLxfbrwqfhAbGLEHo5gJsBvnW",
    "ipfs://QmdeoRA3w1rvV3wfTTvmT6wxGQevMnai5Yi3sLpd48chsF",
    "ipfs://QmfYFgLu16GGN42KHDC4tib7gAGpiAkoFJ5RgV7WNkAwF8",
    "ipfs://QmcbdcKnXrd4H8FKstBDrNJbitwpLjpxRHWpPMW5iavazY",
    "ipfs://QmZjB7ve5QKE45ZNkNZ3qHmFTK6ivR3ah1yvEAy3uvSpA6",
    "ipfs://QmVXBHJyVVxa7bQEdeyLgKbjP4N3Q33jzfudGU6cFfkDfX",
    "ipfs://QmYQLP231CLUvMimsC1248mjJKn4WZg3PG9bArLR7TyAkD",
    "ipfs://QmPZHziADwfvJUz1shm4aWzwtAk4jqcVsH7oEq6Xtt6vU2",
    "ipfs://QmaVvhiYdv6ZWoj88TEyRMxcifLq2nwCi4Rzsccj7GFkwK",
    "ipfs://QmWfFMQvxDwg2LcTMyZw1kJsoqMu3Hu1sYuzLQFG3yysqv",
    "ipfs://QmZEwn7YPjoEqfqHBS3qBXbTHu9JUrqxupVGD7ywxAravY",
    "ipfs://QmcBhCT1r5jzJSHfdET6kHvFfe1ffjoDHMb6a5DDJoueBZ",
    "ipfs://QmRXrr9qfcKs3GtMBCRjUUhsX9VgCxWj8xUfXWEAb4fQVe",
    "ipfs://QmUHKpDYfPWvsF64duT22ZmLQoBXHa7TTkBBE1HDTz2SpN",
    "ipfs://QmVYpDykdTqtZXMVwgwmrsCnRpAHJjD7W2GmUXzsbgk9sh",
    "ipfs://QmeFXPbQyhKsVhp8ec5JteAYT4ptuqnZNCaeyYnpZoqZuu",
    "ipfs://QmPBfBeireHzyUzxYNJazmneqVdpmvQJraCX38WWxGDGVJ",
    "ipfs://QmUTnRqF5tS9tJfCd7xw9uak1BdzN1dkoqt5xXaPG5GSho",
    "ipfs://QmaJYPkjXEZJpmZYQezvFHaJjZcTh8Tf8sTXRSrtGRygtS",
    "ipfs://QmZxcFVruRnpdpwBGvTC6Gy5hzpiz1f22gi4b5A8yoHV46",
    "ipfs://QmXktNwrpntMF4FLRAb87wxeDGYVskyEAT57v3EZT9iGBZ",
    "ipfs://QmPtyDu7HjMvxMsdbZSSrX7fC7mwMoXdDDtn5WZ6YoiY4P",
    "ipfs://QmSjhhSftFj3wnwirUFsW6RB39NQ4uJQCcoiYLNeJcxiba",
    "ipfs://QmfGQECdwTxY1NUpP9ommgBDXtHfCXnxirEgS6CYrGXiaA",
    "ipfs://QmWaxEprVom5VLyvg1Lg8vpiqVwTkFzMJr4ZNyWBBaNqNE",
    "ipfs://QmRjKqeQkhJuWWFNZMibpPhhs2zozW3KACQKSBi5FuBu42",
]

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    await storeImages(imagesLocation)
    if (process.env.UPLOAD_TO_PINATA == "true") {
        nftUris = await handleTokenUris()
    }

    const args = [nftUris]

    const NFT = await deploy("talentLeague", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("-----------------------------")

    if (!developmentChains.includes(network.name) && process.env.POLYGONSCAN_API_KEY) {
        log("Verifying...")
        await verify(NFT.address, args)
    }
}

async function handleTokenUris() {
    nftUris = []
    imageUri = []
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    for (imageUploadResponseIndex in imageUploadResponses) {
        const metadata = JSON.parse(
            fs.readFileSync(
                `${metadataLocation}/${Number.parseInt(imageUploadResponseIndex, 10) + 1}.json`
            )
        )
        metadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
        const metadataUploadResponse = await storeTokenUriMetadata(metadata)
        nftUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs uploaded! They are: ")
    console.log(nftUris)
    return nftUris
}

module.exports.tags = ["all", "main", "nft"]
