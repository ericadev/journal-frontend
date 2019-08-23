import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import rootUrl from '../rootUrl';

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
        localStorage.setItem('user_id', response.data.user_id);
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
    const user_id = localStorage.getItem('user_id');

    if (loggedIn) {
      return <Redirect to={`/entries/${user_id}`} />;
    }

    return (
      <Container>
        <Row>
          <Col>
            <h1>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col>{error ? <h2>Error: {error}</h2> : null}</Col>
        </Row>
        <Row>
          <Col>
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
              <Button onClick={this.submitForm} className='btn btn-primary'>
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
