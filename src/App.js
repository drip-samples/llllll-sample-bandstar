import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Web3Provider from './providers/Web3Provider'
import MyPage from './views/MyPage'
import Header from './components/Header'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Web3Provider>
        <React.Fragment>
          <Header />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MyPage} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      </Web3Provider>
    )
  }
}

export default App
