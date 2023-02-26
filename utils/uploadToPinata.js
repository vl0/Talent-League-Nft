const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY
const pinataApiSecret = process.env.PINATA_API_SECRET
const pinata = new pinataSDK(pinataApiKey, pinataApiSecret) // to work with pinata you need to pass apikey and api secret

const naturalSort = (a, b) => {
    const aNum = parseInt(a.replace(".png", ""))
    const bNum = parseInt(b.replace(".png", ""))
    return aNum - bNum
}

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)
    const filesSorted = files.sort(naturalSort)
    console.log(filesSorted)
    let responses = [] //responses from pinata server
    console.log("Uploading to Pinata!")
    for (fileIndex in filesSorted) {
        console.log("Working on ${fileIndex}...")
        const readableStreamForFile = fs.createReadStream(
            `${fullImagesPath}/${filesSorted[fileIndex]}`
        )

        const options = {
            pinataMetadata: {
                name: filesSorted[fileIndex],
            },
        }
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile, options)
            responses.push(response)
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, filesSorted }
}

async function storeTokenUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}
module.exports = { storeImages, storeTokenUriMetadata }
