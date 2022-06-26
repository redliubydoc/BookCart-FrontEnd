import {
    Component,
    React
} from 'react';

import withNavigate from "../../hocs/withNavigate";
import AuthService from "../../services/AuthService";
import Alert from "../../components/Misc/Alert";
import NavBarBeforeLogin from '../Misc/NavBarBeforeLogin';

class AdminLogin extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            username : "", 
            password : "",

            alert: {
                show: false,
                level: "",
                msg: "",
            }
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return(<>
            {/* header placeholder */}
            <NavBarBeforeLogin/>

            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }
            
            <div className="container-fluid my-5">
                {/* topic header placeholder */}
                <div className="container mb-4">
                    <h5 className="text-muted text-center"> Admin Login </h5>
                </div>
                
                {/* form placeholder */}
                <div className="container">
                    <table className="table table-borderless">     
                        <tbody>
                            <tr>
                                <td> 
                                    <input name="username" 
                                        className="form-control" 
                                        type="text"  
                                        placeholder="Username"
                                        value={this.state.username} 
                                        onChange={this.handleOnChange}/> 
                                </td>
                            </tr>
                            <tr> 
                                <td> 
                                    <input name="password"
                                        className="form-control" 
                                        type="password"  
                                        placeholder="Password"
                                        value={this.state.password} 
                                        onChange={this.handleOnChange}/> 
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <button className="btn btn-primary width-100 my-2" 
                                    onClick={this.doLogin}> Login </button> <br/>
                                </td>
                            </tr>
                        </tbody>             
                    </table>
                </div>
            </div>
        </>);
	}

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    doLogin() {
        this.setState({
                username: this.state.username.trim()
            }, () => {
                if (this.validateForm()) {
                    // on successful login
                    if (AuthService.login(this.state.username, this.state.password, 3)) {
                        // redirect to shop page
                        this.props.navigate("/admin/dashboard");
                    }
                    else {
                        this.setState({
                            alert: {
                                level: 4,
                                msg: "Invalid credentials",
                                show: true
                            }
                        });
                    }
                }
            }
        );
    }

    validateForm() {
        let valid = true;

        // empty filed validation
        if ((!this.state.username || this.state.username.length === 0) || 
            (!this.state.password || this.state.password.length === 0)) {
         
                this.setState({
                alert: {
                    level: 3,
                    msg: "Enter all fields",
                    show: true
                }
            });
            valid = false;
        }
        return valid;
    }
}

export default withNavigate(AdminLogin);