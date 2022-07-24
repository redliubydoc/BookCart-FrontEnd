import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import NavBarBeforeLogin from './Misc/NavBarBeforeLogin';
import Alert from "./Misc/Alert";
import AlertService from "../services/AlertService";
import BookService from '../services/BookService';
import ReaderNavbar from './Misc/ReaderNavbar';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterBar: false,
            alert: AlertService.getAlertInstance(),
            languages: [],
            books: [],
            pages: 1,
            currentPage: 3
        }

        this.doAddToCart = this.doAddToCart.bind(this);
        this.toggleFilterBar = this.toggleFilterBar.bind(this);
        this.doPagination = this.doPagination.bind(this);
    }
  
    render() {
        return(<>
            {/* navbar placeholder */}
            <ReaderNavbar/>

            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }
            
            <div className="container-fluid py-3">
                <div className="row">
                    {/* -- toggle filter bar button*/}
                    <div className="col-lg-1 col-sm-2 p-0 px-3">
                        <div className="text-center shadow p-3 mb-4 bg-white rounded">
                            <button className="btn btn-warning form-control"
                                onClick={this.toggleFilterBar}> <i className="bi bi-funnel-fill"></i> 
                            </button>
                        </div>
                    </div>

                    {/* -- Search box */}
                    <div className="col p-0 pe-3">
                        <center>
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
                        </center>
                    </div>
                </div>
                <div className="row">
                    {/* -- filter bar */}
                    {this.state.filterBar && 
                        <div className="col-lg-3 col-sm-5 p-0 ps-3">
                            <div className="shadow p-4 mb-4 bg-white rounded">
                                <div className="my-2">
                                    <center> <hr/> Sort by <hr/> </center>
                                </div>
                                <div className="my-2">
                                    <input type="checkbox" style={{width: "20px",
                                    height: "20px"}}/> &nbsp; <b> Rating </b>
                                </div>
                                <div className="my-2">
                                    <input type="checkbox" style={{width: "20px",
                                    height: "20px"}}/> &nbsp; <b> Release date </b>
                                </div>
                                <div className="my-2">
                                    <input type="checkbox" style={{width: "20px",
                                    height: "20px"}}/> &nbsp; <b> Price </b>
                                </div>
                                <div className="my-2">
                                    <center> <hr/> Filter by <hr/> </center>
                                </div>
                                <div className="my-2 mb-4">
                                    <b> Language </b>
                                    
                                    <select name="" id=""
                                        className="w-100 btn btn-info mt-3">{
                                            this.state.languages.map((language) => (
                                                <option key={language} value={language}>{language}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <b> Price </b>
                                    <div className="mt-3">
                                        <input type="radio" 
                                            style={{width: "20px", height: "20px"}}/> &nbsp; Under ₹500
                                    </div>
                                    <div className="my-2">
                                        <input type="radio" 
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹501 to ₹1000
                                    </div>
                                    <div className="my-2">
                                        <input type="radio" 
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹1001 to ₹5000
                                    </div>
                                    <div className="my-2">
                                        <input type="radio" 
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹5000 & Above
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {/* -- books display space */}
                    <div className="col p-0 px-3">
                        <div className="row row-cols-auto justify-content-center">
                        {
                            this.state.books.map((book) => (
                                <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                                    <div className="book-card shadow p-3 bg-white rounded">
                                        <div>
                                            <Link to={`/book/${book.isbn}`}>
                                                <img className="book-thumbnail" 
                                                    alt="thumbnail"
                                                    src={book.thumbnail}/> 
                                            </Link>
                                            <button className="btn btn-outline-success mt-3 form-control"
                                                    onClick={this.doAddToCart}> 
                                                <i className="bi bi-cart2 me-2"></i> ₹{book.price} 
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
            </div>

            {/* -- pagination control placeholder */}
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
        </>);
    }

    componentDidMount() {
        let languages = [
            "All",
            "Hindi",
            "English",
            "French",
            "Bengali"
        ];

        BookService.getAllBooks()
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch(e => console.log(e));
       
        this.setState({
            languages: languages,
            pages: 5
        });
    }

    doAddToCart() {
        AlertService.showAlert(this, 1, "Book added to cart", 10);
    }

    toggleFilterBar() {
        if (this.state.filterBar === false) this.setState({filterBar: true});
        else this.setState({filterBar: false});
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1});
    }
}

export default Home;
