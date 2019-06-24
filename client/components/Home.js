import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

class Home extends Component {
  renderLander() {
    return (
      <div className="lander">
        <h1>Stock Portfolio</h1>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    )
  }

  render() {
    const {user} = this.props
    console.log(user)
    return (
      <div className="page-container">
        {user.email ? (
          <Jumbotron>
            <h1>Hello, {user.signUpName}!</h1>
            <p>
              Welcome to Stock Portfolio. Feel free to search for stocks and
              view quotes, company info and more. Portfolio view displays all
              currently owned stocks and Transactions provides a view of all
              transactions and performance.
            </p>
          </Jumbotron>
        ) : (
          <Jumbotron>
            <h1>Hello, Guest!</h1>
            <p>
              Welcome to Stock Portfolio. Feel free to search for stocks and
              view quotes, company info and more. Please sign up for an account
              or login to buy and sell for your portfolio and track transaction
              performance over time.
            </p>
          </Jumbotron>
        )}
      </div>
    )
  }
}

const mapState = ({user}) => ({user})

export default connect(mapState)(Home)
