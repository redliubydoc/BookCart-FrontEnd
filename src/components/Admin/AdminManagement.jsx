import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Misc/AdminNavbar";
import "./SideBarCompStyle.css"

class AdminManagement extends Component {
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


                    {/* Page Content */}

                    <div className="main">
                        <h4 className="text-center my-5"> Admins </h4> 
                         <table className="table table-borderless px-5">
                            <tbody>
                                <tr>
                                    <td><input className="form-control" placeholder="Username"/></td>
                                    <td><input className="form-control" placeholder="Username"/></td>
                                    <td><button className="btn btn-success form-control ">Add Admin</button></td>
                                </tr>
                            </tbody>
                        </table>
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                
                            </div>
                            <div className="form-group mb-2">
                                
                            </div>
                            
                        </form>
                        <br/>

                        <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td><button type="button" className="btn btn-danger"><i className="bi bi-trash3"></i></button></td>

                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td><button type="button" className="btn btn-danger"><i className="bi bi-trash3"></i></button></td>


                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry</td>
                                    <td><button type="button" className="btn btn-danger"><i className="bi bi-trash3"></i></button></td>


                                </tr>
                            </tbody>
                        </table>

                    </div>


                </div>

            </>
        );
    }
}

export default AdminManagement;