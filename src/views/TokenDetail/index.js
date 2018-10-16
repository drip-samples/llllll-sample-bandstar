import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import ValidateWeb3Injector from '../../injectors/ValidateWeb3Injector'
import TokenModel from '../../models/TokenModel'
import TokenIcon from '../../components/TokenIcon'
import TokenTypeChip from '../../components/TokenTypeChip'
import GenreTypeChip from '../../components/GenreTypeChip'
import Loading from '../../components/Loading'
import config from '../../config'

const NumericGauge = (labelName, value) => (
  <div>
    <LinearProgress variant='determinate' value={Math.round((value * 100) / 0xff)} style={{display: 'inline-block', verticalAlign: 'middle', width: '150px'}}/> { labelName } : { value }
  </div>
)

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
          model.alreadyDisplay()
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
        <div>{this.props.match.params.tokenId}</div>
        {
          (isNotFound === true) ? (
            <div>token not found</div>

          ) : (tokenModel !== null) ? (
            <div>
              <div><TokenIcon tokenModel={tokenModel} style={{height: '200px'}} /></div>
              <div><TokenTypeChip tokenType={tokenModel.tokenType} /><GenreTypeChip genreType={tokenModel.genreType} /></div>
              { NumericGauge('Skill', tokenModel.skill) }
              { NumericGauge('Passion', tokenModel.passion) }
              { NumericGauge('Looks', tokenModel.looks) }
              { NumericGauge('Mental', tokenModel.mental) }
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
