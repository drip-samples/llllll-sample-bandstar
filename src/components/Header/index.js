import React from 'react'
import { withRouter } from 'react-router'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Help from '@material-ui/icons/Help'
import Web3Injector from '../../injectors/Web3Injector'
import Web3TransactionType from '../../enums/Web3TransactionType'
import NetworkName from '../../enums/NetworkName'

class Header extends React.Component {
  state = {
    isProgress: false,
    isOpen: false,
    snackMessage: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { web3Transaction } = this.props
    if (web3Transaction !== prevProps.web3Transaction) {
      switch (web3Transaction) {
        case Web3TransactionType.pending:
          this.setState({
            isProgress: true,
            isOpen: false,
          })
          break
        case Web3TransactionType.success:
          this.setState({
            isProgress: false,
            isOpen: true,
            snackMessage: "success!",
          })
          setTimeout(() => {
            window.location.reload()
          }, 1500)
          break
        case Web3TransactionType.cancel:
          this.setState({
            isProgress: false,
            isOpen: true,
            snackMessage: "cancel transaction.",
          })
          break
        default:
          this.setState({
            isProgress: false,
            isOpen: false,
          })
          break
      }
    }
  }

  handleSnackClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  handleLogoClick = () => {
    this.props.history.push('/')
  }

  handleHelpClick = () => {
    this.props.history.push('/howto')
  }

  render() {
    const { networkId } = this.props
    const { isProgress, isOpen, snackMessage } = this.state
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" color="inherit" style={{cursor: 'pointer'}} onClick={this.handleLogoClick}>
            BandStar
          </Typography>
          <span style={{flexGrow: 1}}></span>
          {
            isProgress && <CircularProgress color="secondary" size={30} />
          }
          {
            networkId && NetworkName[networkId] && (
              <Typography variant="h6" color="inherit">
                {NetworkName[networkId]}
              </Typography>
            )
          }
          <IconButton color="inherit" onClick={this.handleHelpClick} style={{marginLeft: '16px'}}>
            <Help />
          </IconButton>
        </Toolbar>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={isOpen}
          autoHideDuration={3000}
          onClose={this.handleSnackClose}
          message={snackMessage}
        />
      </AppBar>
    )
  }
}

export default withRouter(Web3Injector(Header))
