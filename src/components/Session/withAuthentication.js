import React from 'react';
import AuthorizedUserCont from './context';
import { auth } from '../../Firebase';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            this.listener = auth.onAuthStateChanged(
                authUser => {
                    authUser ? this.setState({authUser}) : this.setState({authUser: null});
                }
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
                <AuthorizedUserCont.Provider value={this.state.authUser}>
                    <Component {...this.props}/>
                </AuthorizedUserCont.Provider>
                );
        }
    }


    return ( WithAuthentication );
}
 
export default withAuthentication;