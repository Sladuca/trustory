pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Trustory is ERC721 {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;

  address public owner;

  // struct for storing IPFS links
  struct Multihash {
    bytes32 hash;
    uint8 hash_function;
    uint8 size;
  }

  // token id's associated private encrypted data
  mapping (uint256 => Multihash) private privateInfo;

  // re-encrypted private cert data
  mapping (bytes32 => Multihash) private approvals;

  mapping (address => bool) public institutions;

  event RequestViewCert(
    address indexed requestor,
    address indexed holder,
    uint256 id, bytes pub);

  event ApproveViewCert(
    address indexed requestor,
    address indexed holder,
    uint256 id,
    bytes32 approvalHash);

  constructor () ERC721 ("Certificate", "CRT") public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(owner == address(msg.sender), "must be owner!");
    _;
  }

  modifier onlyCertHolder(uint256 id) {
    require(ownerOf(id) == address(msg.sender), "must be cert holder!");
    _;
  }

  modifier onlyInstitution() {
    require(institutions[address(msg.sender)], "must be institution!");
    _;
  }

  function registerInstitution(address addr) public onlyOwner {
    institutions[addr] = true;
  }

  function issueCert (
    address recipient,
    string memory pubDataURI,
    uint8 privHashFn,
    uint8 privSize,
    bytes32 privURI) public onlyInstitution returns (uint256) {
    _tokenIds.increment();

    uint256 newCertId = _tokenIds.current();
    _mint(recipient, newCertId);
    _setTokenURI(newCertId, pubDataURI);

    privMetadatas[newCertId] = Multihash(privURI, privHashFn, privSize);

    return newCertId;
  }

  function requestViewCert (address holder, bytes memory pub, uint256 id) public {
    // check to make sure key correctly corresponds to user
    address addrFromKey = address(bytes20(keccak256(pub))); // cast to bytes20 first since address is 20 bytes long
    require(addrFromKey == address(msg.sender), "public key and msg.sender must be consistent!");
    emit RequestViewCert(address(msg.sender), holder, id, pub);
  }

  function approveViewCert (address requestor, uint256 id, uint8 hashFn, uint8 size, bytes32 URI) public onlyCertHolder(id) {
    Multihash memory dataToView = Multihash(URI, hashFn, size);
    bytes32 approvalHash = keccak256(abi.encodePacked(requestor, id, URI));
    approvals[approvalHash] = dataToView;
    emit ApproveViewCert(requestor, address(msg.sender), id, approvalHash);
  }
}