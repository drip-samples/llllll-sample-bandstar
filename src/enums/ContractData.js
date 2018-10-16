const SixPillars = require("../contracts/SixPillars.json")
const BandStar = require("../contracts/BandStar.json")

export default {
  SixPillars: {
    abi: SixPillars['abi'],
    addresses: {
      4: '0x542A900357c9638AD6e944a57072c5D01f1C1Ea7',
      42: '0x542A900357c9638AD6e944a57072c5D01f1C1Ea7',
      5777: SixPillars['networks']['5777']['address'],
    },
  },
  BandStar: {
    abi: BandStar['abi'],
    addresses: {
      4: '0x9895960b93e314ef221346ab985b895da9a5b7d5',
      42: '0x9895960b93e314ef221346ab985b895da9a5b7d5',
      5777: BandStar['networks']['5777']['address'],
    },
  },
}
