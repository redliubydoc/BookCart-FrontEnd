import { 
    React,
    Component 
} from "react";

import {
    Link
} from "react-router-dom";

import withLocation from "../../hocs/withLocation";
import withNavigate from "../../hocs/withNavigate";

class BookCartHeader extends Component {
    constructor(props) {
        super(props);

        this.showLogin = this.showLogin.bind(this);
    }

    render() {
        
        return (<>
             <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand text-info" > <b> BookCart </b> </span> 
                    <span>
                        { this.showLogin() && <Link className="btn btn-primary" to="/"> Login </Link> }
                    </span>
                </div>
            </nav>
        </>)
    }

    showLogin(path = this.props.location.pathname) {
        if (path === "/") return false;
        if (path === "/admin") return false;
        return true;
    }
}

export default  
    withNavigate(
    withLocation(
        BookCartHeader));