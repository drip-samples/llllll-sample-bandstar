import React from 'react'
import Button from '@material-ui/core/Button'
import NetworkName from '../../enums/NetworkName'
import TokenType from '../../enums/TokenType'
import TokenTypeChip from '../../components/TokenTypeChip'

class HowTo extends React.Component {
  render() {
    return (
      <div>
        <h1>How to Play</h1>
        <hr />
        <p>
          <h2>{"Let's create a big hit BandStar!"}</h2>
          This sample works with browsers with Ethereum Wallet functions.<br />
          and, it is necessary to be connected to one of the following any TestNet.
          <ul>
            {
              Object.keys(NetworkName).filter((key) => key !== '5777').map((key) => (
                <li>{NetworkName[key]}</li>
              ))
            }
          </ul>
        </p>
        <p>
          <h3>Step1</h3>
          Click <Button variant="outlined">
            Create BandStar Token
          </Button> to create a BandStar token.<br />
          You can create as many BandStar tokens as you like.<br />
          (Transaction fee is required for creation.)
        </p>
        <p>
          <h3>Step2</h3>
          Click <Button variant="outlined" color="primary">
            Start Band Edit
          </Button> and select 2 to 5 BandStar tokens required for band formation.<br />
          {"You can't select BandStar tokens that you used once, and BandStar tokens that became "}
          <TokenTypeChip tokenType={TokenType.band} />
        </p>
        <p>
          <h3>Step3</h3>
          Click <Button variant="outlined" color="secondary">
            Submit Band
          </Button> to form a band.<br />
          The formed band is created as a <TokenTypeChip tokenType={TokenType.band} /> BandStar token.<br />
          (Transaction fee is required to form a band.)
        </p>
        <p>
          <h3>Step4</h3>
          {'The formed band have "sales", "number of fans", "activity period".'}<br />
          Share your band URL and be proud of about your band!
        </p>
        <p>
          <h3>Step5</h3>
          The BandStar token is available for <a href='https://6-pillars.ooo/' alt='|||||| 6 pillars' target='_blank' rel="noopener noreferrer">
            |||||| - 6 pillars
          </a> compliant DApps.<br />
          Click <Button variant="outlined">
            Dragon
          </Button> to see what your BandStar token is in other DApps!
        </p>
      </div>
    )
  }
}

export default HowTo
