require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  // https://hardhat.org/metamask-issue.html
  networks: {
    hardhat: {
      chainId: 1338
    },
  }
};
