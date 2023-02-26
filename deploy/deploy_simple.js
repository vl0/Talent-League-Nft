const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    let nftUris = [
        "ipfs://QmS5B32nYxiDzaaoet19zsNUX4iERS9Dk4ZU4yetb7wdZp",
        "ipfs://QmRchz73ADkJLfAn5JyQZK25FSEtXxwt9wmUYa9J4Gin1L",
        "ipfs://QmQiY4kgSXer4qqHrtSGN3AVprwEu9twPe3qdhjH8ZUy9f",
        "ipfs://QmaKPfFggnUCgkMDxG23DFzhq7Nt2BMccAqjxrgv7NLKik",
        "ipfs://QmVZ5mLAGbEFGtnSpHo7WMLva25igYpRBiyaL6H7sFRyWD",
        "ipfs://QmRxbn2m3UZu7jJURZJf6Rps8QSiDdbm6HFuJ8fTVZpm7L",
        "ipfs://QmU92AAJDmVAaLrMriYoiQrnHaktT5gkw1FfLq4UoWSLmN",
        "ipfs://QmYRQRD2CnDCRn5jqttrWHTdh4mSLQShJjQCDWLokiRDEz",
        "ipfs://QmVAcCiQENB6tS8u6dt9JniEeyq59NhUQ7A9kML9k2s52r",
        "ipfs://QmTUtch9FjbF6VAZDXMB9Yr1sgoUNH3kZZ4ByLbDDFc4sY",
        "ipfs://QmPVpB6dtPLd5m32fwzdEmCzbWQTue9eHzsu6sm2VK5Fso",
        "ipfs://Qma8GBhyLeHJSJN1w1MCcZnorPfmge6SxGTBMp4BGv5wED",
        "ipfs://QmU3ijUYv2h5XCjC6KGcXqgRXHvsuRB12L1nvKzNcsNDp2",
        "ipfs://QmaGFmCvTiRShME8NdZ4SPbzxJuRTp2Y8SYr8dV25V8Aec",
        "ipfs://QmcmYkBiB6XhHNdEFWZbqTHpMJi1kxBeM79hMpMmLgE3GT",
        "ipfs://QmZwGsSzeuTcpb8BGL6fHY1MfcXqkfqmgUzHTrfYCHiMPB",
        "ipfs://Qmb1h69UG3X1sRiF4UY5Z7qqpq9Hr6obDTyq2SyZG6kdKu",
        "ipfs://QmeTL4a9cimopfLas7opDJWHpSi6jUv3k8HV8RYrrxatM5",
        "ipfs://QmXi3T7c8eSoZeGnS37yLxoA9k65WX37THybbBUFqvjxBX",
        "ipfs://QmPxxQNye1uY54VAcaPzRgU7D44FP2f3YnmXdUSZZNiW5j",
        "ipfs://QmedHQ2qDUuezpEp3WngCN55BP7FYXy7sDqjMfUK8A7mCE",
        "ipfs://QmYDPygjQ2XhXBY8ptcaE1kc8i9bNgRyfm45k9ve1bLvWu",
        "ipfs://Qmbt7LipKDK6LnAJuLHv8nQLUTSLn4Gsic2tgtCD2SuyCL",
        "ipfs://QmcyheXZmS93KTzzhG97b6oDzmpSpP5UDWA6Jm6Egwtvc7",
        "ipfs://QmPA5ZJLTW6k9iFCt8yBEBd3ASK8ECTRogfExWKPzfzTED",
        "ipfs://QmPR1C32uHVz6Pcorq5JzSJqSxrqJQt4ChtACWGgtFmwi1",
        "ipfs://QmT8McG5W4ARPN3gixcU5CLfP6Ge1QPw13U78FmWQhUihx",
        "ipfs://QmbPq5zSZtemPDwcWCjzQXVSikdcBKBot1EsLV6virEW7J",
        "ipfs://QmcoygVtBD3Vp48eheEn7xcow6rNE3d9seZhGqWkmt8ajp",
        "ipfs://QmUzMy8gsoZ9dgJfj5vuK6DUZWv8eiUpUvapK9nhKsLMXM",
        "ipfs://QmXJuf1mZNWLMbjFvoWfgAzgpAgWLwaXqN3eUt8mwnj9PS",
        "ipfs://QmPBjD6ZxmdJvY2Mk2PXNpcohfv76VzqYDykKRoXhH3aJA",
        "ipfs://QmemL5Wqev97ppURnZHK1qazMQa7WE6cW7AiEHVMMnovkY",
        "ipfs://QmeNCuNGQczzicF4Gr6qUofyxKLxiYYjMafxWebMhkx2qa",
        "ipfs://QmQafA3WSwC7wh2tzCrfQuE5QrxRtySDWjqk9K9NWsLAjz",
        "ipfs://QmfAoHetjp5M87rxp2bWB55bhFhrft9tAF5zS6JbYJoEJw",
        "ipfs://QmaZfn8cTbjeCoCZc2EhLdB8H8oiCCX1NAhzTKfuS6ChZa",
        "ipfs://QmZvr2WL43xgpjvHNreVhDaghxYLpjiLHqo6F75snjFHev",
        "ipfs://QmVJWJxTmk4pAd8HHmaxp6ZiXM3QUdVG2JCFAEgynSkVhP",
        "ipfs://QmXFseXuhn9xkrem55hEDiggiuRGZkLs6nY4XLMHLvZrh4",
    ]

    console.log("----------------------------------------------------")
    arguments = [nftUris]
    const basicNft = await deploy("talentLeague", {
        from: deployer,
        args: arguments,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    console.log(basicNft.address)

    // Verify the deployment

    //log("Verifying...")
    //await verify(basicNft.address, arguments)
}

module.exports.tags = ["all", "basic", "main"]
