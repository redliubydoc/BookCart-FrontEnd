import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AdminNavbar from '../Misc/AdminNavbar';

class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password: {
                old: null,
                new: null,
                confirmed: null,
            },
        }
        this._handleOldPassword = this._handleOldPassword.bind(this)
        this._handleNewPassword = this._handleNewPassword.bind(this)
        this._handleFormSubmission = this._handleFormSubmission.bind(this)
        this._handleConfirmedPassword = this._handleConfirmedPassword.bind(this)
    }


    _handleFormSubmission({ currentTarget }) {
        // Check the password 
        // match on form submission
        this._checkPasswordForMatch().then(
            ({ success }) => {
                if (success) {
                    // post data to API
                }
            }
        )
    }

    // handle storing the
    // new password in state
    _handleOldPassword(value) {
        let state = Object.assign({}, this.state)
        state.password.old = value
        this.setState(state)
    }

    // handle storing the
    // confirmed password in state   
    _handleNewPassword(value) {
        if (value === this.state.password.new) {
            let state = Object.assign({}, this.state)
            state.password.confirmed = value;
            this.setState(state);
        }
    }

    // handle storing the
    // confirmed password in state  
    async _handleConfirmedPassword() {
        let { password } = this.state;
        let state = Object.assign({}, this.state);
        if (password.new === password.confirmed) {
            state.password.match = true
        } else {
            state.password.match = false
        }
        await this.setState(state)
        return {
            success: state.password.match
        }
    }

    render() {
        return (
            <>
            <AdminNavbar/>
                <div className="container-fluid">
                    

                    {/* Side Bar */}
                    <div className="sidenav">
                        <h2>....</h2>
                        <Link to="/admin/dashboard/sales">Sales</Link>
                        <Link to="/admin/dashboard/admin"> Admin Management </Link>
                        <Link to="/admin/dashboard/change-password"> Change Password </Link>
                        <Link to="">Users</Link>
                        <Link to="">Review books</Link>
                        <Link to="">Subscription Management</Link>
                        <Link to="">Update book price</Link>
                    </div>
                    <div className="container-fluid main">
                        <form onSubmit={this.handleSubmit}>
                            <section className="py-4">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4 my-auto"></div>
                                        <h2>Change Password</h2>
                                        <br></br>
                                    </div>
                                </div>
                            </section>
                            <div className="form-group">
                                <label>Old Password</label>
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={e => this.password = e.target.value} />
                                <br></br>
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={e => this.password_confirm = e.target.value} />
                                <br></br>
                            </div>
                            <button className="btn btn-primary btn-block">Cancel</button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <button className="btn btn-primary btn-block">Submit</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default ChangePassword;