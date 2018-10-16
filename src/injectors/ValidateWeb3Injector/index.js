import React from 'react'
import Web3Context from '../../contexts/Web3Context'
import Web3StatusType from '../../enums/Web3StatusType'
import Loading from '../../components/Loading'
import MetamaskDisableNetwork from '../../components/MetamaskDisableNetwork'
import MetamaskNotFound from '../../components/MetamaskNotFound'

const ValidateWeb3Injector = (WrappedComponent) => (
  class extends React.Component {
    render() {
      return (
        <Web3Context.Consumer>
          {
            (providerProps) => {
              switch (providerProps.web3Status) {
                case Web3StatusType.failed.notfound:
                  return <MetamaskNotFound />
                case Web3StatusType.failed.network:
                  return <MetamaskDisableNetwork />
                case Web3StatusType.success:
                  const props = {
                    ...this.props,
                    ...providerProps,
                  }
                  return <WrappedComponent {...props} />
                default:
                  return <Loading />
              }
            }
          }
        </Web3Context.Consumer>
      )
    }
  }
)

export default ValidateWeb3Injector
