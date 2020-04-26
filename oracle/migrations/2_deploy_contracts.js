const Trustory = artifacts.require("Trustory");
const TrustoryOracle = artifacts.require("TrustoryOracle");


module.exports = function(deployer) {
  deployer.deploy(Trustory);
  deployer.deploy(TrustoryOracle, "0xD73Fb99c1401CE444a791fC3fa10deBb042a2F7b", "0xEDd8F76C6996645417e0D58625Fc8c8a298153C5");
};