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
import AuthService from "../../services/AuthService";

class ReaderNavbar extends Component {
    constructor(props) {
        super(props);

        this.toggleLoginLoutButton = this.toggleLoginLoutButton.bind(this);
    }

    render() {
        console.log(localStorage.getItem("type"));
        console.log(localStorage.getItem("jwt"));
        console.log(localStorage.getItem("uid"));
        console.log(localStorage.getItem("username"));
        return (<>
            <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-info" to="/shop" > <b> BookCart </b> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop"> Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/book/"}> My Books </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/subscription/active/"}> My Subscriptions </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/subscription/buy/"}> Subscribe </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/cart/"}> Cart </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/order/"}> Orders </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/" + AuthService.getLoggedInUser() + "/settings/"}> Settings </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about-us"> About Us </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact-us"> Contact Us </Link>
                            </li>
                        </ul>
                        {this.toggleLoginLoutButton()}
                    </div>
                </div>
            </nav>
        </>)
    }

    toggleLoginLoutButton() {
        if (AuthService.isLoggedIn()) {
            return(
                <button className="btn btn-danger form-control"
                            onClick={() => {
                                localStorage.clear(); 
                                this.props.navigate("/", {
                                    state: {
                                        alert: AlertService.getAlertInstance(true, 4, "You are logged our!", 10)
                                    }
                                });
                            }}> Logout </button>
            );
        }
        else {
            return (
                <button className="btn btn-primary form-control"
                            onClick={() => {
                                localStorage.clear(); 
                                this.props.navigate("/");
                            }}> Login </button>
            );
        }
    }
}

export default
    withNavigate(
        withLocation(
            ReaderNavbar));