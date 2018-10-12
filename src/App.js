import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import Web3Provider from './providers/Web3Provider'
import MyPage from './views/MyPage'
import NotFound from './components/NotFound'

class App extends Component {
  render() {
    return (
      <Web3Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MyPage} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Web3Provider>
    )
  }
}

export default App
