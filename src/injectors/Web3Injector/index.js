import React from 'react'
import Web3Context from '../../contexts/Web3Context'

const Web3Injector = (WrappedComponent) => (
  class extends React.Component {
    render() {
      return (
        <Web3Context.Consumer>
          { ({web3, web3Status, currentAddress}) => (
            <WrappedComponent {...this.props} web3={web3} web3Status={web3Status} currentAddress={currentAddress} />
          )}
        </Web3Context.Consumer>
      )
    }
  }
)

export default Web3Injector
