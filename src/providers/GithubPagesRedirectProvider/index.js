import React from 'react'
import { withRouter } from 'react-router'

class GithubPagesRedirectProvider extends React.Component {
  componentDidMount() {
    const pathName = window.sessionStorage.redirect
    window.sessionStorage.redirect = null
    console.log(pathName)
    if (pathName !== 'null') {
      this.props.history.push(pathName)
    }
  }

  render() {
    return React.cloneElement(React.Children.only(this.props.children), {...this.props});
  }
}

export default withRouter(GithubPagesRedirectProvider)
