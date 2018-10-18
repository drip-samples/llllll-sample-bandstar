import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Web3Provider from './providers/Web3Provider'
import GithubPagesRedirectProvider from './providers/GithubPagesRedirectProvider'
import TokenDetail from './views/TokenDetail'
import MyPage from './views/MyPage'
import HowTo from './views/HowTo'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Web3Provider>
        <BrowserRouter basename={'/llllll-sample-bandstar'}>
          <GithubPagesRedirectProvider>
            <React.Fragment>
              <Header />
              <div style={{paddingBottom: `${Footer.height()}px`}}>
                <Switch>
                  <Route exact path="/:networkName/tokens/:tokenId" component={TokenDetail} />
                  <Route exact path="/howto" component={HowTo} />
                  <Route exact path="/" component={MyPage} />
                  <Route component={NotFound} />
                </Switch>
              </div>
              <Footer />
            </React.Fragment>
          </GithubPagesRedirectProvider>
        </BrowserRouter>
      </Web3Provider>
    )
  }
}

export default App
