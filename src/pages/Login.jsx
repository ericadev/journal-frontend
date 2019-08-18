import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const rootUrl = 'http://localhost:3001/api/v1';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
    error: ''
  };

  submitForm = e => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({
        error: 'Please type in a login and password to log in'
      });
      e.preventDefault();
      return;
    }

    axios
      .post(`${rootUrl}/users/login`, {
        email,
        password
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        this.setState({
          loggedIn: true
        });
      })
      .catch(err => {
        this.setState({
          error:
            'There was an error logging in, please check the fields and try again.'
        });
      });
    e.preventDefault();
  };

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { loggedIn, error } = this.state;

    if (loggedIn) {
      return <Redirect to='/entries' />;
    }

    return (
      <div className='container'>
        <h1>Login</h1>
        {error ? <h2>Error: {error}</h2> : null}
        <div className='row'>
          <form>
            <div className='form-group'>
              <label htmlFor='exampleInputEmail1'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                onChange={this.changeValue}
                name='email'
              />
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword1'>Password</label>
              <input
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
                onChange={this.changeValue}
                name='password'
              />
            </div>
            <button onClick={this.submitForm} className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
