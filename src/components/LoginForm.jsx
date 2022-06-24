import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';

import withNavigate from '../hocs/withNavigate';
import AuthService from '../services/AuthService';
  
class Login extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            accountType: 1, // 1 => Reader, 2 => Author, by default Reader will be selected

            username : "", 
            password : "",

            alert: {
                show: false,
                type: "",
                msg: "",
            }
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return(<>
            <div className="container">
                {/* alert placeholder */}
                {this.state.alert.show && 
                    <div className={`alert alert-${this.state.alert.type} d-flex align-items-center`} role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <span> {this.state.alert.msg} </span>
                    </div>
                }

                <table className="table table-bordered">     
                    <tbody>
                        <tr>
                            <td> <label htmlFor="username"> Email ID </label> </td>
                            <td> 
                                <input name="username" 
                                    className="width-100" 
                                    type="text"  
                                    value={this.state.username} 
                                    onChange={this.handleOnChange}/> 
                            </td>
                        </tr>
                        <tr> 
                            <td> <label htmlFor="password"> Password </label> </td>
                            <td> 
                                <input name="password"
                                    className="width-100" 
                                    type="password"  
                                    value={this.state.password} 
                                    onChange={this.handleOnChange}/> 
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="accountType"> Account Type </label>
                            </td>
                            <td>
                                <select name="accountType" 
                                    className="btn btn-warning width-100" 
                                    value={this.state.accountType} 
                                    onChange={this.handleOnChange}>                       
                                    <option value={1}> Reader </option>  
                                    <option value={2}> Author </option>  
                                </select>  
                            </td>
                        </tr>
                    </tbody>             
                </table>
                <div className="text-center">
                    <button className="btn btn-primary width-100 mt-2 mb-3" 
                        onClick={this.doLogin}> Login </button> <br/>
                    <span>
                        <Link to="/forget-password/search-account"> Forget password ? </Link>
                    </span>
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
                    
                    let username = this.state.username;
                    let password = this.state.password;
                    let accountType = parseInt(this.state.accountType);

                    if (AuthService.login(username, password, accountType)) { // redirect to shop page
                        this.props.navigate("/shop");
                    }
                    else {
                        this.setState({
                            alert: {
                                type: "danger",
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

        if ((!this.state.username || this.state.username.length === 0) || (!this.state.password || this.state.password.length === 0)) { // empty filed validation
            this.setState({
                alert: {
                    type: "warning",
                    msg: "Username or Password cannot be empty",
                    show: true
                }
            });
            valid = false;
        }

        return valid;
    }
}

export default withNavigate(Login);

