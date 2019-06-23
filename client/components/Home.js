import React, {Component} from 'react'
import {ListGroup, Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {connect} from 'react-redux'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      notes: []
    }
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      return
    }

    try {
      // const notes = await this.notes();
      this.setState({})
    } catch (e) {
      alert(e)
    }

    this.setState({isLoading: false})
  }

  // notes() {
  //   return API.get('notes', '/notes');
  // }

  // renderNotesList(notes) {
  //   return [{}].concat(notes).map((note, i) =>
  //     i !== 0 ? (
  //       <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
  //         <ListGroupItem header={note.content.trim().split('\n')[0]}>
  //           {'Created: ' + new Date(note.createdAt).toLocaleString()}
  //         </ListGroupItem>
  //       </LinkContainer>
  //     ) : (
  //       <LinkContainer key="new" to="/notes/new">
  //         <ListGroupItem>
  //           <h4>
  //             <b>{'\uFF0B'}</b> Create a new note
  //           </h4>
  //         </ListGroupItem>
  //       </LinkContainer>
  //     )
  //   );
  // }

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

  renderNotes() {
    return (
      <div className="notes">
        <h1>Your Notes</h1>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup>
      </div>
    )
  }

  render() {
    const {user} = this.props
    console.log(user)
    return (
      <div className="Home">
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

// const mapState = state => {
//   return {

//     name: state.user.name
//   }
// }

const mapState = ({user}) => ({user})

export default connect(mapState)(Home)
