const Trustory = artifacts.require("Trustory");
const TrustoryOracle = artifacts.require("TrustoryOracle");


module.exports = function(deployer) {
  deployer.deploy(Trustory);
  deployer.deploy(TrustoryOracle, "ORACLE_ADDRESS", "TRUSTORY_CONTRACT_ADDRESS");
};