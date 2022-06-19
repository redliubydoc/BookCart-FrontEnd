import { 
    Component,
    React 
} from "react";

import withLocation from "../hocs/withLocation";

import LoginFrom from "./LoginForm";
import RegisterFrom from "./RegisterFrom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.alertDuration = 3; 

        this.state = {
            showLogin: true,
            showRegister: false,

            alert: {
                show: false,
                type: "",
                msg: "",
            }
        }

        this.toggler = this.toggler.bind(this);
        this.autoHideAlert = this.autoHideAlert.bind(this);
    }

    toggler(e) {
        if (e.target.name === "btn-login" && !this.state.showLogin) { // toggle to Login Tab if not already in Login Tab
            this.setState({showLogin: true, showRegister: false});
        }
        else if (e.target.name === "btn-register" && !this.state.showRegister) { // toggle to Register Tab if not already in Register Tab
            this.setState({showLogin: false, showRegister: true});
        }
    }

    render() {
        return (
            <>
                <div className="container mt-4 mb-5 text-center">
                    <h3> Welcome to BookCart </h3> 
                </div> 

                {/* login/register navigation */}
                <div className="container">
                    <ul className="nav nav-pills nav-justified mb-3">
                        <li className="nav-item">
                            <button name="btn-login"
                                className={`btn 
                                    ${this.state.showLogin ? 
                                        "btn-primary" : 
                                        "btn-outline-primary"
                                    } width-98`
                                } 
                                onClick={this.toggler}> Login </button>    
                        </li>
                        <li className="nav-item" role="presentation">
                            <button name="btn-register"
                                className={`btn 
                                    ${this.state.showRegister ? 
                                        "btn-primary" : 
                                        "btn-outline-primary"
                                    } width-98`
                                } 
                                onClick={this.toggler}> Register </button> 
                        </li>
                    </ul>
                </div>
                    
                {/* alert placeholder */}
                <div className="container">
                    {this.state.alert.show && 
                        <div className={`alert alert-${this.state.alert.type} d-flex align-items-center`} role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <span> {this.state.alert.msg} </span>
                        </div>
                    }     
                </div>  
                {/* login/registration from placeholder */}
                <div className="container-fluid">
                    { this.state.showLogin && <LoginFrom/> }
                    { this.state.showRegister && <RegisterFrom/> }
                </div>
            </>
        );
    }

    componentDidMount() {
        if (!!this.props.location.state && !!this.props.location.state.alert) { // to show alerts after redirection to login page
            console.log(this.props.location.state);
            this.setState({
                    alert: this.props.location.state.alert,
                    showLogin: true,
                    showRegister:false
                }, () => this.autoHideAlert(this.alertDuration)
            );
        }
    }
    
    autoHideAlert(time) { // to auto hide alert after a given time
        setTimeout(() => this.setState({
            alert: {
                show: false,
                type: "",
                msg: ""
            }}), time * 1000);
    }
}

export default withLocation(Login);