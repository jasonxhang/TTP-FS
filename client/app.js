import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Routes from './routes'
import {connect} from 'react-redux'
import {logout, me, fetchPortfolio} from './store'
import {TopNav} from './components'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      symbols: []
    }
  }

  async componentDidMount() {
    console.log('loading initial data')
    await this.props.loadInitialData()
    console.log('initial data loaded', this.props)

    try {
      const {data} = await axios.get('/api/stocks/symbols')
      console.log(typeof data)
      for (let obj of data) {
        obj.searchTerm = obj.symbol + '-' + obj.name
      }
      this.setState({symbols: data})
    } catch (e) {
      console.error(e)
    }

    if (this.props.isLoggedIn) {
      console.log('user is logged in')
      this.props.loadPortfolio()
    }
  }

  handleLogout = () => {
    this.props.handleLogout()
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="App container">
        <TopNav
          balance={this.props.balance}
          handleLogout={this.handleLogout}
          isLoggedIn={this.props.isLoggedIn}
          symbols={this.state.symbols}
        />
        <Routes />
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    balance: state.user.balance
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    },
    loadInitialData() {
      dispatch(me())
    },
    loadPortfolio() {
      dispatch(fetchPortfolio())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(App))
