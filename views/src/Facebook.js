import React, { Component} from 'react';
import { FacebookProvider, ShareButton } from 'react-facebook';

export default class Facebook extends Component {
  render() {
    return (
      <FacebookProvider appId="271096890269575">
        <ShareButton href="http://www.facebook.com">
          Share
        </ShareButton>
      </FacebookProvider>
    );
  }
}
