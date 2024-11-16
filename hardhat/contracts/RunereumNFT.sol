// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract RunereumNFT is ERC721URIStorage, Ownable {
    uint256 private _currentTokenId = 0;

    event TokenUriEvents(
        uint256 indexed tokenId,
        string imageUri,
        string attributesUri
    );

    constructor(
        string memory _name,
        string memory _symbol,
        address initialOwner
    ) ERC721(_name, _symbol) Ownable(initialOwner) {}

    function mint(address player) public onlyOwner returns (uint256) {
        _currentTokenId++;

        uint256 newItemId = _currentTokenId;
        _mint(player, newItemId);

        return newItemId;
    }

    function setUris(
        uint256 tokenId,
        string memory imageUri,
        string memory attributesUri
    ) public onlyOwner {
        emit TokenUriEvents(tokenId, imageUri, attributesUri);
        _setTokenURI(tokenId, imageUri);
    }
}
