import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import ValidateWeb3Injector from '../../injectors/ValidateWeb3Injector'
import TokenType from '../../enums/TokenType'
import TokenModel from '../../models/TokenModel'
import TokenIcon from '../../components/TokenIcon'
import TokenTypeChip from '../../components/TokenTypeChip'
import GenreTypeChip from '../../components/GenreTypeChip'
import Loading from '../../components/Loading'
import ContractData from '../../enums/ContractData'

const NumericGauge = (labelName, value) => (
  <div>
    <LinearProgress variant='determinate' value={Math.round((value * 100) / 0xff)} style={{display: 'inline-block', verticalAlign: 'middle', width: '150px'}}/> { labelName } : { value }
  </div>
)

class ShareTokenDetail extends React.Component {
  state = {
    tokenModel: null,
    isNotFound: false,
  }

  salesFormatter = new Intl.NumberFormat('us-EN', {
    style: 'currency',
    currency: 'USD'
  })

  funFormatter = new Intl.NumberFormat('us-EN')

  actFormat = (act) => {
    if (act < 30) {
      const day = (act === 1) ? 'day' : 'days'
      return `${act} ${day}`

    } else if (act < 360) {
      const monthNum = Math.floor(act / 30)
      const month = (monthNum === 1) ? 'month' : 'months'
      const dayNum = act % 30
      if (dayNum === 0) {
        return `${monthNum} ${month}`

      } else if (dayNum === 1) {
        return `${monthNum} ${month}, 1 day`

      } else {
        return `${monthNum} ${month}, ${dayNum} days`
      }

    } else {
      const i = Math.floor(act / 30)
      const yearNum = Math.floor(i / 12)
      const year = (yearNum === 1) ? 'year' : 'years'
      const monthNum = i % 12
      if (monthNum === 0) {
        return `${yearNum} ${year}`

      } else if (monthNum === 1) {
        return `${yearNum} ${year}, 1 month`

      } else {
        return `${yearNum} ${year}, ${monthNum} months`
      }
    }
  }

  networkId = (name) => {
    switch (name) {
      case 'kovan':
        return 42
      case 'rinkeby':
        return 4
      default:
        return null
    }
  }

  web3HttpUrl = (name) => {
    switch (name) {
      case 'kovan':
        return 'https://kovan.infura.io/ipN7Rvj4j0lzprCXMbql'
      case 'rinkeby':
        return 'https://rinkeby.infura.io/ipN7Rvj4j0lzprCXMbql'
      default:
        return null
    }
  }

  componentDidMount() {
    const { tokenId, networkName } = this.props.match.params
    const networkId = this.networkId(networkName)
    const Web3 = require('web3')
    const web3 = new Web3(new Web3.providers.HttpProvider(this.web3HttpUrl(networkName)))
    const { SixPillars } = ContractData
    const sixPillars = new web3.eth.Contract(SixPillars.abi, SixPillars.addresses[networkId])

    if (Number.isNaN(parseInt(tokenId, 16))) {
      this.setState({isNotFound: true})
      return
    }

    let owner, creator
    sixPillars.methods.ownerOf(tokenId).call()
      .then((result) => {
        owner = result
        return sixPillars.methods.creator(tokenId).call()
      })
      .then((result) => {
        creator = result
        return sixPillars.methods.inscription(tokenId).call()
      })
      .then((result) => {
        const bn = new web3.utils.BN(result)
        const inscription = ("0000000000000000000000000000000000000000000000000000000000000000" + bn.toString(16)).slice(-64)
        const model = TokenModel.decode(tokenId, owner, creator, inscription, networkId)
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
        <div>{this.props.match.params.tokenId}</div>
        {
          (isNotFound === true) ? (
            <div>token not found</div>

          ) : ((tokenModel !== null) && (tokenModel.tokenType !== TokenType.band) && tokenModel.isAlreadyMixed) ? (
            <div>token is already used.</div>

          ) : (tokenModel !== null) ? (
            <React.Fragment>
              <div><TokenIcon tokenModel={tokenModel} style={{height: '200px'}} /></div>
              <div><TokenTypeChip tokenType={tokenModel.tokenType} /><GenreTypeChip genreType={tokenModel.genreType} /></div>
              {
                (tokenModel.tokenType === TokenType.band) && (
                  <React.Fragment>
                    <div>
                      { tokenModel.childTokenTypes.map((tokenType, index) => <TokenTypeChip tokenType={tokenType} key={`childtoken${index}`}/>) }
                    </div>
                    <div style={{fontSize: '20px', fontWeight: 'bold'}}>
                      <div>Sales : {this.salesFormatter.format(tokenModel.sales)}</div>
                      <div>Fun : {this.funFormatter.format(tokenModel.fun)}</div>
                      <div>Act : {this.actFormat(tokenModel.act)}</div>
                    </div>
                  </React.Fragment>
                )
              }
              { NumericGauge('Skill', tokenModel.skill) }
              { NumericGauge('Passion', tokenModel.passion) }
              { NumericGauge('Looks', tokenModel.looks) }
              { NumericGauge('Mental', tokenModel.mental) }
            </React.Fragment>

          ) : (
            <Loading />
          )
        }
      </div>
    )
  }
}

export default ShareTokenDetail
