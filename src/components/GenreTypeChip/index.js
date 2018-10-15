import React from 'react'
import Chip from '@material-ui/core/Chip'
import GenreType from '../../enums/GenreType'

class GenreTypeChip extends React.Component {
  render() {
    const {genreType, ...remainProps} = this.props
    let label = ''
    switch (genreType) {
      case GenreType.alternativeRock:
        label = 'Alternative'
        break
      case GenreType.bigBeat:
        label = 'BigBeat'
        break
      case GenreType.digitalHardcore:
        label = 'DigitalHardcore'
        break
      case GenreType.electro:
        label = 'Electro'
        break
      case GenreType.folk:
        label = 'Folk'
        break
      case GenreType.funk:
        label = 'Funk'
        break
      case GenreType.ukGarage:
        label = 'UK Garage'
        break
      case GenreType.gothicRock:
        label = 'GothicRock'
        break
      case GenreType.hardRock:
        label = 'HardRock'
        break
      case GenreType.heavyMetal:
        label = 'HeavyMetal'
        break
      case GenreType.instrumental:
        label = 'Instrumental'
        break
      case GenreType.jazz:
        label = 'Jazz'
        break
      case GenreType.noise:
        label = 'Noise'
        break
      case GenreType.pops:
        label = 'Pops'
        break
      case GenreType.progressiveRock:
        label = 'Progressive'
        break
      case GenreType.ska:
        label = 'Ska'
        break
      case GenreType.symphonicMetal:
        label = 'SumphonicMetal'
        break
    }
    return <Chip label={label} color='secondary' {...remainProps} />
  }
}

export default GenreTypeChip
