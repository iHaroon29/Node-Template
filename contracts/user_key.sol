// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract UserKey {
    mapping(address => string) private Key;

    function saveUserKey(string memory _path) public {
        Key[msg.sender] = _path;
    }

    function viewKey(address _address) public view returns (string memory) {
        return Key[_address];
    }
}
