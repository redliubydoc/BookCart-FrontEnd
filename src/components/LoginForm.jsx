import  React,{
   
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';

import withNavigate from '../hocs/withNavigate';
import AlertService from '../services/AlertService';
import AuthService from '../services/AuthService';
import ValidationService from '../services/ValidationService';
import Alert from './Misc/Alert';
  
class LoginForm extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            accountType: 1,

            username : "", 
            password : "",

            alert: AlertService.getAlertInstance()
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

                    // on login successful
                    if (AuthService.login(username, password, accountType)) { 
                        // redirect to shop page
                        this.props.navigate("/shop");
                    }
                    else {
                        AlertService.showAlert(this, 4, "Invalid credentials");
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
            
            AlertService.showAlert(this, 3, "Enter all fields");
            valid = false;
        }
        else if (!ValidationService.emailIsValid(this.state.username)) { // email validation
            AlertService.showAlert(this, 3, "Enter a valid email");
            valid = false;
        } 
        return valid;
    }
}

export default withNavigate(LoginForm);

