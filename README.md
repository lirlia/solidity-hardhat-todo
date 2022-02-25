# Solidity Todo List with Hardhat

![preview](https://raw.githubusercontent.com/lirlia/medium/main/articles/2022-solidity-todo/images/preview.gif)

HTML base TODO List, Backend DB is Ethereum(Hardhat).

## Requirement

Please install these tools

- [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ja)
- [Hardhat](https://hardhat.org/getting-started/)

## How to run

- Login `MetaMask` in Chrome (use Hardhat Network)
- Deploy Contract

```sh
❯ npx hardhat node

Another terminal
❯ npx hardhat compile
❯ npx hardhat run scripts/sample-script.js
```

- Change contractAddress to "todo contract address" in [frontend/contract.js](frontend/contract.js)
- Run LocalServer(like VScode LiveServer)
- Access LocalServer(ex: VScode LiveServer )
- Add Account in Metamask (created by Hardhat)
