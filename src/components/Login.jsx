import { 
    Component,
    React 
} from "react";

import withLocation from "../hocs/withLocation";
import LoginFrom from "./LoginForm";
import RegisterFrom from "./RegisterFrom";
import Alert from "./Misc/Alert"
import NavBarBeforeLogin from "./Misc/NavBarBeforeLogin";
import AlertService from "../services/AlertService";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showLogin: true,
            showRegister: false,

            alert: AlertService.getAlertInstance()
        }

        this.toggler = this.toggler.bind(this);
    }

    render() {
        return (<>
            {/* header placeholder */}
            <NavBarBeforeLogin/>

            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }

            <div className="container-fluid my-5">
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

                {/* login/registration from placeholder */}
                { this.state.showLogin && <LoginFrom/> }
                { this.state.showRegister && <RegisterFrom/> }
            </div>
        </>);
    }

    componentDidMount() {
        // to show login / register page
        if (!!this.props.location.state && !!this.props.location.state.showLogin && !!this.props.location.state.showRegister) { 
            this.setState({
                showLogin: this.props.location.state.showLogin,
                showRegister:this.props.location.state.showRegister
            });
        }

        // to show alerts after redirection to login page
        else if (!!this.props.location.state && !!this.props.location.state.alert) { 
            let level = this.props.location.state.alert.level;
            let msg = this.props.location.state.alert.msg;

            this.setState({
                    showLogin: true,
                    showRegister:false
                }, () => AlertService.showAlert(this, level, msg, 10)
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
}

export default withLocation(Login);