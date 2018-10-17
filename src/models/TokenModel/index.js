import TokenType from '../../enums/TokenType'
import GenreType from '../../enums/GenreType'
import ContractData from '../../enums/ContractData'

const TRUE_VALUE = 'true'

class TokenModel {
  constructor() {
    this.id = null
    this.owner = null
    this.creator = null
    this.inscription = null
    this.tokenType = null
    this.genreType = null
    this.skill = 0
    this.passion = 0
    this.looks = 0
    this.mental = 0
    this.childTokenTypes = []
    this.sales = 0
    this.fun = 0
    this.act = 0
    this.isAlreadyDisplay = false
    this.isAlreadyMixed = false
    this.networkId = 0
  }

  static isAlreadyDisplayKey(tokenId, networkId) {
    return `BandStarAlreadyDisplay_${networkId}_${`0x${tokenId.slice(-64)}`.toLowerCase()}`
  }

  static isAlreadyMixedKey(tokenId, networkId) {
    return `BandStarAlreadyMixed_${networkId}_${`0x${tokenId.slice(-64)}`.toLowerCase()}`
  }

  static isAlreadyMixed(id, networkId) {
    return window.localStorage.getItem(this.isAlreadyMixedKey(id, networkId)) === TRUE_VALUE
  }

  static decodeTokenTypeByBandStar(model, inscription) {
    const i = 6
    const byte = inscription.substr(-((i + 1) * 2), 2)
    const keys = Object.keys(TokenType)
    model.tokenType = TokenType[keys[parseInt(byte, 16) % keys.length] ]
  }

  static decodeTokenTypeByOther(model, inscription) {
    const i = 6
    const byte = inscription.substr(-((i + 1) * 2), 2)
    const values = [
      TokenType.jambe,
      TokenType.dtm,
      TokenType.violin,
      TokenType.sax,
    ]
    model.tokenType = values[parseInt(byte, 16) % values.length]
  }

  static decodeForMember(model, inscription) {
    for (let i = 0; i < 32; i++) {
      const byte = inscription.substr(-((i + 1) * 2), 2)
      switch (i) {
        case 1:
          model.passion = parseInt(byte, 16)
          break
        case 3:
          model.skill = parseInt(byte, 16)
          break
        case 5:
          model.mental = parseInt(byte, 16)
          break
        case 7:
          model.looks = parseInt(byte, 16)
          break
        case 20:
        {
          const keys = Object.keys(GenreType)
          model.genreType = GenreType[keys[parseInt(byte, 16) % keys.length] ]
        }
          break
        default:
          break
      }
    }
  }

  static decodeForBand(model, inscription) {
    let childCount = 0
    for (let i = 0; i < 32; i++) {
      const byte = inscription.substr(-((i + 1) * 2), 2)
      switch (i) {
        case 1:
          model.passion = parseInt(byte, 16)
          break
        case 2:
          childCount = parseInt(byte, 16) % 6
          break
        case 3:
          model.skill = parseInt(byte, 16)
          break
        case 5:
          model.mental = parseInt(byte, 16)
          break
        case 7:
          model.looks = parseInt(byte, 16)
          break
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        {
          const index = i - 10
          if (index < childCount) {
            const keys = Object.keys(TokenType)
            const tokenType = TokenType[keys[parseInt(byte, 16) % keys.length] ]
            model.childTokenTypes.push(tokenType)
          }
        }
          break
        case 20:
        {
          const keys = Object.keys(GenreType)
          model.genreType = GenreType[keys[parseInt(byte, 16) % keys.length] ]
        }
          break
        case 21:
          model.fun += parseInt(byte, 16)
          break
        case 22:
          model.fun += parseInt(byte, 16) * 0x100
          break
        case 23:
          model.fun += parseInt(byte, 16) * 0x10000
          break
        case 24:
          model.fun += parseInt(byte, 16) * 0x1000000
          break
        case 25:
          model.sales += parseInt(byte, 16)
          break
        case 26:
          model.sales += parseInt(byte, 16) * 0x100
          break
        case 27:
          model.sales += parseInt(byte, 16) * 0x10000
          break
        case 28:
          model.sales += parseInt(byte, 16) * 0x1000000
          break
        case 29:
          model.act += parseInt(byte, 16)
          break
        case 30:
          model.act += parseInt(byte, 16) * 0x100
          break
        default:
          break
      }
    }
  }

