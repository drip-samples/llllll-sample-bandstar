import React from 'react'
import TokenType from '../../enums/TokenType'
import imageVocal from '../../assets/img/animal_music_band_singer.png'
import imageGuitar from '../../assets/img/animal_music_band_guitar.png'
import imageBass from '../../assets/img/animal_music_band_bass.png'
import imageDrum from '../../assets/img/animal_music_band_drum.png'
import imageKeyboard from '../../assets/img/music_keyboard_woman.png'
import imageJambe from '../../assets/img/music_djembe_janbe_jambe_woman.png'
import imageDtm from '../../assets/img/dtm_musician.png'
import imageViolin from '../../assets/img/musician_violin_usagi.png'
import imageSax from '../../assets/img/sax_musician.png'
import imageBand from '../../assets/img/animal_music_band.png'

class TokenIcon extends React.Component {
  render() {
    const {tokenModel, ...remainProps} = this.props
    let src
    switch (tokenModel.tokenType) {
      case TokenType.vocal:
        src = imageVocal
        break
      case TokenType.guitar:
        src = imageGuitar
        break
      case TokenType.bass:
        src = imageBass
        break
      case TokenType.drum:
        src = imageDrum
        break
      case TokenType.keyboard:
        src = imageKeyboard
        break
      case TokenType.jambe:
        src = imageJambe
        break
      case TokenType.dtm:
        src = imageDtm
        break
      case TokenType.violin:
        src = imageViolin
        break
      case TokenType.sax:
        src = imageSax
        break
      case TokenType.band:
        src = imageBand
        break
      default:
        return null
    }
    return <img src={src} alt={tokenModel.id} {...remainProps} />
  }
}

export default TokenIcon
