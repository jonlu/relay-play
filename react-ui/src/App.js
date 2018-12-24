import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      fetching: true,
      firstName: '',
      lastName: ''
    }
  }

  componentDidMount () {
    fetch('/api')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`)
        }
        return response.json()
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        })
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        })
      })
  }

  handleChange = (stateVar) => (se) => {
    this.setState({[stateVar]: se.target.value})
  }

  handleSubmit = async (se) => {
    const { firstName, lastName } = this.state;
    se.preventDefault();
    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({firstName, lastName}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    console.log(res);
  }

  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          { process.env.NODE_ENV === 'production'
            ? <p>
              This is a production build from create-react-app.
            </p>
            : <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
          }
          <p>{'« '}<strong>
            {this.state.fetching
              ? 'Fetching message from API'
              : this.state.message}
          </strong>{' »'}</p>
          <p><a
            className='App-link'
            href='https://github.com/mars/heroku-cra-node'
          >
            React + Node deployment on Heroku
          </a></p>
          <p><a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a></p>
          <form onSubmit={this.handleSubmit}>
            <label>
              First name:
              <input type="text" value={this.state.firstName} onChange={this.handleChange('firstName')} />
            </label>
            <label>
              Last name:
              <input type="text" value={this.state.lastName} onChange={this.handleChange('lastName')} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>
      </div>
    )
  }
}

export default App
