import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import TokenIcon from '../TokenIcon'

class TokenCard extends React.Component {
  render() {
    const {tokenModel} = this.props
    return (
      <Card>
        <CardActionArea>
          <CardContent>
            <TokenIcon tokenModel={tokenModel} style={{height: '100px'}} />
            <br />
            { tokenModel.tokenType.toString() }
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default TokenCard
