import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthorNavbar from "../Misc/AuthorNavbar";
import "./SideBarCompStyle.css"

class Sales extends Component {

    render() {
        return (
            <>
                <AuthorNavbar/>
                <div className="container-fluid">
                    {/* Side Bar */}
                    <div className="sidenav">
                        <h2>....</h2>
                        <Link to="/admin/dashboard/sales">Sales</Link>
                        <Link to="/admin/dashboard/admin"> Admin Management </Link>
                        <Link to=""> Users </Link>
                        <Link to="">Change Password</Link>
                        <Link to="">Review books</Link>
                        <Link to="">Subscription Management</Link>
                        <Link to="">Update book price</Link>
                    </div>


                    {/* Page Content */}

                    <div className="main">
                        <h4>Sales</h4> <br />
                        

                        <div className="row">
                            <div className="col" >
                                <div className="card text-center" style={{ width: "12rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Books Sold</h5>
                                        <h3>68868</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-center" style={{ width: "12rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Revenue</h5>
                                        <h3><i className="fa fa-inr"></i>68868</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-center" style={{ width: "12rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Re orders</h5>
                                        <h3>68868</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-center" style={{ width: "12rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Authors</h5>
                                        <h3>68868</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Sales;