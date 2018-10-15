import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import ValidateWeb3Injector from '../../injectors/ValidateWeb3Injector'
import TokenModel from '../../models/TokenModel'
import TokenCard from '../../components/TokenCard'
import Loading from '../../components/Loading'
import config from '../../config'

class MyPage extends React.Component {
  state = {
    tokenBalance: null,
    tokenModels: [],
  }

  updateTokenId = (remainCount) => {
    if (remainCount <= 0) {
      return null
    }
    const { currentAddress } = this.props
    const { SixPillars } = config.ethereum
    const sixPillars = new this.props.web3.eth.Contract(SixPillars.abi, SixPillars.address)
    const index = remainCount - 1
    let id, creator
    sixPillars.methods.tokenOfOwnerByIndex(currentAddress, index).call({from: currentAddress})
      .then((result) => {
        const bn = new this.props.web3.utils.BN(result)
        id = ("0000000000000000000000000000000000000000000000000000000000000000" + bn.toString(16)).slice(-64)
        return sixPillars.methods.creator(`0x${id}`).call({from: currentAddress})
      })
      .then((result) => {
        creator = result
        return sixPillars.methods.inscription(`0x${id}`).call({from: currentAddress})
      })
      .then((result) => {
        const bn = new this.props.web3.utils.BN(result)
        const inscription = ("0000000000000000000000000000000000000000000000000000000000000000" + bn.toString(16)).slice(-64)
        const model = TokenModel.decode(id, currentAddress, creator, inscription)
        this.setState({tokenModels: this.state.tokenModels.concat(model)})
        this.updateTokenId(index)
      })
  }

  handleMintClick = () => {
    const tokenModel = TokenModel.mint()
    const inscription = tokenModel.encode()
    this.props.mintToken && this.props.mintToken(inscription)
  }

  handleTokenClick = (tokenModel) => {
    this.props.history.push(`/tokens/${tokenModel.id}`)
  }

  componentDidMount() {
    const { currentAddress } = this.props
    const { SixPillars } = config.ethereum
    const sixPillars = new this.props.web3.eth.Contract(SixPillars.abi, SixPillars.address)
    sixPillars.methods.balanceOf(currentAddress).call({from: currentAddress})
      .then((result) => {
        const balance = parseInt(result)
        this.setState({tokenBalance: balance})
        this.updateTokenId(balance)
      })
  }

  render() {
    const { tokenBalance, tokenModels } = this.state
    return (
      <div>
        <h1>My Page</h1>
        <p>
          <Button variant="outlined" onClick={this.handleMintClick}>
            Create BandStar Token
          </Button>
        </p>
        {
          (tokenBalance == null) ? (
            <Loading />

          ) : (0 < tokenBalance) ? (
            <Grid container>
              {
                Array(tokenBalance).fill(0).map((value, i) => {
                  if (i < tokenModels.length) {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <TokenCard tokenModel={tokenModels[i]} onClick={this.handleTokenClick} />
                      </Grid>
                    )

                  } else {
                    return (
                      <Grid item xs={12} md={6} lg={4}>
                        <TokenCard />
                      </Grid>
                    )
                  }
                })
              }
            </Grid>

          ) : (
            <p>{"you don't have token."}</p>
          )
        }
      </div>
    )
  }
}

export default withRouter(ValidateWeb3Injector(MyPage))
