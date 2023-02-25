const { network, ethers } = require("hardhat")

module.exports = async ({ getNamedAccounts }) => {
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const talentLeague = await ethers.getContract("talentLeague", deployer)
    const talentLeagueMint = await talentLeague._mintNFTs()
    await talentLeagueMint.wait(1)
}

module.exports.tags = ["mint"]
