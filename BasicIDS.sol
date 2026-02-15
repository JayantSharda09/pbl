// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicIDS {
    struct Alert {
        string attackType;
        uint timestamp;
    }

    Alert[] public alerts;

    function logAttack(string memory _attackType) public {
        alerts.push(Alert(_attackType, block.timestamp));
    }

    function getAlertsCount() public view returns (uint) {
        return alerts.length;
    }
}


