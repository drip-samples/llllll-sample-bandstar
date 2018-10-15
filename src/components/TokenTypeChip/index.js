import React from 'react'
import Chip from '@material-ui/core/Chip'
import TokenType from '../../enums/TokenType'

class TokenTypeChip extends React.Component {
  render() {
    const {tokenType, ...remainProps} = this.props
    let label = ''
    switch (tokenType) {
      case TokenType.vocal:
        label = 'Vocal'
        break
      case TokenType.guitar:
        label = 'Guitar'
        break
      case TokenType.bass:
        label = 'Bass'
        break
      case TokenType.drum:
        label = 'Drum'
        break
      case TokenType.keyboard:
        label = 'Keyboard'
        break
      case TokenType.jambe:
        label = 'Jambe'
        break
      case TokenType.dtm:
        label = 'DTM'
        break
      case TokenType.violin:
        label = 'Violin'
        break
      case TokenType.sax:
        label = 'Sax'
        break
      case TokenType.band:
        label = 'Band'
        break
    }
    return <Chip label={label} color='primary' {...remainProps} />
  }
}

export default TokenTypeChip
