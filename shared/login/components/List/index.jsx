// NPM
import React from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';

// Component
import style from './style.css';

class List extends React.Component {

  constructor() {

    super();

    this.state = {
      users: [],
      message: 'No authorisation token'
    };
  }

  render () {

    return (
      <div className={style.root}>
        <h1>{ this.state.message }</h1>
        {this.state.users.map((user, index) => {
          return (
            <div className={style.item} key={index}>
              <pre>{ JSON.stringify(user) }</pre>
            </div>
          );
        })}
      </div>
    );
  }

  componentWillMount () {
    const token = Cookie.get('token');
    if (!token) return;

    axios
      .get('/api/users', {
        headers: {
          'x-access-token': token
        }
      })
      .then(response => {
        this.setState({
          'users': response.data,
          'message': 'You\'re authorised :)'
        });
      })
      .catch(error => {
        this.setState({
          'message': error.response.statusText
        });
      });
  }
}

export default List;
