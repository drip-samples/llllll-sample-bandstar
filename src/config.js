const ethereum = {
  host: null,
  port: null,
  networkId: null,
  gas: null,
  gasPrice: null,
  SixPillars: {},
  BandStar: {},
}

let SixPillars
let BandStar

switch (process.env.REACT_APP_ENV) {
  default:
    ethereum.host = "localhost"
    ethereum.port = 7545
    ethereum.networkId = 5777
    ethereum.gas = 6721975
    ethereum.gasPrice = 20000000000
    SixPillars = require("./contracts/SixPillars.json")
    BandStar = require("./contracts/BandStar.json")
    break
}

ethereum.SixPillars.abi = SixPillars['abi']
ethereum.SixPillars.address = SixPillars['networks'][String(ethereum.networkId)]['address']
ethereum.BandStar.abi = BandStar['abi']
ethereum.BandStar.address = BandStar['networks'][String(ethereum.networkId)]['address']

const config = {
  ethereum,
}

export default config
