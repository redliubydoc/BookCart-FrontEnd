import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import Alert from "./Misc/Alert";
import AlertService from "../services/AlertService";
import BookService from '../services/BookService';
import ReaderNavbar from './Reader/ReaderNavbar';
import ReaderService from '../services/ReaderService';
import withParams from '../hocs/withParams';
import AuthService from '../services/AuthService';
import withNavigate from '../hocs/withNavigate';
import { LANGUAGES, LOGIN_PAGE_URL } from '../services/BookCart';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterBar: false,
            alert: AlertService.getAlertInstance(),
            languages: [],
            selectedLanguage: "All",
            searchType: "ALL",
            keyword: "",
            books: [],
            currentPage: 1,
            recordsPerPage: 5,

            showPagination: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.doAddToCart = this.doAddToCart.bind(this);
        this.toggleFilterBar = this.toggleFilterBar.bind(this);
        this.sortBooks = this.sortBooks.bind(this);
        this.filterBooks = this.filterBooks.bind(this);
        this.searchBook = this.searchBook.bind(this);
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
                                <select className="btn bg-primary" name='searchType' 
                                    value={this.state.searchType} 
                                    onChange={this.handleChange}>

                                    <option value="ALL"> ALL </option>
                                    <option value="ISBN"> ISBN </option>
                                    <option value="TITLE"> Title </option>
                                    <option value="AUTHOR"> Author </option>
                                    <option value="GENRE"> Genre </option>
                                </select>

                                <input type="text" name='keyword'
                                    value={this.state.keyword} 
                                    onChange={this.handleChange}
                                    className="form-control" 
                                    placeholder="ISBN / Title / Author / Genre"
                                    aria-label="Search"/>

                                <button className="btn btn-primary" onClick={e => {this.searchBook()}}>
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
                                    <input 
                                        type="radio" name="sort-by-radio-button" value="RELEASEDATE" 
                                        onClick={this.sortBooks} 
                                        style={{width: "20px", height: "20px"}}/> &nbsp;  Release date 
                                 </div>
                                 <div className="my-2">
                                    <input type="radio" name="sort-by-radio-button" value="PRICELH" 
                                        onClick={this.sortBooks} style={{width: "20px",
                                        height: "20px"}}/> &nbsp;  Price: Low To High 
                                 </div>
                                 <div className="my-2"> 
                                    <input type="radio" name="sort-by-radio-button" value="PRICEHL" 
                                        onClick={this.sortBooks} style={{width: "20px", height: "20px"}}/> &nbsp;  Price: High To Low
                                 </div>
                                <div className="my-2">
                                    <center> <hr/> Filter by <hr/> </center>
                                </div>
                                <div className="my-2 mb-4">
                                    <b> Language </b>
                                    
                                    <select name="selectedLanguage" 
                                            value={this.state.selectedLanguage} 
                                            onChange={this.handleChange} 
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
                                        <input  
                                            name="price-range-radio-button"
                                            id="price-range-1"
                                            type="radio" 
                                            value="500" 
                                            onClick={(e) => {this.filterBooks(e)}}
                                            style={{width: "20px", height: "20px"}}/> &nbsp; Under ₹500
                                    </div>
                                    <div className="my-2">
                                        <input 
                                            name="price-range-radio-button"
                                            id="price-range-2"
                                            type="radio" 
                                            value="1000" 
                                            onClick={(e) => {this.filterBooks(e)}}
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹501 to ₹1000
                                    </div>
                                    <div className="my-2">
                                        <input
                                            name="price-range-radio-button"
                                            id="price-range-3" 
                                            type="radio" 
                                            value="5000" 
                                            onClick={(e) => {this.filterBooks(e)}}
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹1001 to ₹5000
                                    </div>
                                    <div className="my-2">
                                        <input
                                            name="price-range-radio-button"
                                            id="price-range-4" 
                                            type="radio" 
                                            value="2147483647" 
                                            onClick={(e) => {this.filterBooks(e)}}
                                            style={{width: "20px", height: "20px"}}/> &nbsp; ₹5000{" & "}Above
                                    </div>
                                    <div className="my-2">
                                        <input  
                                            name="price-range-radio-button"
                                            id="price-range-0"
                                            type="radio" 
                                            value="500" 
                                            onClick={(e) => {this.filterBooks(e)}}
                                            style={{width: "20px", height: "20px"}}/> &nbsp; Show Me All
                                    </div>
                                </div>
                                <div className="mt-5"> 
                                    <hr />
                                    <button className="btn btn-primary form-control" onClick={this.resetAllFilters}> Reset All </button>
                                    <hr />
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
                                                    onClick={() => this.doAddToCart(book.isbn)}> 
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
            {!!this.state.showPagination && 
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-left"
                                name="moveFirst"
                                onClick={this.showFirstPage}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === 1) ? "disabled" : ""}`}>
                            <i className="page-link bi bi-caret-left-fill"
                                name="movePrev"
                                onClick={this.showPrevPage}></i>
                        </li>
                        <li className="page-item active">
                            <span className="page-link"> {this.state.currentPage} </span>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.totalPages) ? "disabled" : ""} p-0`}>
                            <i className="page-link bi bi-caret-right-fill"
                                name="moveNext"
                                onClick={this.showNextPage}></i>
                        </li>
                        <li className={`page-item ${(this.state.currentPage === this.state.totalPages) ? "disabled" : ""}`}>
                            <i className="page-link bi-chevron-bar-right"
                                name="moveLast"
                                onClick={this.showLastPage}></i>
                        </li>
                    </ul>
                </nav>
            }
        </>);
    }

    componentDidMount() {

        let languages = LANGUAGES;
       
        this.setState({languages: languages});

        this.getBooksByPagination(this.state.currentPage);
    }

    getBooksByPagination(currentPage) {
        currentPage = currentPage - 1;

        BookService.getBookCatalogs(currentPage, this.state.recordsPerPage)
            .then(response => response.json())
            .then(data => this.setState({
                books: data.content, 
                totalPages:data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number + 1}))
            .catch(e => console.log(e));
    }

    // Cart Redirection Logic
    doAddToCart(isbn) {
        if (!AuthService.isLoggedIn()) {
            this.props.navigate(LOGIN_PAGE_URL);
        }
        else {
            ReaderService.addBookToCart(AuthService.getLoggedInUser(), isbn)
                .then((response => {
                    if (response.status === 200) {
                        AlertService.showAlert(this, 1, "Book added to cart", 10);
                    }
                    else {
                        response.text().then(msg => AlertService.showAlert(this, 4, msg, 10));
                    }
                }));  
        }        
    }

    toggleFilterBar() {
        if (this.state.filterBar === false) this.setState({filterBar: true});
        else this.setState({filterBar: false});
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.price !== this.state.price || prevState.languagesChecked !== this.state.languagesChecked)
            this.filterBooks(this.state.currentPage);
        else if(prevState.sortByPrice !== this.state.sortByPrice)
            this.sortBooks();
    }

    sortBooks(e) {
        let key; 
        if (e.target.name === "sort-by-radio-button") key = e.target.value;
        console.log("sortBooks() :: " + key);

        BookService.getBookCatalogsOnSort(key, 0, -1)
        .then(response => response.json())
        .then((data) => this.setState({
                books: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number+1
            }));

        this.setState({showPagination: false}); // disabling pagination
    }

    filterBooks(e) {
        console.log("current page : " + this.state.currentPage)
     
        let prices = [null, null];
        if (e.target.getAttribute("id") === "price-range-0") prices = [0, 2147483647];
        if (e.target.getAttribute("id") === "price-range-1") prices = [0, 500];
        else if (e.target.getAttribute("id") === "price-range-2") prices = [501, 1000];
        else if (e.target.getAttribute("id") === "price-range-3") prices = [1001, 5000];
        else if (e.target.getAttribute("id") === "price-range-4") prices = [5001, 2147483647];

        let languages = LANGUAGES;
        if (this.state.selectedLanguage !== "All") languages = [this.state.selectedLanguage];
        
        console.log("filterBooks() :: prices : " + prices, "languages : " + languages);

        BookService.getBookCatalogsOnFilter(null, languages, prices, 0, -1)
            .then(response => response.json())
            .then((data) => this.setState({
                books: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number + 1
            }));

        this.setState({showPagination: false}); // disabling pagination
    }

    searchBook() {
        if (this.state.keyword === "") {
            AlertService.showAlert(this, 4, "Search field cannot be empty", 5);
            return;
        }

        console.log("searchBook() :: ", this.state.searchType, this.state.keyword);

        BookService.getBookCatalogsOnSearch(this.state.keyword, this.state.searchType, 0, -1)
            .then(response => response.json())
            .then((data) => this.setState({
                books: data.content,
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.number + 1
            }));

        this.setState({showPagination: false}); // disabling pagination
    }

    handleChange(e) {
        if (e.target.name === "selectedLanguage") {
            this.setState({
                [e.target.name]: e.target.value,
                currentPage: 1
            }, () => {
                this.filterBooks(e, this.state.currentPage);
            });
        }
        else {
            this.setState({[e.target.name]: e.target.value,
                currentPage: 1
            });
        }   
    };

    showNextPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordsPerPage)){
            this.getBooksByPagination(this.state.currentPage + 1);
        }
    };

    showLastPage = () =>{
        if(this.state.currentPage < Math.ceil(this.state.totalElements/this.state.recordsPerPage)){
            this.getBooksByPagination(Math.ceil(this.state.totalElements/this.state.recordsPerPage));
        }
    };

    showFirstPage = ()=>{
        let firstPage = 1;
        if(this.state.currentPage > firstPage){
            this.getBooksByPagination(firstPage);
        }
    };
   
    showPrevPage = () =>{
        let prevPage = 1
        if(this.state.currentPage > prevPage){
            this.getBooksByPagination(this.state.currentPage - prevPage);
        }
    };

    resetAllFilters = () => {
        this.setState({
            selectedLanguage: "All",
            searchType: "ALL",
            keyword: "",
            books: [],
            currentPage: 1,
            recordsPerPage: 5,
            showPagination: true

        }, () => {        
            BookService.getBookCatalogs(
                this.state.currentPage, 
                this.state.recordsPerPage
            ).then(response => response.json())
                .then(data => this.setState({
                    books: data.content, 
                    totalPages:data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1}))
                .catch(e => console.log(e));
            });
    }
    
}

export default 
    withNavigate(
        withParams(
        Home));