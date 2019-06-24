import React, {Component} from 'react'
import {Form} from 'react-bootstrap'
import LoaderButton from './containers/LoaderButton'
import {connect} from 'react-redux'
import {auth} from '../store'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({isLoading: true})

    this.props.auth(this.state.email, this.state.password, null, 'login')
  }

  render() {
    const {error} = this.props
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bssize="large">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </Form.Group>
          <LoaderButton
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading && !error}
            text="Login"
            loadingText="Logging in…"
          />
        </form>
        {error &&
          error.response && (
            <div id="error-response"> {error.response.data} </div>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = {auth}

export default connect(mapState, mapDispatch)(Login)
