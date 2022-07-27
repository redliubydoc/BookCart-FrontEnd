import {
    React,
    Component
} from "react";

import withNavigate from "../hocs/withNavigate";
import withParams from "../hocs/withParams";
import AlertService from "../services/AlertService"
import Alert from "./Misc/Alert";
import ReaderNavbar from "./Misc/ReaderNavbar";
import ValidationService from "../services/ValidationService";
import ReaderService from "../services/ReaderService";
import withAuthFilter from "../hocs/withAuthFilter";

class AccountSettings extends Component {

    constructor(props) {
        super(props);
        console.log(this.state);

        this.state = {
            id: 101,
            firstName: "",
            lastName: "",
            emailId: "",
            phoneNumber: "",
            password: "",
            dateOfBirth: "",
            sq1: "x",
            sq2: "y",
            sq3: "z",

            alert: AlertService.getAlertInstance()
        };

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doUpdate = this.doUpdate.bind(this);
        this.doDelete = this.doDelete.bind(this);
        this.getAccountDetails = this.getAccountDetails.bind(this);
    }

    render() {
        return (<>
            {/* navbar placeholder */}
            <ReaderNavbar />

            {/* alert placeholder */}
            {this.state.alert.show &&
                <Alert level={this.state.alert.level} msg={this.state.alert.msg} />
            }

            <div className="container">
                <div className="container-fluid my-5">
                    <div className="container">
                        <div className="container shadow-lg p-5 mb-5 bg-body rounded">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td> <div className="my-2"> Name </div> </td>
                                        <td>
                                            <input className="form-control" value={this.state.firstName} disabled/>
                                        </td>
                                        <td>
                                            <input className="form-control" value={this.state.lastName} disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Email </div> </td>
                                        <td colSpan="2">
                                            <input className="form-control" 
                                                name="emailId"
                                                value={this.state.emailId}
                                                onChange={this.handleOnChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Phone number </div> </td>
                                        <td colSpan="2">
                                            <input className="form-control" 
                                                name="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={this.handleOnChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Password </div> </td>
                                        <td colSpan={2}>
                                            <input type="password"
                                                className="form-control"
                                                placeholder="Change password"
                                                name="password"
                                                value={this.state.oldPassword}
                                                onChange={this.handleOnChange}/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Date of birth </div> </td>
                                        <td colSpan="2">
                                            <input className="form-control"
                                                type="text"
                                                value={this.state.dateOfBirth} disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> City of birth ? </div> </td>
                                        <td colSpan="2">
                                            <input type="text"
                                                className="form-control"
                                                value={this.state.sq1} disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Grandfather's name ? </div> </td>
                                        <td colSpan="2">
                                        <input type="text"
                                                className="form-control"
                                                value={this.state.sq2} disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td> <div className="my-2"> Name of first school ? </div> </td>
                                        <td colSpan="2">
                                        <input type="text"
                                                className="form-control"
                                                value={this.state.sq3} disabled/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1">
                                            <button 
                                                className="btn-lg btn-danger mt-3 w-100"
                                                onClick={this.doDelete}> Delete </button>
                                        </td>
                                        <td colSpan="2">
                                            <button 
                                                className="btn-lg btn-primary mt-3 w-100"
                                                onClick={this.doUpdate}> Update </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }

    componentDidMount() {
        this.getAccountDetails();
    }

    doUpdate() {
        this.setState({
                email: this.state.emailId.trim(),
                phoneNo: this.state.phoneNumber.trim(),
            }, () => {
                if (this.validateForm()) {

                    ReaderService.updateAccountDetails(
                        this.props.params.uid, 
                        this.state.emailId, 
                        this.state.phoneNumber, 
                        this.state.password
                    ).then((response) => {
                        if (response.status === 200) {
                            this.getAccountDetails(true);
                        }
                        else {
                            response.text().then(msg => AlertService.showAlert(this, 4, msg));
                        }
                    }).catch(e => console.log(e));
                }
            }
        );
    }

    validateForm() {
        let valid = true;

        // empty filed validation
        if((!this.state.emailId || this.state.emailId.length === 0) ||
            (!this.state.phoneNumber || this.state.phoneNumber.length === 0)) {
                
            AlertService.showAlert(this, 3, "Email Id or Phone no cannot be empty");
            valid = false;
        } 
        else if (!ValidationService.emailIsValid(this.state.emailId)) { // email validation
            AlertService.showAlert(this, 3, "Enter a valid email id");
            valid = false;
        }
        else if (!ValidationService.phoneNoIsValid(this.state.phoneNumber)) { // phone number validation
            AlertService.showAlert(this, 3, "Enter a valid phone number");
            valid = false;
        }
        return valid;
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state.emailId, this.state.phoneNumber, this.state.password));
    }

    getAccountDetails(flag) {
        if (flag) {
            AlertService.showAlert(this, 1, "Details updated");
        }

        ReaderService.getAccountDetails(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(data => this.setState({
                            id: data.id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            emailId: data.emailId,
                            phoneNumber: data.phoneNumber,
                            password: data.password,
                            dateOfBirth: data.dateOfBirth,
                            sq1: data.sq1,
                            sq2: data.sq2,
                            sq3: data.sq3
                        }));
                }
            }).catch(e => console.log(e));
    }

    doDelete = () => {
        ReaderService.deleteAccount(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.clear(); 
                    this.props.navigate("/", {
                        state: {
                            alert: AlertService.getAlertInstance(true, 2, "Your account has been deleted")
                        }
                    });
                }
                else {
                    AlertService.showAlert(this, 4, "Some error has occurred");
                }
            }).catch(e => console.log(e));
    };
}

export default 
    withAuthFilter(
    withNavigate(
    withParams(
        AccountSettings)));