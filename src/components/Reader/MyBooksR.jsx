import React from 'react';
import {Link} from 'react-router-dom'
import withParams from '../../hocs/withParams';
import ReaderService from '../../services/ReaderService';
import ReaderNavbar from '../Misc/ReaderNavbar';

class MyBooksR extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            pages: 3,
            currentPage: 1
        }

        this.getBooks = this.getBooks.bind(this);
        this.doPagination = this.doPagination.bind(this);
    }

    render() {
        return (
            <>
            <ReaderNavbar/>

            <div className="container-fluid py-4 px-5">
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

                {/* -- books display space */}
                <div className="row row-cols-auto justify-content-center">
                {
                    this.state.books.map((book) => (
                        <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                            <div className="book-card shadow p-3 bg-white rounded">
                                <div>
                                    <Link to={`/${this.props.params.uid}/book/${book.isbn}`}>
                                        <img className="book-thumbnail" 
                                            alt="thumbnail"
                                            src={book.thumbnail}/> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
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
        this.getBooks();
    }

    getBooks() {
        ReaderService.getBooks(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(books => this.setState({books: books}));
                }
            })
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1});
    }
}

export default 
    withParams(
        MyBooksR);