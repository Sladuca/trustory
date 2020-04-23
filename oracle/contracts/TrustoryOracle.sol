pragma solidity ^0.4.24;

contract TrustoryOracle {

  address public oracleAddress;
  address public trustoryContractAddress;

  modifier onlyOracle {
    require(msg.sender == oracleAddress, "only oracle is allowed to perform this action");
    _;
  }

  constructor (address _oracleAddress, address _trustoryContractAddress) public {
    oracleAddress = _oracleAddress;
    trustoryContractAddress = _trustoryContractAddress;
  }

  function createCourse (uint internalId, string ipfsDataHash) public onlyOracle {
    // call main contract
  }

  function issueCert (uint internalId, address recipient) public onlyOracle {
    // call main contract
  }
}