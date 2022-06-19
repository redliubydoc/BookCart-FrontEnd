import { 
    Component,
    React 
} from "react";

import moment from "moment";
import withNavigate from "../hocs/withNavigate";

class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            accountType: 1, // 1 => Reader, 2 => Author, by default Reader will be selected
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
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
        this.doRegister = this.doRegister.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.emailIsValid = this.emailIsValid.bind(this);
        this.phoneNoIsValid = this.phoneNoIsValid.bind(this);
    }

    render() {
        return (<>
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
                            <td> Account Type </td>
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
                            <td> Name </td>
                            <td>  
                                <input name="firstName" 
                                    className="width-100" 
                                    type="text" 
                                    placeholder="first name"
                                    value={this.state.firstName}
                                    onChange={this.handleOnChange}/>
                            </td>
                            <td>
                                <input name="lastName" 
                                    className="width-100" 
                                    type="text" 
                                    placeholder="last name"
                                    value={this.state.lastName}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td> Contact Information </td>
                            <td>  
                                <input name="email" 
                                    className="width-100" 
                                    type="email" 
                                    placeholder="email id"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}/>
                            </td>
                            <td>  
                                <input name="phoneNo" 
                                    className="width-100" 
                                    type="tel" 
                                    placeholder="phone no."
                                    value={this.state.phoneNo}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td> Password </td>
                            <td>  
                                <input name="password" 
                                    className="width-100" 
                                    type="password" 
                                    placeholder="enter password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange}/>
                            </td>
                            <td>  
                                <input name="confirmPassword" 
                                className="width-100" 
                                type="password" 
                                placeholder="confirm password"
                                value={this.state.confirmPassword}
                                onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td> Date of Birth </td>
                            <td colSpan={2}>  
                                <input name="dob" 
                                    className="width-100" 
                                    type="date"
                                    value={this.state.dob}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td> Security Questions </td>
                            <td colSpan={2}>
                                <input name="securityQuestion1" 
                                    type="text"
                                    className="width-100 my-1" 
                                    placeholder="city of birth ?"
                                    value={this.state.securityQuestion1}
                                    onChange={this.handleOnChange}/>

                                <input name="securityQuestion2" 
                                    type="text" 
                                    className="width-100 my-1" 
                                    placeholder="grandfather's name ?"
                                    value={this.state.securityQuestion2}
                                    onChange={this.handleOnChange}/>

                                <input name="securityQuestion3" 
                                    type="text"
                                    className="width-100 my-1" 
                                    placeholder="name of first school ?"
                                    value={this.state.securityQuestion3}
                                    onChange={this.handleOnChange}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
                    <button className="btn btn-primary width-100 my-2" 
                        onClick={this.doRegister}> Register </button>
                </div>
            </div>
        </>);
    }

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    doRegister() {
        this.setState({
                firstName: this.state.firstName.trim(),
                lastName: this.state.lastName.trim(),
                email: this.state.email.trim(),
                phoneNo: this.state.phoneNo.trim(),
                securityQuestion1: this.state.securityQuestion1.trim(),
                securityQuestion2: this.state.securityQuestion2.trim(),
                securityQuestion3: this.state.securityQuestion3.trim()
            }, () => {
                if (this.validateForm()) {
                    // TODO: registration service code

                    // Redirection to shop page
                    this.props.navigate("/shop");
                }
            }
        );
    }

    validateForm() {
        let valid = true;

        if ((!this.state.firstName || this.state.firstName.length === 0) || 
            (!this.state.lastName || this.state.lastName.length === 0) ||
            (!this.state.email || this.state.email.length === 0) ||
            (!this.state.phoneNo || this.state.phoneNo.length === 0) ||
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
        else if (!this.emailIsValid(this.state.email)) { // email validation
            this.setState({
                alert: {
                    show: true,
                    type: "warning",
                    msg: "Enter a valid email id"
                }
            });
            valid = false;
        }
        else if (!this.phoneNoIsValid(this.state.phoneNo)) { // phone number validation
            this.setState({
                alert: {
                    show: true,
                    type: "warning",
                    msg: "Enter a valid phone number"
                }
            });
            valid = false;
        }
        else if (!moment(this.state.dob).isValid()) { // date validation
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

    emailIsValid(email) {
        // TODO: code to validate email
        return true;
    }

    phoneNoIsValid(phoneNo) {
        // TODO: code to validate Indian phone number
        return true;
    }
}

export default withNavigate(Register);