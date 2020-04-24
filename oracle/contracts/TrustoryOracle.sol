pragma solidity ^0.6.0;

contract TrustoryOracle {

  address public oracleAddress;
  address public trustoryContractAddress;

  struct Multihash {
    bytes32 hash;
    uint8 hash_function;
    uint8 size;
  }

  mapping(uint256 => Multihash) courses;

  modifier onlyOracle {
    require(address(msg.sender) == oracleAddress, "only oracle is allowed to perform this action");
    _;
  }

  constructor (address _oracleAddress, address _trustoryContractAddress) public {
    oracleAddress = _oracleAddress;
    trustoryContractAddress = _trustoryContractAddress;
  }

  function createCourse (uint256 id, uint8 hashFn, uint8 size, bytes32 URI) public onlyOracle {
    Multihash memory courseInfo = Multihash(URI, hashFn, size);
    courses[id] = courseInfo;
  }

  function issueCert (uint256 id, address recipient) public onlyOracle {
    // call main contract
  }
}