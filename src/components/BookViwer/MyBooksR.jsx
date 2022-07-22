import React from 'react';
import {Link} from 'react-router-dom'
import ReaderNavbar from '../Misc/ReaderNavbar';
export default class MyBooksR extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            list: [],
            pages: 1,
            currentPage: 1
        }

        this.doPagination = this.doPagination.bind(this);
    }

    componentDidMount() {
        let arr = [
            require("../../resource/book/thumbnail/book-1.jpg"),
            require("../../resource/book/thumbnail/book-2.jpg"), 
            require("../../resource/book/thumbnail/book-3.jpg")];
        this.setState({list: arr, pages: 5});
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1});
    }

    render() {
        return (
            <>
            <ReaderNavbar/>
            <div className="container">
                <center>
                    <div className="container-fluid justify-content-center mt-5">
                        <h1 className="text-muted"> My Books </h1>

                        {/* Search Bar */}
                        <div className="row container-fluid mb-3 mt-5 justify-content-center text-center">
                            <div className="col5">
                                <div className="input-group shadow p-3 mb-4 bg-white rounded">
                                    <select className="btn btn-primary">
                                        <option value="ISBN"> ISBN </option>
                                        <option value="TITLE"> Title </option>
                                        <option value="AUTHOR"> Author </option>
                                        <option value="SUBJECT"> Genre </option>
                                    </select>
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="ISBN / Title / Author / Genre"
                                    aria-label="Search"/>
                                    <button className="btn btn-primary">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* My Books */}
                        <div className="row container-fluid my-3 justify-content-center text-center">
                            <div className="col5">
                                <div className="input-group shadow p-3 bg-white rounded">
                                    <div class="container-fluid my-3">
                                        <div className="row m-4">
                                        {
                                            this.state.list.map((book) => {
                                                return (
                                                    <div className="col me-2 mb-3" style={{border: "1px grey solid", borderRadius: "8px", padding: "2px"}}>
                                                        <div>
                                                            <img className='img responsive mt-2' src={book} style={{width: "240px", height: "280px"}} />
                                                        </div>
                                                        
                                                            <div className='row m-2'>
                                                                <Link className='btn btn-primary'
                                                                to='/101/book/9780593439111'>View</Link>
                                                            </div>  
                                                    </div> 
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
            </div>

            {/* Pagination */}
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
}