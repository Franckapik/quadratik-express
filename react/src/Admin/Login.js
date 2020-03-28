import React, { Component } from 'react';
import client from '../Store/client';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      error: false
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
  event.preventDefault();
  client.loginPost(this.state)
  .then(res => {
    if (res.status === 200) {
      res.json().then((data) => {
        window.localStorage.setItem('admin_token', data.token)
        this.props.history.push('/admin');
      } )
    } else {
      throw new Error(res.error);
    }
  })
  .catch(err => {
    this.setState({error : 'Erreur de connexion. Veuillez réessayer.'})
  });
}

  render() {
    return (
      <>
      <form onSubmit={this.onSubmit}>
        <h1>Votre compte</h1>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
      <button type="submit"> Se connecter </button>
      </form>

      {this.state.error ? this.state.error : null}

      </>
    );
  }
}
