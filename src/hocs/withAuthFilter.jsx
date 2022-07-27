import {
    Navigate 
} from 'react-router-dom';
import AuthService from '../services/AuthService';

function withAuthFilter(_Component) {
    return (props) => {
        let flag = AuthService.isLoggedIn();
        console.log(flag); //

        return (flag ? <_Component {...props}/> : <Navigate to="/"/>);
    };
}

export default withAuthFilter;