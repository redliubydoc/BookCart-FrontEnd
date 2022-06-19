import {
    Navigate 
} from 'react-router-dom';

import AuthService from '../services/AuthService';

function withAuth(_Component) {
    return (props) => {
        let flag = AuthService.validateSession(localStorage.getItem("session-id"));
        console.log(flag); //

        return (flag ? <_Component {...props}/> : <Navigate to="/login"/>);
    };
}

export default withAuth;


