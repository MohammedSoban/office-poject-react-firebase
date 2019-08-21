import React, { Component } from 'react';
import Header from '../Header/Header';
import {withRouter} from 'react-router-dom'

class Navigation extends Component {

componentDidMount(){
        this.props.history.push('/products');
}

    render() {
       
        return (
            <div>
                 
            </div>
        );
    }
}

export default withRouter(Navigation);