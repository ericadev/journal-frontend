import React, { Component } from 'react';
import axios from 'axios';
const rootUrl = 'http://localhost:3001/api/v1';

export default class Entries extends Component {
  state = {
    entries: []
  };

  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get(`${rootUrl}/entries`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => this.setState({ entries: response.data.data }))
        .catch(err =>
          this.setState({
            error:
              'There was an error getting entries, please reload to try again'
          })
        );
    }
  }

  handleAddEntryClick = () => {
    this.props.history.push('/addEntry');
  };

  deleteEntry = id => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .delete(`${rootUrl}/entries/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          axios
            .get(`${rootUrl}/entries`, {
              headers: {
                authorization: `Bearer ${token}`
              }
            })
            .then(response => this.setState({ entries: response.data.data }));
        })
        .catch(err =>
          this.setState({
            error: 'There was an error deleting this entry, please try again.'
          })
        );
    }
  };

  render() {
    const { entries, error } = this.state;

    if (entries.length > 0) {
      return (
        <div className='container'>
          <div className='row'>
            <h1>Entries</h1>
            {error ? <h2>Error: {error}</h2> : null}
          </div>
          <div className='row'>
            <ul>
              {entries.map(entry => (
                <div key={entry._id}>
                  <h1>{entry.title}</h1>
                  <small>{entry.date}</small>
                  <p>{entry.content}</p>
                  <button onClick={() => this.deleteEntry(entry._id)}>
                    Delete
                  </button>
                </div>
              ))}
            </ul>
          </div>
          <div className='row'>
            <button onClick={this.handleAddEntryClick}>Add Entry</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Please login to see journal entries If you are logged in, there are no
          entries, so add one.
          <button onClick={this.handleAddEntryClick}>Add Entry</button>
        </div>
      );
    }
  }
}
