import React, { Component } from 'react';
import { FacebookProvider, Comments } from 'react-facebook';
//import { commentsData } from './data/index';

class Commentss extends Component {
      render() {
        return (
            <FacebookProvider appId="123456789">
            <Comments href="http://www.facebook.com" />
          </FacebookProvider>
        );
    }
}

export default Commentss;