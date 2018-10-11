const Insect = artifacts.require("Insect");

module.exports = function(deployer) {
  deployer.deploy(Insect);
};
