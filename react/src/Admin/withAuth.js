import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import client from '../Store/client';


export default function withAuth(ComponentToProtect) {  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }    componentDidMount() {
      const adminToken = localStorage.getItem('admin_token');
      client.checkTokenFetch(adminToken)
      .then(res => {
          if (!res.message) {
            this.setState({
              loading: false,
              userid: res.userid
             });
            console.log(res);
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          this.setState({ loading: false, redirect: true });
        });
    }    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect userid={this.state.userid} />
        </React.Fragment>
      );
    }
  }}
