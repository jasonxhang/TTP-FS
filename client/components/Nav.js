import React, {Fragment, useState} from 'react'
import {withRouter, NavLink} from 'react-router-dom'
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap'
import Autocomplete from './Autocomplete'
import {formatter} from './containers/currency'

const TopNav = ({isLoggedIn, handleLogout, balance, history, symbols}) => {
  const [searchVal, setSearchVal] = useState('')
  const handleSearch = e => {
    setSearchVal(e.target.value)
  }
  const resetInputField = () => {
    console.log('resetting')
    setSearchVal('')
    console.log('searchVal', searchVal)
  }
  const handleSubmit = e => {
    console.log('handling submit')
    e.preventDefault()
    history.push(`/stock/${searchVal}`)
    resetInputField()
  }

  return (
    <div className="App container">
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">TTP-FS Stock Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            {isLoggedIn ? (
              <Fragment>
                <NavLink className="nav-link" to="/portfolio">
                  Portfolio
                </NavLink>
                <NavLink className="nav-link" to="/transactions">
                  Transactions
                </NavLink>
                <NavLink className="nav-link" to="/" onClick={handleLogout}>
                  Logout
                </NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
                <NavLink className="nav-link" to="/signup">
                  Signup
                </NavLink>
              </Fragment>
            )}
          </Nav>
          {isLoggedIn && (
            <Navbar.Brand id="balance">
              Balance: {formatter.format(balance)}
            </Navbar.Brand>
          )}
          <Form inline onSubmit={e => handleSubmit(e)}>
            {/* <FormControl
              type="text"
              placeholder="Enter a ticker symbol"
              className="mr-sm-2"
              value={searchVal}
              onChange={handleSearch}
            /> */}
            <Autocomplete
              value={searchVal}
              handleSearch={handleSearch}
              setSearchVal={setSearchVal}
              suggestions={symbols}
              resetInputField={resetInputField}
              handleSubmit={handleSubmit}
              onSubmit={e => handleSubmit(e)}
            />
            {/* <Button
              type="submit"
              variant="outline-success"
              disabled={searchVal === ''}
              onSubmit={e => handleSubmit(e)}
            >
              Search
            </Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default withRouter(TopNav)
