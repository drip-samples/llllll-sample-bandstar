import React from 'react'
import { withRouter } from 'react-router'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import ValidateWeb3Injector from '../../injectors/ValidateWeb3Injector'
import TokenModel from '../../models/TokenModel'
import TokenCard from '../../components/TokenCard'
import Loading from '../../components/Loading'
import ContractData from '../../enums/ContractData'

const LIST_ITEM_ONCE = 8

class MyPage extends React.Component {
  state = {
    tokenBalance: null,
    isLoadingNextToken: false,
    isCanMore: false,
    tokenModels: [],
    isMixedMode: false,
    selectedTokenIds: [],
  }

  updateTokenId = (nextIndex, remainCount) => {
    if (nextIndex < 0) {
      this.setState({isLoadingNextToken: false})
      return null

    } else if (remainCount <= 0) {
      this.setState({isLoadingNextToken: false, isCanMore: true})
      return null
    }
    const { networkId, currentAddress } = this.props
    const { SixPillars } = ContractData
    const sixPillars = new this.props.web3.eth.Contract(SixPillars.abi, SixPillars.addresses[networkId])
    let id, creator
    sixPillars.methods.tokenOfOwnerByIndex(currentAddress, nextIndex).call({from: currentAddress})
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
        const model = TokenModel.decode(id, currentAddress, creator, inscription, networkId)
        this.setState({tokenModels: this.state.tokenModels.concat(model)})
        return this.updateTokenId(nextIndex - 1, remainCount - 1)
      })
      .catch((error) => {
        this.updateTokenId(nextIndex - 1, remainCount)
      })
  }

  handleMintClick = () => {
    const tokenModel = TokenModel.mint()
    const inscription = tokenModel.encode()
    this.props.mintToken && this.props.mintToken(inscription)
  }

  handleTokenClick = (tokenModel) => {
    const { isMixedMode, selectedTokenIds } = this.state
    if (isMixedMode) {
      if (0 <= selectedTokenIds.indexOf(tokenModel.id)) {
        this.setState({
          selectedTokenIds: selectedTokenIds.filter((tokenId) => { return tokenId !== tokenModel.id }),
        })

      } else if ((selectedTokenIds.length < 5) && !tokenModel.isAlreadyMixed) {
        this.setState({
          selectedTokenIds: selectedTokenIds.concat(tokenModel.id),
        })
      }

    } else {
      this.props.history.push(`/tokens/${tokenModel.id}`)
    }
  }

  handleMoreClick = () => {
    const { tokenBalance, tokenModels } = this.state
    this.setState({
      isLoadingNextToken: true,
      isCanMore: false,
    })
    this.updateTokenId(tokenBalance - tokenModels.length - 1, LIST_ITEM_ONCE)
  }

  handleEditMixedClick = () => {
    this.setState({
      isMixedMode: !this.state.isMixedMode,
      selectedTokenIds: [],
    })
  }

  handleSubmitMixedClick = () => {
    const { tokenModels, selectedTokenIds } = this.state
    const mixedTokenModels = tokenModels.filter((model) => 0 <= selectedTokenIds.indexOf(model.id))
    const bandToken = TokenModel.mixedMint(mixedTokenModels)
    const inscription = bandToken.encode()
    this.props.mintToken && this.props.mintToken(inscription, () => {
      mixedTokenModels.forEach((tokenModel) => { tokenModel.alreadyMixed() })
    })
  }

  componentDidMount() {
    const { networkId, currentAddress } = this.props
    const { SixPillars } = ContractData
    const sixPillars = new this.props.web3.eth.Contract(SixPillars.abi, SixPillars.addresses[networkId])
    sixPillars.methods.balanceOf(currentAddress).call({from: currentAddress})
      .then((result) => {
        const balance = parseInt(result)
        this.setState({
          tokenBalance: balance,
          isLoadingNextToken: true,
        })
        this.updateTokenId(balance - 1, LIST_ITEM_ONCE)
      })
  }

  render() {
    const { tokenBalance, isLoadingNextToken, isCanMore, tokenModels, isMixedMode, selectedTokenIds } = this.state
    const displayCount = isLoadingNextToken ? tokenModels.length + 1 : tokenModels.length
    return (
      <div>
        <h1>My Page</h1>
        <Grid container>
          <Grid item xs={12} md={4} lg={3} key='mint'>
            <Button variant="outlined" onClick={this.handleMintClick}>
              Create BandStar Token
            </Button>
          </Grid>
          <Grid item xs={12} md={4} lg={3} key='editmixed'>
            <Button variant="outlined" color="primary" onClick={this.handleEditMixedClick}>
              { isMixedMode ? 'Cancel Bund Edit' : 'Start Bund Edit' }
            </Button>
          </Grid>
          {
            isMixedMode && (2 <= selectedTokenIds.length) && (
              <Grid item xs={12} md={4} lg={3} key='submitmixed'>
                <Button variant="outlined" color="secondary" onClick={this.handleSubmitMixedClick}>
                  Submit Band
                </Button>
              </Grid>
            )
          }
        </Grid>
        {
          (tokenBalance == null) ? (
            <Loading />

          ) : (0 < displayCount) ? (
            <Grid container>
              {
                Array(displayCount).fill(0).map((_, i) => {
                  if (i < tokenModels.length) {
                    return (
                      <Grid item xs={12} md={6} lg={4} key={i}>
                        <TokenCard tokenModel={tokenModels[i]} isMixedMode={isMixedMode} isSelected={0 <= selectedTokenIds.indexOf(tokenModels[i].id)} onClick={this.handleTokenClick} />
                      </Grid>
                    )

                  } else {
                    return (
                      <Grid item xs={12} md={6} lg={4} key={i}>
                        <TokenCard />
                      </Grid>
                    )
                  }
                })
              }
              {
                isCanMore && (
                  <Grid item xs={12} md={6} lg={4} key={displayCount}>
                    <Card onClick={this.handleMoreClick}>
                      <CardActionArea style={{width: '100%'}}>
                        <CardContent>
                          <div style={{height: '106px', padding: '16px'}}>
                            { 'More...' }
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
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
