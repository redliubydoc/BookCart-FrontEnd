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
import NavBarBeforeLogin from "./Misc/NavBarBeforeLogin";
import AlertService from "../services/AlertService";

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
            
            alert: AlertService.getAlertInstance()
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doChangePassword = this.doChangePassword.bind(this);
        this.validateForm = this.validateForm.bind(this);
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
                {/* topic header placeholder */}
                <div className="container mb-4">
                    <h5 className="text-muted text-center"> Reset Password </h5>
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
                                        onClick={this.doChangePassword}> Reset </button>
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
                            parseInt(this.state.accountType)
                    )) {
                        
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
                                    alert: AlertService.getAlertInstance(true, 1, 
                                        "Your password has been changed. Login to continue")
                                    }
                                }
                            );
                        }
                        else {
                            AlertService.showAlert(this, 4, "Either date of birth or answer to the security questions are wrong");
                        }
                    }
                    else {
                        AlertService.showAlert(this, 4, "No account found for the given email id");
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
                
            AlertService.showAlert(this, 3, "Enter all fields");
            valid = false;
        } 
        else if (!ValidationService.emailIsValid(this.state.email) ) { // email validation
            AlertService.showAlert(this, 3, "Enter a valid email id");
            valid = false;
        }
        else if (!ValidationService.dateIsValid(this.state.dob)) { // date validation
            AlertService.showAlert(this, 3, "Enter a valid date");
            valid = false;
        }
        else if (!(this.state.password === this.state.confirmPassword)) { // double checking password
            AlertService.showAlert(this, 3, "There is a mismatch in passwords you entered");
            valid = false;
        }
        return valid;
    }
}

export default withNavigate(ResetPassword);