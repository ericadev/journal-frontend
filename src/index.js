import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './pages/Login';
import Register from './pages/Register';
import Entries from './pages/Entries';
import AddEntry from './pages/AddEntry';

ReactDOM.render(
  <Router>
    <Route exact path='/' component={App} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/entries' component={Entries} />
    <Route path='/addEntry' component={AddEntry} />
  </Router>,
  document.getElementById('root')
);
