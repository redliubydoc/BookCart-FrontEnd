import React, { Component } from 'react';
import Alert from "../../components/Misc/Alert";
import AlertService from '../../services/AlertService';
import AdminService from '../../services/AdminService';

class ChangePassword extends Component {

    constructor(props) {

        super(props);
        this.state = {
            id: "",
            username: "",
            password: "",

            alert: AlertService.getAlertInstance()
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <>
                {this.state.alert.show &&
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg} />
                }
                <div className="container p-5">

                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="py-3"> Username </div>
                                    <input name="username"
                                        type="text"
                                        className="form-control"
                                        value={this.state.username}
                                        disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="py-3"> Password </div>
                                    <input name="password"
                                        type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={this.handleChange} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button className="btn btn-primary my-3 form-control"
                                        onClick={this.handleSubmit}> Change </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        AdminService.getAdmin()
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(
                        (data) => {
                            this.setState({
                                id: data.adminId,
                                username: data.username
                            })
                        }
                    );
                }
            }).catch(e => console.log(e));
    }

    handleSubmit() {
        let id = this.state.id;
        let username = this.state.username
        let password = this.state.password
        AdminService.changePassword(id, username, password)
            .then((response) => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, "Password updated!", 5);
                }
                else {
                    response.text((msg) => AlertService.showAlert(this, 4, msg));
                }
            }).catch(e => console.log(e));
    }
}

export default ChangePassword;