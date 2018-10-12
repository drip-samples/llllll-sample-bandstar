import React from 'react'
import Web3 from 'web3'
import Web3Context from '../../contexts/Web3Context'
import Web3StatusType from '../../enums/Web3StatusType'

class Web3Provider extends React.Component {
  state = {
    web3: null,
    web3Status: Web3StatusType.identity,
    currentAddress: null,
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
            // TODO: check network ID
            console.log(res)
            this.setState({
              web3Status: Web3StatusType.success,
            })
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
