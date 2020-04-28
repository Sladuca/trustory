pragma solidity ^0.6.0;

contract Trustory {

  event RequestViewCert(address indexed requestor, address indexed holder, uint256 id, bytes pub);
  // URI is the hash of the private cert file that the user re-encrypted with requestor's public key
  event ApproveViewCert(address indexed requestor, address indexed holder, uint256 id, bytes32 approvalHash);

  event IssueCert(address indexed holder, address indexed institution);

  function registerInstitution(address addr) public {}

  function issueCert (
    address recipient,
    string memory pubDataURI,
    uint8 privHashFn,
    uint8 privSize,
    bytes32 privURI) public returns (uint256) {}

  function requestViewCert (address holder, bytes memory pub, uint256 id) public {}

  function approveViewCert (address requestor, uint256 id, uint8 hashFn, uint8 size, bytes32 URI) public {}

}

contract TrustoryOracle {

  address public oracleAddress;
  Trustory trustory;

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
    trustory = Trustory(_trustoryContractAddress);
  }

  function createCourse (uint256 id, uint8 hashFn, uint8 size, bytes32 URI) public onlyOracle {
    Multihash memory courseInfo = Multihash(URI, hashFn, size);
    courses[id] = courseInfo;
  }

  function issueCert (
    address recipient,
    string memory pubDataURI,
    uint8 privHashFn,
    uint8 privSize,
    bytes32 privURI) public onlyOracle returns(uint256) {
      uint256 id = trustory.issueCert(recipient, pubDataURI, privHashFn, privSize, privURI);
      return id;
    }
}