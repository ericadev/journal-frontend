import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      Please <Link to='/login'>Login</Link> or{' '}
      <Link to='/register'>Register</Link> to view or add journal entries.
    </div>
  );
};

export default App;
