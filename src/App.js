import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Web3Provider from './providers/Web3Provider'
import TokenDetail from './views/TokenDetail'
import MyPage from './views/MyPage'
import Header from './components/Header'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Web3Provider>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/tokens/:tokenId" component={TokenDetail} />
              <Route exact path="/" component={MyPage} />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </Web3Provider>
    )
  }
}

export default App
