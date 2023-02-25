const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("Mint NFTs Function", function () {
    let owner, recipient

    before(async function () {
        ;[owner, recipient] = await ethers.getSigners()
    })

    it("Should check starting ballence NFT should be zero", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", recipient.address)
        //const startingSupply = await contract.functions.getTokenCounter()
        const startingSupply = await contract.getTokenCounter()
        //expect(startingSupply).to.equal(0)
        expect(startingSupply.toNumber()).to.equal(0)
    })

    it("Should mint NFTs to the recipient", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", owner.address)
        const totalSupplyBefore = await contract.getTokenCounter()
        await contract._mintNFTs()
        const totalSupplyAfter = await contract.getTokenCounter()
        expect(totalSupplyAfter.sub(totalSupplyBefore)).to.be.equal(100)
    })

    it("Should fail if the recipient address is not the contract owner", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", owner.address)

        try {
            await contract.functions._mintNFTs()
        } catch (error) {
            expect(error.message).to.include("Only the contract owner can mint NFTs")
        }
    })

    it("Should fail if the mint limit has been reached", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", owner.address)
        //const s_tokenCounter = 250

        try {
            await contract._mintNFTs()
        } catch (error) {
            expect(error.message).to.include("Mint limit reached")
        }
    })
    it("Should fail if limit has been reached", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", owner.address)

        // Set the TOTAL_SUPPLY limit to 10 for testing purposes
        for (let i = 0; i < 3; i++) {
            await contract.functions._mintNFTs()
        }
    })
    it("Should return type ", async function () {
        await deployments.fixture("all")
        const contract = await ethers.getContract("talentLeague", owner.address)

        //
        const expectedValue = await contract.getTypeFromModdedCounter(2)
        assert.equal(2, expectedValue)
    })
})
