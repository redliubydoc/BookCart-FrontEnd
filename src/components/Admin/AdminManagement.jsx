import React, { Component } from "react";
import AdminService from "../../services/AdminService";
import AlertService from "../../services/AlertService";
import Alert from "../Misc/Alert";
import AuthService from "../../services/AuthService";


class AdminManagement extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            admins: [],

            newAdminUserName : "",
            newAdminPassword : "",

            alert: AlertService.getAlertInstance()
        }

        this.doAddAdmin = this.doAddAdmin.bind(this);
        this.getAdmins = this.getAdmins.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.doDelete = this.doDelete.bind(this);
    }
    render() {
        return (
            <>
                {/* alert placeholder */}
                {this.state.alert.show &&
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
                }

                <div className="container">
                    <div className="container-fluid">
                        <h4 className="text-center my-5"> Admins </h4> 
                         <table className="table table-borderless px-5">
                            <tbody>
                                <tr>
                                    <td>
                                        <input name="newAdminUserName"
                                            value={this.newAdminUserName}
                                            className="form-control" 
                                            placeholder="Username"
                                            onChange={this.handleOnChange}/>
                                    </td>
                                    <td>
                                        <input name="newAdminPassword"
                                            value={this.newAdminPassword}
                                            type="password" 
                                            className="form-control" placeholder="Password"
                                            onChange={this.handleOnChange}/>
                                    </td>
                                    <td>
                                        <button className="btn btn-success form-control"
                                            onClick={this.doAddAdmin}> Add </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        
                        <br/>

                        <table className="table table-striped table-danger text-center">
                            <thead>
                                <tr>
                                    <th scope="col"> Id </th>
                                    <th scope="col"> Username </th>
                                    <th scope="col"> Action </th>

                                </tr>
                            </thead>
                            <tbody>{
                                this.state.admins.map((admin) => (
                                    <tr key={admin.adminId}>
                                        <td> {admin.adminId} </td>
                                        <td> {admin.username} </td>
                                        <td>
                                            <button type="button" 
                                                className="btn btn-danger"
                                                onClick={() => this.doDelete(admin.adminId)}
                                                disabled = {(AuthService.getLoggedInUser() == admin.adminId)}>
                                                    <i className="bi bi-trash3"></i>
                                        </button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        this.getAdmins();
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () =>  console.log(this.state));
    }

    doAddAdmin() {
        AdminService.addAdmin(this.state.newAdminUserName, this.state.newAdminPassword)
            .then((response) => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, "Admin added", 5);
                    this.getAdmins();
                }
                else {
                    response.text().then(msg => AlertService.showAlert(this, 4, msg, 5));
                }
            }).catch(e => console.log(e));
    }

    getAdmins() {
        AdminService.getAdmins()
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(data => this.setState({admins: data}));
                }
            }).catch(e => console.log(e));
    }

    doDelete(adminId) {
        AdminService.deleteAdmin(adminId)
            .then((response) => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, "Admin Deleted", 5);
                    this.getAdmins();
                }
                else {
                    response.text().then(msg => AlertService.showAlert(this, 4, msg, 5));
                }
            }).catch(e => console.log(e));
    }
}

export default AdminManagement;