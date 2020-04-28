const Trustory = artifacts.require("Trustory");
const TrustoryOracle = artifacts.require("TrustoryOracle");


module.exports = function(deployer) {
  deployer.deploy(Trustory);
  deployer.deploy(TrustoryOracle, "0xD583F257c6DFC9d48AFC06E535383611AD24bA0a", "0x3F14Eb90071552021AC5d82e4f0Bde0fCe6C2c90");
};