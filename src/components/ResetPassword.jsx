import { 
    Component,
    React 
} from "react";

import {
    Link
} from "react-router-dom";

import withNavigate from "../hocs/withNavigate";
import ValidationService from "../services/ValidationService";
import AuthService from "../services/AuthService";
import Alert from "./Misc/Alert";

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            dob: "",
            securityQuestion1: "",
            securityQuestion2: "",
            securityQuestion3: "",
            password: "",
            confirmPassword: "",
            accountType: 1,

            alert: {
                show: false,
                level: "",
                msg: ""
            }
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doChangePassword = this.doChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return (<>
            <div className="container mt-4 mb-5 text-center">
                <h3> BookCart </h3> 
            </div>

            {/* alert placeholder */}
            <div className="container">
                {this.state.alert.show && 
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
                }
            </div>

            {/* form placeholder */}
            <div className="container">
                <table className="table table-borderless">     
                    <tbody>
                        <tr>
                            <td colSpan={2}>  
                                <input name="email" 
                                    className="form-control"
                                    type="email" 
                                    placeholder="Email ID"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="dob" 
                                    className="form-control" 
                                    type="text"
                                    placeholder="Date of Birth"
                                    onFocus={(e) => e.target.type = "date"}
                                    onBlur={(e) => e.target.type = "text"}
                                    value={this.state.dob}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="securityQuestion1" 
                                    type="text"
                                    className="form-control" 
                                    placeholder="City of birth ?"
                                    value={this.state.securityQuestion1}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="securityQuestion2" 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Grandfather's name ?"
                                    value={this.state.securityQuestion2}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="securityQuestion3" 
                                    type="text"
                                    className="form-control" 
                                    placeholder="Name of first school ?"
                                    value={this.state.securityQuestion3}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>  
                                <input name="password" 
                                    className="form-control" 
                                    type="password" 
                                    placeholder="New Password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange}/>
                            </td>
                            <td>  
                                <input name="confirmPassword" 
                                className="form-control" 
                                type="password" 
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
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
                            <td className="width-50">
                                <Link className="btn btn-secondary width-100 my-3" to="/"> Cancel </Link>
                            </td>
                            <td className="width-50">
                                <button className="btn btn-primary width-100 my-3" 
                                    onClick={this.doChangePassword}> Change Password </button>
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

    doChangePassword() {
        this.setState({
                email: this.state.email.trim(),
                securityQuestion1: this.state.securityQuestion1.trim(),
                securityQuestion2: this.state.securityQuestion2.trim(),
                securityQuestion3: this.state.securityQuestion3.trim()
            }, () => {
                if (this.validateForm()) {
                    // checking account exist for the given email and account type
                    if (AuthService.findAccount(
                        this.state.email, 
                        parseInt(this.state.accountType))) {
                        
                        // if security questions are answered correctly
                        if (AuthService.securityCheck(
                                this.state.email, 
                                parseInt(this.state.accountType), 
                                this.state.dob, 
                                this.state.securityQuestion1, 
                                this.state.securityQuestion2, 
                                this.state.securityQuestion3)) {
                            
                            // TODO: change password

                            // navigate to login page and show alert there
                            this.props.navigate("/", {
                                state: {
                                    alert: {
                                        show: true,
                                        level: 1,
                                        msg: "Your password has been changed. Login to continue"
                                    }
                                }
                            });
                        }
                        else {
                            this.setState({
                                alert: {
                                    show: true,
                                    level: 4,
                                    msg: "Either date of birth or answer to the security questions are wrong"
                                }
                            });
                        }
                    }
                    else {
                        this.setState({
                            alert: {
                                show: true,
                                level: 4,
                                msg: "No account found for the given email id"
                            }
                        });
                    }
                }
            }
        );
    }

    validateForm() {
        let valid = true;

        if ((!this.state.email || this.state.email.length === 0) ||
            (!this.state.password || this.state.password.length === 0) ||
            (!this.state.confirmPassword || this.state.confirmPassword.length === 0) ||
            (!this.state.securityQuestion1 || this.state.securityQuestion1.length === 0) ||
            (!this.state.securityQuestion2 || this.state.securityQuestion2.length === 0) ||
            (!this.state.securityQuestion3 || this.state.securityQuestion3.length === 0)) { // empty filed validation
                
            this.setState({
                alert: {
                    show: true,
                    level: 3,
                    msg: "Enter all fields"
                }
            });
            valid = false;
        } 
        else if (!ValidationService.emailIsValid(this.state.email) ) { // email validation
            this.setState({
                alert: {
                    show: true,
                    level: 3,
                    msg: "Enter a valid email id"
                }
            });
            valid = false;
        }
        else if (!ValidationService.dateIsValid(this.state.dob)) { // date validation
            this.setState({
                alert: {
                    show: true,
                    level: 3,
                    msg: "Enter a valid date"
                }
            });
            valid = false;
        }
        else if (!(this.state.password === this.state.confirmPassword)) { // double checking password
            this.setState({
                alert: {
                    show: true,
                    level: 3,
                    msg: "There is a mismatch in passwords you entered"
                }
            });
            valid = false;
        }
        return valid;
    }
}

export default withNavigate(ResetPassword);