  static decode(id, owner, creator, inscription, networkId) {
    // validate
    if ((id === null)
      || (id.length === 0)
      || (owner === null)
      || (owner.length === 0)
      || (creator === null)
      || (creator.length === 0)
      || (inscription === null)
      || (inscription.length === 0))
    {
      return null
    }

    const model = new TokenModel()
    model.id = `0x${id.slice(-64)}`
    model.owner = owner
    model.creator = creator
    model.inscription = `0x${inscription.slice(-64)}`
    model.networkId = networkId

    if (creator.toLowerCase() === ContractData.BandStar.addresses[networkId].toLowerCase()) {
      this.decodeTokenTypeByBandStar(model, inscription)

    } else {
      this.decodeTokenTypeByOther(model, inscription)
    }

    if (model.tokenType === TokenType.band) {
      this.decodeForBand(model, inscription)
      model.isAlreadyMixed = true

    } else {
      this.decodeForMember(model, inscription)
      model.isAlreadyMixed = (window.localStorage.getItem(TokenModel.isAlreadyMixedKey(model.id, networkId)) === TRUE_VALUE)
    }

    model.isAlreadyDisplay = (window.localStorage.getItem(TokenModel.isAlreadyDisplayKey(model.id, networkId)) === TRUE_VALUE)

    return model
  }

  static mint() {
    const model = new TokenModel()

    const enableTokenTypes = [
      TokenType.vocal,
      TokenType.guitar,
      TokenType.bass,
      TokenType.drum,
      TokenType.keyboard,
    ]
    model.tokenType = enableTokenTypes[Math.floor(Math.random() * enableTokenTypes.length)]

    model.skill = Math.floor(Math.random() * 0xff)
    model.passion = Math.floor(Math.random() * 0xff)
    model.looks = Math.floor(Math.random() * 0xff)
    model.mental = Math.floor(Math.random() * 0xff)

    model.sales = Math.floor(Math.random() * 0xffffffff)
    model.fun = Math.floor(Math.random() * 0xffffffff)
    model.act = Math.floor(Math.random() * 0xffff)

    const enableGenreTypes = Object.values(GenreType)
    model.genreType = enableGenreTypes[Math.floor(Math.random() * enableGenreTypes.length)]

    return model
  }

  static mixedMint(tokenModels) {
    const model = new TokenModel()

    model.tokenType = TokenType.band

    model.skill = Math.floor(tokenModels.map((model) => model.skill).reduce((next, current) => next + current) / tokenModels.length)
    model.passion = Math.floor(tokenModels.map((model) => model.passion).reduce((next, current) => next + current) / tokenModels.length)
    model.looks = Math.floor(tokenModels.map((model) => model.looks).reduce((next, current) => next + current) / tokenModels.length)
    model.mental = Math.floor(tokenModels.map((model) => model.mental).reduce((next, current) => next + current) / tokenModels.length)

    model.genreType = tokenModels[Math.floor(Math.random() * tokenModels.length) ].genreType

    const uniqueGenres = tokenModels.map((model) => model.genreType).filter((value, index, self) => self.indexOf(value) === index)
    const genreBonus = tokenModels.length / uniqueGenres.length

    model.sales = Math.floor((
      (Math.pow(model.skill / 0xff, 3) * 1000000)
      + (Math.pow(model.passion / 0xff, 3) * 1000000)
      + (Math.pow(model.looks / 0xff, 3) * 1000000)
    ) * genreBonus) * tokenModels.length

    model.fun = Math.floor((
      (Math.pow(model.looks / 0xff, 3) * 1000000)
      + (Math.pow(model.mental / 0xff, 3) * 1000000)
    ) * genreBonus) * tokenModels.length

    model.act = Math.floor(Math.pow(model.mental / 0xff, 3) * (365 * 10) * genreBonus)

    model.childTokenTypes = tokenModels.map((model) => model.tokenType)

    return model
  }

