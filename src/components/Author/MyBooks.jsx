import React, { Component } from "react";
import AuthorNavbar from "../Misc/AuthorNavbar";

class MyBooks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pages: 1,
            currentPage: 3
        }


        this.doPagination = this.doPagination.bind(this);
    }
    render() {
        return (
            <>
                <AuthorNavbar/>

                <div className="container-fluid my-5">
                    <div className="container">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Status</th>
                                    <th>Copies Sold</th>
                                    <th>Revenue Generated</th>
                                    <th>Admin's Feedback</th>
                                    <th>Preview</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td> 9780241988251 </td>
                                    <td> <div className="badge bg-success"> Approved </div></td>
                                    <td> <div > 5 </div> </td>
                                    <td> <div > ₹ 2500  </div> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi-pencil-square text-info"></i> </a></button>  </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a></button>  </td>
                                    <td> <button className="btn" disabled><a href="#"> <i className="bi bi-trash3-fill text-danger"></i> </a> </button> </td>
                                </tr>
                                <tr>
                                    <td> 9780593439111 </td>
                                    <td> <div className="badge bg-warning"> Pending </div></td>
                                    <td> <div > _ </div> </td>
                                    <td> <div > _  </div> </td>
                                    <td> <button className="btn" disabled> <a href="#"><i className="bi-pencil-square text-info"></i> </a> </button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a></button>  </td>
                                    <td> <button className="btn"><a href="#"> <i className="bi bi-trash3-fill text-danger"></i> </a></button>  </td>
                                </tr>
                                <tr>
                                    <td> 9780062013347 </td>
                                    <td> <div className="badge bg-danger"> Rejected </div></td>
                                    <td> <div > _ </div> </td>
                                    <td> <div > _  </div> </td>
                                    <td> <button className="btn"><a href="#"> <i className="bi-pencil-square text-info"></i> </a> </button> </td>
                                    <td> <button className="btn"><a href="#"> <i className="bi bi-eye-fill text-danger"></i> </a> </button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button> </td>
                                </tr>
                                <tr>
                                    <td> 9780241988251 </td>
                                    <td> <div className="badge bg-success"> Approved </div></td>
                                    <td> <div > 5 </div> </td>
                                    <td> <div > ₹ 2500  </div> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi-pencil-square text-info"></i> </a></button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a> </button></td>
                                    <td> <button className="btn" disabled> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button></td>
                                </tr>
                                <tr>
                                    <td> 9780593439111 </td>
                                    <td> <div className="badge bg-warning"> Pending </div></td>
                                    <td> <div > _ </div> </td>
                                    <td> <div > _  </div> </td>
                                    <td> <button className="btn" disabled><a href="#"> <i className="bi-pencil-square text-info"></i> </a> </button></td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a></button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button></td>
                                </tr>
                                <tr>
                                    <td> 9780062013347 </td>
                                    <td> <div className="badge bg-success"> Approved </div></td>
                                    <td> <div > 2 </div> </td>
                                    <td> <div > ₹ 642  </div> </td>
                                    <td> <button className="btn"><a href="#"><i className="bi-pencil-square text-info"></i></a> </button></td>
                                    <td> <button className="btn"><a href="#"><i className="bi bi-eye-fill text-danger"></i> </a></button> </td>
                                    <td> <button className="btn" disabled><a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a></button> </td>
                                </tr>
                                <tr>
                                    <td> 9780241988251 </td>
                                    <td> <div className="badge bg-success"> Approved </div></td>
                                    <td> <div > 5 </div> </td>
                                    <td> <div > ₹ 2500  </div> </td>
                                    <td> <button className="btn"><a href="#"><i className="bi-pencil-square text-info"></i> </a> </button></td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a> </button></td>
                                    <td> <button className="btn" disabled> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button></td>
                                </tr>
                                <tr>
                                    <td> 9780593439111 </td>
                                    <td> <div className="badge bg-warning"> Pending </div></td>
                                    <td> <div > _ </div> </td>
                                    <td> <div > _  </div> </td>
                                    <td> <button className="btn" disabled> <a href="#"><i className="bi-pencil-square text-info"></i> </a></button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-eye-fill text-danger"></i> </a></button> </td>
                                    <td> <button className="btn"> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button></td>
                                </tr>
                                <tr>
                                    <td> 9780062013347 </td>
                                    <td> <div className="badge bg-success"> Approved </div></td>
                                    <td> <div > 5 </div> </td>
                                    <td> <div > ₹ 1000  </div> </td>
                                    <td> <button className="btn"><a href="#"> <i className="bi-pencil-square text-info"></i> </a> </button></td>
                                    <td> <button className="btn"><a href="#"> <i className="bi bi-eye-fill text-danger"></i> </a> </button></td>
                                    <td> <button className="btn" disabled> <a href="#"><i className="bi bi-trash3-fill text-danger"></i> </a> </button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item"><a className="page-link" href="#">&lt;&lt;</a></li>
                        <li className="page-item"><a className="page-link" href="#">&lt;</a></li>
                        <li className="page-item "><a className="page-link" href="#">1</a></li>
                        <li className="page-item active"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">&gt;</a></li>
                        <li className="page-item"><a className="page-link" href="#">&gt;&gt;</a></li>
                    </ul>
                </nav> */}

                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-left"
                                name="moveFirst"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi bi-caret-left-fill"
                                name="movePrev"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className="page-item active">
                            <span className="page-link"> {this.state.currentPage} </span>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.pages) ? "disabled" : ""} p-0`}>
                            <i className="page-link bi bi-caret-right-fill"
                                name="moveNext"
                                onClick={this.doPagination}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.pages) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-right"
                                name="moveLast"
                                onClick={this.doPagination}></i>
                        </li>
                    </ul>
                </nav>


            </>
        );
    }
    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({ currentPage: 1 });
        if (e.target.getAttribute("name") === "moveLast") this.setState({ currentPage: this.state.pages });
        if (e.target.getAttribute("name") === "movePrev") this.setState({ currentPage: this.state.currentPage - 1 });
        if (e.target.getAttribute("name") === "moveNext") this.setState({ currentPage: this.state.currentPage + 1 });
    }
}

export default MyBooks;
