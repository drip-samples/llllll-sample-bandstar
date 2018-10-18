import React from 'react'
import NetworkName from '../../enums/NetworkName'

export default () => (
  <div>
    <div>Metamask is connected disable network.</div>
    <div>enabled is</div>
    <ul>
      {
        Object.keys(NetworkName).filter((key) => key !== '5777').map((key) => (
          <li>{NetworkName[key]}</li>
        ))
      }
    </ul>
  </div>
)
