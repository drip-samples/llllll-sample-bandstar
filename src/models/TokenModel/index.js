import config from '../../config'
import TokenType from '../../enums/TokenType'
import GenreType from '../../enums/GenreType'

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

  static decode(id, owner, creator, inscription) {
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
    model.id = `0x${id}`
    model.owner = owner
    model.creator = creator
    model.inscription = `0x${inscription}`

    if (creator.toLowerCase() === config.ethereum.BandStar.address) {
      this.decodeTokenTypeByBandStar(model, inscription)

    } else {
      this.decodeTokenTypeByOther(model, inscription)
    }

    if (model.tokenType === TokenType.band) {
      this.decodeForBand(model, inscription)

    } else {
      this.decodeForMember(model, inscription)
    }

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
        case 6:
        {
          const keys = Object.keys(TokenType)
          const targetKey = keys.filter((key) => { return TokenType[key] === this.tokenType })[0]
          inscription = ("00" + this.byteForInscription(keys.indexOf(targetKey), keys.length).toString(16)).slice(-2) + inscription
        }
          break
        default:
          inscription = ("00" + Math.floor(Math.random() * 0xff).toString(16)).slice(-2) + inscription
          break
      }
    }
    return `0x${inscription}`
  }
}

export default TokenModel
