import React from 'react'
import Web3Context from '../../contexts/Web3Context'

const Web3Injector = (WrappedComponent) => (
  class extends React.Component {
    render() {
      return (
        <Web3Context.Consumer>
          {
            (providerProps) => {
              const props = {
                ...this.props,
                ...providerProps,
              }
              return <WrappedComponent {...props} />
            }
          }
        </Web3Context.Consumer>
      )
    }
  }
)

export default Web3Injector
