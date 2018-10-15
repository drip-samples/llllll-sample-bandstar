import config from '../../config'
import TokenType from '../../enums/TokenType'

export default (id, owner, creator, inscription) => {
  // TODO: parse
  const tokenTypeIndex = parseInt(inscription, 16) % Object.keys(TokenType).length
  return {
    id: `0x${id}`,
    owner,
    creator,
    inscription: `0x${inscription}`,
    tokenType: TokenType[Object.keys(TokenType)[tokenTypeIndex] ],
  }
}
