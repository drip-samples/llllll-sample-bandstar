import React from 'react'
import Web3Injector from '../../injectors/Web3Injector'

const MyPage = ({web3, web3Status, currentAddress}) => (
  <div>
    <h1>My Page</h1>
    <p>{web3Status}</p>
    <p>{currentAddress}</p>
  </div>
)

export default Web3Injector(MyPage)
