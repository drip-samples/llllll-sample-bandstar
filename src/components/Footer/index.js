import React from 'react'
import { withRouter } from 'react-router'
import grey from '@material-ui/core/colors/grey'
import logo from '../../assets/img/poweredby6p.png'

const FOOTER_HEIGHT = 80

class Footer extends React.Component {
  state = {
    value: 0
  }

  static height() {
    return FOOTER_HEIGHT
  }

  handleChange = (event, value) => {
    this.setState({value})
  }

  rootStyle = {
    width: '100%',
    height: `${FOOTER_HEIGHT}px`,
    position: 'absolute',
    bottom: '0px',
    backgroundColor: grey['100'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  render() {
    return (
      <div style={this.rootStyle}>
        <div style={{padding: '10px', textAlign: 'center'}}>
          <div>
            <a href='https://6-pillars.ooo/' alt='|||||| 6 pillars' target='_blank'>
              <img src={logo} alt='powered by |||||| 6 pillars' style={{height: '24px', marginBottom: '4px'}}/>
            </a>
          </div>
          <div>
            <a href='https://github.com/drip-samples/llllll-sample-bandstar' alt='sample codes' target='_blank'>
              <i className="fab fa-github fa-lg" style={{color: '#000000'}}></i>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Footer)
