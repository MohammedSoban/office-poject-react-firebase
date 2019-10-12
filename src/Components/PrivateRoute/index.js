import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from '../Config/config.js'
import Loader from 'react-loader-spinner'


class PrivateRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    loading: false,
                    isAuthenticated: true
                })
            } else {
                this.setState({
                    loading: false,
                    isAuthenticated: false
                })
            }
        });
    }

    render() {
        const { component: Component, ...rest } = this.props
        const { loading, isAuthenticated } = this.state
        return (
            loading ?
            <Loader
            type="ThreeDots"
            color="green"
            height={100}
            width={100}
            visible={this.state.loading}
            //3 secs 
            ></Loader>:
                <Route
                    {...rest}
                    render={props =>
                        isAuthenticated ? (
                            <div>
                                <Component {...props} />
                            </div>
                        ) : (
                                <Redirect to="/login" />
                            )
                    }
                />
        )
    }
}

// const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isAuthenticated ? (
//                     <div>
//                         <Component {...props} />
//                     </div>
//                 ) : (
//                         <Redirect to="/login" />
//                     )
//             }
//         />
//     )
// }

export default PrivateRoute;