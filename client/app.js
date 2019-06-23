import React, {Component, Fragment} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  Form,
  FormControl,
  Button
} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Routes from './routes'
import {connect} from 'react-redux'
import {logout, me, fetchPortfolio} from './store'
import {TopNav} from './components'
import axios from 'axios'
import Autocomplete from './components/Autocomplete'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // isAuthenticated: this.props.isLoggedIn,
      // isAuthenticating: true,
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
      // this.userHasAuthenticated(true)
      this.props.loadPortfolio()
    }

    // this.setState({
    //   isAuthenticating: false
    // })
  }

  // userHasAuthenticated = authenticated => {
  //   this.setState({
  //     isAuthenticated: authenticated
  //   })
  // }

  handleLogout = () => {
    this.props.handleLogout()
    // this.userHasAuthenticated(false)
    this.props.history.push('/')
  }

  render() {
    // console.log(this.state)
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
