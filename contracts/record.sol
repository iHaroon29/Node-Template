// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MedicalRecord {
    struct medicalRecord {
        address ownerAddress;
        bytes32 hash;
        string info;
        uint256 id;
    }

    struct accessRecord {
        address ownerAddress;
        string hash;
        uint validity;
        string info;
    }

    mapping(address => string[]) private hashCollection;
    mapping(address => medicalRecord[]) public recordCollection;
    mapping(address => accessRecord[]) private accessCollection;

    function addRecordAuthority(
        string memory _ipfsHash,
        address _patientAddress,
        string memory _identifier
    ) public payable returns (uint256) {
        hashCollection[_patientAddress].push(_ipfsHash);
        bytes32 hashValue = keccak256(abi.encode(_ipfsHash));
        medicalRecord memory newRecord = medicalRecord(
            _patientAddress,
            hashValue,
            _identifier,
            hashCollection[_patientAddress].length
        );
        recordCollection[_patientAddress].push(newRecord);
        return recordCollection[_patientAddress].length;
    }

    function viewColletionOwner(
        uint256 _id
    ) public view returns (string memory) {
        return hashCollection[msg.sender][_id];
    }

    function viewRecordOwner(
        uint256 _id
    ) public view returns (medicalRecord memory) {
        return recordCollection[msg.sender][_id];
    }

    function findRecordCount(
        address _patientAddress
    ) public view returns (uint256) {
        return recordCollection[_patientAddress].length;
    }

    function verifyHash(
        bytes32 _hash,
        address _patientAddress,
        uint256 _id
    ) public view returns (bool) {
        bytes32 hashValue = keccak256(
            abi.encode(hashCollection[_patientAddress][_id])
        );
        if (_hash == hashValue) {
            return true;
        } else {
            return false;
        }
    }

    function provideAccess(
        address _address,
        string memory _ipfsHash,
        string memory _info
    ) public payable returns (accessRecord memory) {
        uint timeNow = block.timestamp + 5 days;
        accessRecord memory record = accessRecord(
            msg.sender,
            _ipfsHash,
            timeNow,
            _info
        );
        accessCollection[_address].push(record);
        return record;
    }

    function verifyValidity(uint256 _id) public view returns (bool) {
        if (accessCollection[msg.sender][_id].validity < block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function fetchAccessRecordCount() public view returns (uint256) {
        return accessCollection[msg.sender].length;
    }

    function fetchAccessCollection(
        uint256 _id
    ) public view returns (accessRecord memory) {
        return accessCollection[msg.sender][_id];
    }

    function fetchAccessRecord(
        string memory _ipfsHash,
        uint256 _id
    ) public view returns (string memory) {
        if (
            keccak256(bytes(accessCollection[msg.sender][_id].hash)) ==
            keccak256(bytes(_ipfsHash))
        ) {
            return _ipfsHash;
        }
        return "Not Found";
    }
}
