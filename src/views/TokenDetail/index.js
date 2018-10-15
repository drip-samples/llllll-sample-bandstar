import React from 'react'
import ValidateWeb3Injector from '../../injectors/ValidateWeb3Injector'
import TokenModel from '../../models/TokenModel'
import TokenIcon from '../../components/TokenIcon'
import Loading from '../../components/Loading'
import config from '../../config'

class TokenDetail extends React.Component {
  state = {
    tokenModel: null,
    isNotFound: false,
  }

  componentDidMount() {
    const { currentAddress } = this.props
    const { tokenId } = this.props.match.params
    const { SixPillars } = config.ethereum
    const sixPillars = new this.props.web3.eth.Contract(SixPillars.abi, SixPillars.address)

    if (Number.isNaN(parseInt(tokenId, 16))) {
      this.setState({isNotFound: true})
      return
    }

    let owner, creator
    sixPillars.methods.ownerOf(tokenId).call({from: currentAddress})
      .then((result) => {
        owner = result
        return sixPillars.methods.creator(tokenId).call({from: currentAddress})
      })
      .then((result) => {
        creator = result
        return sixPillars.methods.inscription(tokenId).call({from: currentAddress})
      })
      .then((result) => {
        const bn = new this.props.web3.utils.BN(result)
        const inscription = ("0000000000000000000000000000000000000000000000000000000000000000" + bn.toString(16)).slice(-64)
        const model = TokenModel.decode(tokenId, owner, creator, inscription)
        if (model != null) {
          this.setState({tokenModel: model})
        } else {
          this.setState({isNotFound: true})
        }
      })
  }

  render() {
    const { tokenModel, isNotFound } = this.state
    return (
      <div>
        <h1>Token Detail</h1>
        <h3>{this.props.match.params.tokenId}</h3>
        {
          (isNotFound === true) ? (
            <div>token not found</div>

          ) : (tokenModel !== null) ? (
            <div>
              <TokenIcon tokenModel={tokenModel} style={{height: '200px'}} />
              <p>{tokenModel.tokenType.toString()}</p>
            </div>

          ) : (
            <Loading />
          )
        }
      </div>
    )
  }
}

export default ValidateWeb3Injector(TokenDetail)
