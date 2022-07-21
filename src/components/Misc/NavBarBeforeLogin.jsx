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
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link" to="/shop"> Home </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/about-us"> About Us </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/contact-us"> Contact Us </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/feedback/add"> Write Feedback </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/product"> Product Page </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/buy-subscription"> Subscribe </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/my-subscription"> Active Subscriptions </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/book-page"> Book Page </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/cart"> Cart </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/settings"> Settings </Link>
                            </li>
                        </ul>
                        {/* <span>
                            {this.showLogin() && <Link className="btn btn-primary" to="/"> Login </Link>}
                        </span> */}
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
            BookCartHeader));