import React from 'react'
import Web3 from 'web3'
import Web3Context from '../../contexts/Web3Context'
import Web3StatusType from '../../enums/Web3StatusType'
import Web3TransactionType from '../../enums/Web3TransactionType'
import ContractData from '../../enums/ContractData'

class Web3Provider extends React.Component {
  state = {
    web3: null,
    web3Status: Web3StatusType.identity,
    networkId: null,
    currentAddress: null,
    web3Transaction: Web3TransactionType.none,
    mintToken: null,
  }

  mintData = (inscription) => {
    const { web3, networkId } = this.state
    const sixPillarsAddress = ContractData.SixPillars.addresses[networkId]
    const methodHead = web3.utils.sha3("mint(uint256,address)").substr(0, 10)
    const _inscription = inscription.slice(-64)
    const _sixPillarsAddress = ('0000000000000000000000000000000000000000000000000000000000000000' + sixPillarsAddress.substr(2, 40)).slice(-64)
    const data = methodHead + _inscription + _sixPillarsAddress
    return data
  }

  mintToken = (inscription, sendingCallback = null) => {
    this.setState({web3Transaction: Web3TransactionType.none})
    const {web3, networkId, currentAddress} = this.state
    web3.eth.sendTransaction({
      from: currentAddress,
      to: ContractData.BandStar.addresses[networkId],
      data: this.mintData(inscription),
    })
      .on('transactionHash', (transactionHash) => {
        this.setState({web3Transaction: Web3TransactionType.pending})
        sendingCallback && sendingCallback()
      })
      .on('receipt', (receipt) => {
        this.setState({web3Transaction: Web3TransactionType.success})
      })
      .on('error', (err) => {
        this.setState({web3Transaction: Web3TransactionType.cancel})
      })
  }

  componentDidMount() {
    if (typeof window.web3 === 'undefined') {
      window.addEventListener('message', ({ data }) => {
        if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
          const web3 = new Web3(window.ethereum)
          this.setState({
            web3,
            web3Status: web3 ? Web3StatusType.checking : Web3StatusType.failed.notfound,
          })
        }
      })
      window.postMessage({ type: 'ETHEREUM_PROVIDER_REQUEST' }, '*')

    } else {
      const web3 = new Web3(window.web3.currentProvider)
      this.setState({
        web3,
        web3Status: web3 ? Web3StatusType.checking : Web3StatusType.failed.notfound,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { web3, web3Status } = this.state
    const mintToken = this.mintToken
    switch (web3Status) {
      case Web3StatusType.checking:
        this.setState({
          web3Status: Web3StatusType.waiting,
        })
        web3.eth.getAccounts()
          .then((res) => {
            const address = res && 0 < res.length && res[0]
            if (address) {
              this.setState({
                currentAddress: address,
              })
              return web3.eth.net.getId()

            } else {
              this.setState({
                web3Status: Web3StatusType.failed.notfound,
              })
              throw new Error()
            }
          })
          .then((res) => {
            if (0 <= Object.keys(ContractData.SixPillars.addresses).indexOf(res.toString())) {
              this.setState({
                web3Status: Web3StatusType.success,
                networkId: res,
                mintToken,
              })

            } else {
              this.setState({
                web3Status: Web3StatusType.failed.network,
              })
            }
          })
          .catch((err) => {
            console.log(err)
          })
        break
      default:
        break
    }
  }

  render() {
    return (
      <Web3Context.Provider value={this.state} >
        { React.Children.only(this.props.children) }
      </Web3Context.Provider>
    )
  }
}

export default Web3Provider
