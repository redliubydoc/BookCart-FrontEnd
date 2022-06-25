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

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {
            accountType: 1, // 1 => Reader, 2 => Author, by default Reader will be selected
            email: "",
            password: "",
            confirmPassword: "",
            dob: "",
            securityQuestion1: "",
            securityQuestion2: "",
            securityQuestion3: "",

            alert: {
                show: false,
                type: "",
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
                    <div className={`alert alert-${this.state.alert.type} d-flex align-items-center`} role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <span> {this.state.alert.msg} </span>
                    </div>
                }
            </div>

            {/* form placeholder */}
            <div className="container">
                <table className="table table-borderless">     
                    <tbody>
                        <tr>
                            <td colSpan={2}>  
                                <input name="email" 
                                    className="width-100 form-control" 
                                    type="email" 
                                    placeholder="Email ID"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="dob" 
                                    className="width-100 form-control" 
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
                                    className="width-100 form-control" 
                                    placeholder="City of birth ?"
                                    value={this.state.securityQuestion1}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="securityQuestion2" 
                                    type="text" 
                                    className="width-100 form-control" 
                                    placeholder="Grandfather's name ?"
                                    value={this.state.securityQuestion2}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input name="securityQuestion3" 
                                    type="text"
                                    className="width-100 form-control" 
                                    placeholder="Name of first school ?"
                                    value={this.state.securityQuestion3}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>  
                                <input name="password" 
                                    className="width-100 form-control" 
                                    type="password" 
                                    placeholder="New Password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange}/>
                            </td>
                            <td>  
                                <input name="confirmPassword" 
                                className="width-100 form-control" 
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
                    if (AuthService.findAccount(
                        this.state.email, 
                        parseInt(this.state.accountType))) {

                        if (AuthService.securityCheck(
                                this.state.email, 
                                parseInt(this.state.accountType), 
                                this.state.dob, 
                                this.state.securityQuestion1, 
                                this.state.securityQuestion2, 
                                this.state.securityQuestion3)) {

                            this.props.navigate("/", {
                                state: {
                                    alert: {
                                        show: true,
                                        type: "success",
                                        msg: "Your password has been changed. Login to continue"
                                    }
                                }
                            });
                        }
                        else {
                            this.setState({
                                alert: {
                                    show: true,
                                    type: "danger",
                                    msg: "Either date of birth or answer to the Security Questions are wrong"
                                }
                            });
                        }
                    }
                    else {
                        this.setState({
                            alert: {
                                show: true,
                                type: "danger",
                                msg: "No account found for the given Email ID"
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
                    type: "warning",
                    msg: "Please enter all fields"
                }
            });
            valid = false;
        } 
        else if (!ValidationService.emailIsValid(this.state.email) ) { // email validation
            this.setState({
                alert: {
                    show: true,
                    type: "warning",
                    msg: "Enter a valid email id"
                }
            });
            valid = false;
        }
        else if (!ValidationService.dateIsValid(this.state.dob)) { // date validation
            this.setState({
                alert: {
                    show: true,
                    type: "warning",
                    msg: "Enter a valid date"
                }
            });
            valid = false;
        }
        else if (!(this.state.password === this.state.confirmPassword)) { // double checking password
            this.setState({
                alert: {
                    show: true,
                    type: "warning",
                    msg: "There is a mismatch in Passwords you entered"
                }
            });
            valid = false;
        }
        return valid;
    }
}

export default withNavigate(ResetPassword);