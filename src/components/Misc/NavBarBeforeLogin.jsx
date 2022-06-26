import { 
    React,
    Component 
} from "react";

import {
    Link
} from "react-router-dom";

import withNavigate from "../../hocs/withNavigate";

class BookCartHeader extends Component {
    render() {
        return (<>
             <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand text-primary" > <b> Book Cart </b> </span> 
                    <span class="bg-success">
                        <Link class="btn btn-primary" to="/"> Login </Link>
                    </span>
                </div>
            </nav>
        </>)
    }
}

export default  withNavigate(BookCartHeader);