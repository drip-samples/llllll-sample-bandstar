import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import CheckBox from '@material-ui/icons/CheckBox'
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'
import teal from '@material-ui/core/colors/teal'
import grey from '@material-ui/core/colors/grey'
import TokenType from '../../enums/TokenType'
import TokenIcon from '../TokenIcon'
import TokenTypeChip from '../TokenTypeChip'
import GenreTypeChip from '../GenreTypeChip'
import NewChip from '../NewChip'
import Loading from '../Loading'

const NumericGauge = (labelName, value) => (
  <li><LinearProgress variant='determinate' value={Math.round((value * 100) / 0xff)} style={{display: 'inline-block', verticalAlign: 'middle', width: '80px'}}/> { labelName } : { value }</li>
)

class TokenCard extends React.Component {
  handleClick = () => {
    const {tokenModel, onClick} = this.props
    onClick(tokenModel)
  }

  render() {
    const {tokenModel, isMixedMode, isSelected} = this.props
    let cardStyle = {
      width: '100%',
    }
    if (isMixedMode) {
      if (isSelected) {
        cardStyle.backgroundColor = teal['100']

      } else if (tokenModel.isAlreadyMixed) {
        cardStyle.backgroundColor = grey['500']
      }

    } else if (tokenModel && (tokenModel.tokenType !== TokenType.band) && tokenModel.isAlreadyMixed) {
      cardStyle.backgroundColor = grey['500']
    }
    return (
      <Card onClick={this.handleClick}>
        <CardActionArea style={cardStyle}>
          {
            (tokenModel == null) ? (
              <CardContent>
                <div style={{float: 'left', height: '106px', marginBottom: '16px'}}>
                  <Loading />
                </div>
              </CardContent>

            ) : (
              <CardContent>
                <div style={{float: 'left', width: '106px', height: '106px', marginBottom: '16px'}}>
                  <TokenIcon tokenModel={tokenModel} style={{width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%'}} />
                </div>
                <div style={{float: 'left'}}>
                  <ul style={{listStyle: 'none'}}>
                    <li>
                      {
                        !tokenModel.isAlreadyDisplay && (
                          <NewChip />
                        )
                      }
                      <TokenTypeChip tokenType={tokenModel.tokenType} />
                      <GenreTypeChip genreType={tokenModel.genreType} />
                    </li>
                    { NumericGauge('Skill', tokenModel.skill) }
                    { NumericGauge('Passion', tokenModel.passion) }
                    { NumericGauge('Looks', tokenModel.looks) }
                    { NumericGauge('Mental', tokenModel.mental) }
                  </ul>
                </div>
                {
                  isMixedMode && !tokenModel.isAlreadyMixed && (
                    <div style={{float: 'right'}}>
                      { isSelected ? <CheckBox /> : <CheckBoxOutlineBlank /> }
                    </div>
                  )
                }
              </CardContent>
            )
          }
        </CardActionArea>
      </Card>
    )
  }
}

export default TokenCard
