import config from '../../config'
import TokenType from '../../enums/TokenType'

class TokenModel {
  constructor() {
    this.id = null
    this.owner = null
    this.creator = null
    this.inscription = null
    this.tokenType = null
  }

  static decode(id, owner, creator, inscription) {
    const model = new TokenModel()
    model.id = `0x${id}`
    model.owner = owner
    model.creator = creator
    model.inscription = `0x${inscription}`

    for (let i = 0; i < 32; i++) {
      const byte = inscription.substr(-((i + 1) * 2), 2)
      switch (i) {
        case 6:
        {
          const keys = Object.keys(TokenType)
          model.tokenType = TokenType[keys[parseInt(byte, 16) % keys.length] ]
        }
          break
        default:
          break
      }
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
