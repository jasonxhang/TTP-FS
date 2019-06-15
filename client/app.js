// import React from 'react'

// import {Navbar} from './components'
// import Routes from './routes'

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes />
//     </div>
//   )
// }

// export default App

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
import {logout, me} from './store'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: this.props.isLoggedIn,
      isAuthenticating: true
    }
  }

  async componentDidMount() {
    console.log('loading initial data')
    await this.props.loadInitialData()
    console.log('initial data loaded', this.props)

    if (this.props.isLoggedIn) {
      console.log('user is logged in!!!')
      this.userHasAuthenticated(true)
    }

    this.setState({
      isAuthenticating: false
    })
  }

  userHasAuthenticated = authenticated => {
    this.setState({
      isAuthenticated: authenticated
    })
  }

  handleLogout = () => {
    this.props.handleLogout()
    this.userHasAuthenticated(false)
    this.props.history.push('/')
  }

  render() {
    // const childProps = {
    //   isAuthenticated: this.props.isLoggedIn,
    //   userHasAuthenticated: this.userHasAuthenticated
    // }
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      !this.state.isAuthenticating && (
        <div className="App container">
          {/* <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Scratch</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  </>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar> */}

          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">TTP-FS Stock Portfolio</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                {this.props.isLoggedIn ? (
                  <Nav.Link href="/" onClick={this.props.handleLogout}>
                    Logout
                  </Nav.Link>
                ) : (
                  <Fragment>
                    <Nav.Link href="/login" onClick={this.props.handleLogout}>
                      Login
                    </Nav.Link>
                    <Nav.Link href="/signup" onClick={this.props.handleLogout}>
                      Signup
                    </Nav.Link>
                  </Fragment>
                )}
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Enter a ticker symbol"
                  className="mr-sm-2"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
        </div>
      )
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleLogout() {
      dispatch(logout())
    },
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(App))
