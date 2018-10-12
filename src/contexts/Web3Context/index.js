import React from 'react'
import Web3StatusType from '../../enums/Web3StatusType'

const Web3Context = React.createContext({
  web3: null,
  web3Status: Web3StatusType.identity,
  currentAddress: null,
})

export default Web3Context
