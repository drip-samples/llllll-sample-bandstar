# BandStar - |||||| sample DApp

This is [|||||| - 6 pillars](https://github.com/drip-oss/llllll) sample DApps.

Works on Github Pages https://drip-samples.github.io/llllll-sample-bandstar/

# Develop

### Environment

- [React](https://reactjs.org/)
- [Truffle](https://truffleframework.com/truffle)
- [Ganache](https://truffleframework.com/ganache)

### Setup

```
# frontend setup
yarn install

# local blockchain setup with Ganache GUI
npm run truffle_compile
npm run truffle_migrate
```

### Run

```
yarn start
```

Check 'http://localhost:3000' on browsers with Ethereum Wallet function.

### Smart Contract

- Ropsten
  - [0x26addb72ab35fad08a895cfe717c5ff312a0f699](https://ropsten.etherscan.io/address/0x26addb72ab35fad08a895cfe717c5ff312a0f699)
- Rinkeby
  - [0xcdc2f9e5b782e421f6188736bd294ee5c716db2f](https://rinkeby.etherscan.io/address/0xcdc2f9e5b782e421f6188736bd294ee5c716db2f)
  - Old : [0xcdc2f9e5b782e421f6188736bd294ee5c716db2f](https://rinkeby.etherscan.io/address/0xcdc2f9e5b782e421f6188736bd294ee5c716db2f)
- Kovan
  - [0x4f56b13e58577d67793eda79f48dd670c399a130](https://kovan.etherscan.io/address/0x4f56b13e58577d67793eda79f48dd670c399a130)
  - Old : [0x4f56b13e58577d67793eda79f48dd670c399a130](https://kovan.etherscan.io/address/0x4f56b13e58577d67793eda79f48dd670c399a130)

The file setting smart contracts in frontend is `/src/enums/ContractData.js`.
