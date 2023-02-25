// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.7;

contract talentLeague is ERC721URIStorage, Ownable {
    address public _contractOwner;
    uint256 private constant TOTAL_SUPPLY = 4000; // max number of NFTs
    uint256 private s_tokenCounter; // counts number of minted NFTs
    string[] internal s_nftURIS;

    enum Type {
        LIAM,
        WILLIAM,
        NOAH,
        JAMES,
        OLIVER,
        EMMA,
        OLIVIA,
        AVA,
        ISABELLA,
        SOPHIA,
        BENJAMIN,
        ELIJAH,
        LUCAS,
        MASON,
        ETHAN,
        MIA,
        CHARLOTTE,
        AMELIA,
        HARPER,
        EVELYN,
        ALEXANDER,
        JACOB,
        MICHAEL,
        DANIEL,
        HENRY,
        ABIGAIL,
        EMILY,
        ELIZABETH,
        LARA,
        AVERY,
        JACKSON,
        SEBASTIAN,
        AIDEN,
        MATTHEW,
        SAMUEL,
        ELLA,
        SCARLETT,
        GRACE,
        CHOLE,
        VICTORIA
    }

    event Minted(address indexed minter, uint nftID, Type tokenURI);

    constructor(string[40] memory nftUris) ERC721("talentLeague", "LEAGUE") {
        _contractOwner = msg.sender; //makes deployer of contract the owner
        s_tokenCounter = 0; // sets token counter to 0
        s_nftURIS = nftUris; //
    }

    function _mintNFTs() public onlyOwner {
        //adress passed has to be contract owner address
        for (uint256 counter = 1; counter <= 100; counter++) {
            require(s_tokenCounter <= TOTAL_SUPPLY, "Mint limit reached");

            Type NftType = getTypeFromModdedCounter(s_tokenCounter);

            _safeMint(_contractOwner, s_tokenCounter);
            _setTokenURI(s_tokenCounter, s_nftURIS[uint256(NftType)]);
            s_tokenCounter = s_tokenCounter + 1;

            emit Minted(_contractOwner, s_tokenCounter, NftType);
        }
    }

    /**
     * Sets NFT URI based on NFT id
     */
    function getTypeFromModdedCounter(uint256 tokenCounter) public pure returns (Type) {
        uint256 i = tokenCounter % 40;
        return Type(i);
        // 1 -> type 1
        // 2 -> type 2
        // 40 -> type 40
        // 41 -> type 1
    }

    // Funtion to return number of NFTs
    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }

    // Probably useless
    function getNftTokenUri(uint256 index) public view returns (string memory) {
        return s_nftURIS[index];
    }
}
