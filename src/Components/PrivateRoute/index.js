import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from '../Config/config.js'

class PrivateRoute extends React.Component {
    state = {
        loading: true,
        isAuthenticated: false
    }

    componentDidMount() {
        debugger
        firebase.auth().onAuthStateChanged((user) => {
            debugger
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
                "...loading" :
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

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;