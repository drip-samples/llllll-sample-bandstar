import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import TokenIcon from '../TokenIcon'
import TokenTypeChip from '../TokenTypeChip'
import GenreTypeChip from '../GenreTypeChip'
import Loading from '../Loading'

const NumericGauge = (labelName, value) => (
  <li><LinearProgress variant='buffer' value={Math.round((value * 100) / 0xff)} style={{display: 'inline-block', verticalAlign: 'middle', width: '80px'}}/> { labelName } : { value }</li>
)

class TokenCard extends React.Component {
  handleClick = () => {
    const {tokenModel, onClick} = this.props
    onClick(tokenModel)
  }

  render() {
    const {tokenModel} = this.props
    return (
      <Card onClick={this.handleClick}>
        <CardActionArea style={{width: '100%'}}>
          {
            (tokenModel == null) ? (
              <CardContent>
                <div style={{float: 'left', width: '100px', height: '100px', marginBottom: '16px'}}>
                  <Loading />
                </div>
              </CardContent>

            ) : (
              <CardContent>
                <div style={{float: 'left', width: '100px', height: '100px', marginBottom: '16px', marginRight: '8px'}}>
                  <TokenIcon tokenModel={tokenModel} style={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}} />
                </div>
                <div>
                  <ul style={{listStyle: 'none'}}>
                    <li><TokenTypeChip tokenType={tokenModel.tokenType} /><GenreTypeChip genreType={tokenModel.genreType} /></li>
                    { NumericGauge('Skill', tokenModel.skill) }
                    { NumericGauge('Passion', tokenModel.passion) }
                    { NumericGauge('Looks', tokenModel.looks) }
                    { NumericGauge('Mental', tokenModel.mental) }
                  </ul>
                </div>
              </CardContent>
            )
          }
        </CardActionArea>
      </Card>
    )
  }
}

export default TokenCard
