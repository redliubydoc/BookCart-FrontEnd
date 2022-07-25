import {
    React,
    Component
} from "react";

import {
    Link
} from "react-router-dom";

import withLocation from "../../hocs/withLocation";
import withNavigate from "../../hocs/withNavigate";
import AlertService from "../../services/AlertService";

class ReaderNavbar extends Component {
    constructor(props) {
        super(props);

        this.showLogin = this.showLogin.bind(this);
    }

    render() {

        return (<>
            <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand text-info" > <b> BookCart </b> </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/101/book/"> My Books </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/101/subscription/active/"> My Subscriptions </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/buy-subscription"> Subscribe </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reader/cart"> Cart </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/settings"> Settings </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us"> About Us </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact-us"> Contact Us </Link>
                            </li>
                        </ul>
                        <button className="btn btn-danger form-control"
                            onClick={() => {
                                localStorage.clear(); 
                                this.props.navigate("/", {
                                    state: {
                                        alert: AlertService.getAlertInstance(true, 4, "You are logged our!", 10)
                                    }
                                });
                            }}> Logout </button>
                    </div>
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
            ReaderNavbar));