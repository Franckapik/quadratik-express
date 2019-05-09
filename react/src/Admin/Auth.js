import auth0 from 'auth0-js';

class Auth {
  constructor() {

    if (process.env.NODE_ENV === 'production') {
      this.auth0 = new auth0.WebAuth({
        domain: 'quadratik.eu.auth0.com',
        clientID: 'jtjmgEXugxV92nFwdfKqXyQ6VMuh3ivK',
        redirectUri: 'https://quadratik.fr/callback',
        responseType: 'id_token',
        scope: 'openid profile'
      });
    } else {
      this.auth0 = new auth0.WebAuth({
        domain: 'quadratik.eu.auth0.com',
        clientID: 'jtjmgEXugxV92nFwdfKqXyQ6VMuh3ivK',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'id_token',
        scope: 'openid profile'
      });
    }

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        console.log(authResult);

        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.setSession(authResult);
        resolve();
      });
    })
  }

  getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  getIdToken() {
    return localStorage.getItem('id_token');
  }

  isAuthenticated() {
    return new Date().getTime() < JSON.parse(localStorage.getItem('expires_at'));
  }

  signIn() {
    this.auth0.authorize();
  }

  setSession(authResult) {
    console.log(authResult);
  localStorage.setItem('id_token', authResult.idToken);
  localStorage.setItem('profile', JSON.stringify(authResult.idTokenPayload));
  console.log('Temps expiration:', (authResult.idTokenPayload.exp*1000 - new Date().getTime())/1000, 'secondes');
  localStorage.setItem('expires_at', JSON.stringify(authResult.idTokenPayload.exp*1000));
  // navigate to the home route
}



  signOut() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    console.log('signout');
    window.location = "http://www.mozilla.org";
    // navigate to the home route
  }
}

const auth0Client = new Auth();

export default auth0Client;