  byteForInscription(index, max) {
    const mul = Math.floor(0xff / max)
    return (Math.floor(Math.random() * mul) * max) + index
  }

  encode() {
    let inscription = ""
    for (let i = 0; i < 32; i++) {
      switch (i) {
        case 1:
          inscription = ("00" + this.passion.toString(16)).slice(-2) + inscription
          break
        case 2:
          // child max is 5, index 0 equal no childs
          inscription = ("00" + this.byteForInscription(this.childTokenTypes.length, 6).toString(16)).slice(-2) + inscription
          break
        case 3:
          inscription = ("00" + this.skill.toString(16)).slice(-2) + inscription
          break
        case 5:
          inscription = ("00" + this.mental.toString(16)).slice(-2) + inscription
          break
        case 6:
        {
          const keys = Object.keys(TokenType)
          const targetKey = keys.filter((key) => { return TokenType[key] === this.tokenType })[0]
          inscription = ("00" + this.byteForInscription(keys.indexOf(targetKey), keys.length).toString(16)).slice(-2) + inscription
        }
          break
        case 7:
          inscription = ("00" + this.looks.toString(16)).slice(-2) + inscription
          break
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
        {
          const index = i - 10
          if (index < this.childTokenTypes.length) {
            const keys = Object.keys(TokenType)
            const targetKey = keys.filter((key) => { return TokenType[key] === this.childTokenTypes[index] })[0]
            inscription = ("00" + this.byteForInscription(keys.indexOf(targetKey), keys.length).toString(16)).slice(-2) + inscription

          } else {
            inscription = ("00" + Math.floor(Math.random() * 0xff).toString(16)).slice(-2) + inscription
          }
        }
          break
        case 20:
        {
          const keys = Object.keys(GenreType)
          const targetKey = keys.filter((key) => { return GenreType[key] === this.genreType })[0]
          inscription = ("00" + this.byteForInscription(keys.indexOf(targetKey), keys.length).toString(16)).slice(-2) + inscription
        }
          break
        case 21:
          inscription = ("00000000" + this.fun.toString(16)).substr(-2, 2) + inscription
          break
        case 22:
          inscription = ("00000000" + this.fun.toString(16)).substr(-4, 2) + inscription
          break
        case 23:
          inscription = ("00000000" + this.fun.toString(16)).substr(-6, 2) + inscription
          break
        case 24:
          inscription = ("00000000" + this.fun.toString(16)).substr(-8, 2) + inscription
          break
        case 25:
          inscription = ("00000000" + this.sales.toString(16)).substr(-2, 2) + inscription
          break
        case 26:
          inscription = ("00000000" + this.sales.toString(16)).substr(-4, 2) + inscription
          break
        case 27:
          inscription = ("00000000" + this.sales.toString(16)).substr(-6, 2) + inscription
          break
        case 28:
          inscription = ("00000000" + this.sales.toString(16)).substr(-8, 2) + inscription
          break
        case 29:
          inscription = ("0000" + this.act.toString(16)).substr(-2, 2) + inscription
          break
        case 30:
          inscription = ("0000" + this.act.toString(16)).substr(-4, 2) + inscription
          break
        default:
          inscription = ("00" + Math.floor(Math.random() * 0xff).toString(16)).slice(-2) + inscription
          break
      }
    }
    return `0x${inscription}`
  }

  alreadyDisplay() {
    this.isAlreadyDisplay = true
    window.localStorage.setItem(TokenModel.isAlreadyDisplayKey(this.id, this.networkId), TRUE_VALUE)
  }

  alreadyMixed() {
    this.isAlreadyMixed = true
    window.localStorage.setItem(TokenModel.isAlreadyMixedKey(this.id, this.networkId), TRUE_VALUE)
  }
}

export default TokenModel
