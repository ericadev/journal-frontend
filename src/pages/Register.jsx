import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
const rootUrl = 'http://localhost:3001/api/v1';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    error: ''
  };

  submitForm = e => {
    const { name, email, password, passwordConfirm } = this.state;

    if (!name || !email || !password || !passwordConfirm) {
      this.setState({
        error: 'Please check all fields are filled and try again.'
      });
      e.preventDefault();
      return;
    }

    axios
      .post(`${rootUrl}/users/signup`, {
        name,
        email,
        password,
        passwordConfirm
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
            'There was an error registering, please check all fields and try again.'
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
            <form method='POST'>
              <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  placeholder='Enter name'
                  onChange={this.changeValue}
                  name='name'
                />
              </div>
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
              <div className='form-group'>
                <label htmlFor='exampleInputPassword2'>Confirm Password</label>
                <input
                  type='password'
                  className='form-control'
                  id='exampleInputPassword2'
                  placeholder='Confirm Password'
                  onChange={this.changeValue}
                  name='passwordConfirm'
                />
              </div>
              <button onClick={this.submitForm} className='btn btn-primary'>
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
