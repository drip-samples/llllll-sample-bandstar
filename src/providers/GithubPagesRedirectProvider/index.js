import React from 'react'
import { withRouter } from 'react-router'

class GithubPagesRedirectProvider extends React.Component {
  componentDidMount() {
    const pathName = window.sessionStorage.redirect
    const splitPathName = pathName ? pathName.split('/llllll-sample-bandstar') : []
    window.sessionStorage.redirect = null
    if (1 < splitPathName.length) {
      this.props.history.push(splitPathName[1])
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {...this.props})
  }
}

export default withRouter(GithubPagesRedirectProvider)
