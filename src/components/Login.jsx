import { 
    Component,
    React 
} from "react";

import withLocation from "../hocs/withLocation";
import LoginFrom from "./LoginForm";
import RegisterFrom from "./RegisterFrom";
import Alert from "./Misc/Alert"

class Login extends Component {

    constructor(props) {
        super(props);

        this.alertDuration = 5; 

        this.state = {
            showLogin: true,
            showRegister: false,

            alert: {
                show: false,
                level: "",
                msg: "",
            }
        }

        this.toggler = this.toggler.bind(this);
        this.autoHideAlert = this.autoHideAlert.bind(this);
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
                        <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
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
        // to show alerts after redirection to login page
        if (!!this.props.location.state && !!this.props.location.state.alert) { 
            this.setState({
                    alert: this.props.location.state.alert,
                    showLogin: true,
                    showRegister:false
                }, () => this.autoHideAlert(this.alertDuration)
            );
        }
    }
    
    toggler(e) {
        if (e.target.name === "btn-login" && !this.state.showLogin) { // toggle to Login Tab if not already in Login Tab
            this.setState({showLogin: true, showRegister: false});
        }
        else if (e.target.name === "btn-register" && !this.state.showRegister) { // toggle to Register Tab if not already in Register Tab
            this.setState({showLogin: false, showRegister: true});
        }
    }
    // to auto hide alert after a given time
    autoHideAlert(time) {
        setTimeout(() => this.setState({
            alert: {
                show: false,
                level: "",
                msg: ""
            }}), time * 1000);
    }
}

export default withLocation(Login);