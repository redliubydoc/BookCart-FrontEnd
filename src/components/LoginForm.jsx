import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';

import withNavigate from '../hocs/withNavigate';
import AuthService from '../services/AuthService';
import ValidationService from '../services/ValidationService';
import Alert from './Misc/Alert';
  
class Login extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            accountType: 1,

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
            {/* form placeholder */}
            <div className="container">
                <table className="table table-borderless">  
                    <tbody>
                        {/* alert placeholder */}
                        <tr>
                            <td> 
                                { this.state.alert.show && <Alert level={this.state.alert.level} msg={this.state.alert.msg}/> } 
                            </td>
                        </tr>
                        <tr>
                            <td> 
                                <input name="username" 
                                    className="form-control" 
                                    type="text"  
                                    placeholder="Email ID"
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
                                <select name="accountType" 
                                    className="btn btn-warning width-100"
                                    value={this.state.accountType} 
                                    onChange={this.handleOnChange}>                       
                                    <option value={1}> Reader </option>  
                                    <option value={2}> Author </option>  
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="btn btn-primary width-100 mt-2" 
                                    onClick={this.doLogin}> Login </button> <br/>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-center">
                                <Link to="/reset-password"> Forget password ? </Link>
                            </td>
                        </tr>
                    </tbody>             
                </table>
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

                    AuthService.login(username, password, accountType)
                        .then(response => response.json())
                        .then(data => {
                            if (data.flag == 1) { // on login successful
                                this.props.navigate("/shop"); // redirect to shop page
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
                        }).catch(error => console.log(error));
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
        else if (!ValidationService.emailIsValid(this.state.username)) { // email validation
            this.setState({
                alert: {
                    level: 3,
                    msg: "Enter a valid email",
                    show: true
                }
            });
            valid = false;
        } 
        return valid;
    }
}

export default withNavigate(Login);

