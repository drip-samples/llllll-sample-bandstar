import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import TokenIcon from '../TokenIcon'

class TokenCard extends React.Component {
  handleClick = () => {
    const {tokenModel, onClick} = this.props
    onClick(tokenModel)
  }

  render() {
    const {tokenModel} = this.props
    return (
      <Card onClick={this.handleClick}>
        <CardActionArea>
          <CardContent>
            <TokenIcon tokenModel={tokenModel} style={{height: '100px'}} />
            { tokenModel.tokenType.toString() }
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default TokenCard
