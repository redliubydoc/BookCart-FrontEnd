import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import NavBarBeforeLogin from '../Misc/NavBarBeforeLogin';
import Alert from "../Misc/Alert";
import AlertService from "../../services/AlertService";

class BuySubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: AlertService.getAlertInstance(),
            subsGenre: "",
            subsType: "",
            genres: [],
            books: [],
            pages: 1,
            currentPage: 3
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doPagination = this.doPagination.bind(this);
    }
  
    render() {
        return(<>
            {/* navbar placeholder */}
            <NavBarBeforeLogin/>

            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }
            
            <div className="container-fluid py-3">
                {/* -- books display space */}

                <div className="container mt-3 justify-content-center text-center">
                    <table className="table table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Genre</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="subsType"
                                        className="w-100 btn btn-primary"
                                        value={this.state.value}
                                        onChange={this.handleOnChange}>
                                            <option value={"MONTHLY"}> Monthly </option>
                                            <option value={"YEARLY"}> Yearly </option>
                                    </select>
                                </td>
                                <td>
                                        <select name="subsGenre"
                                            className="w-100 btn btn-primary"
                                            value={this.state.value}
                                            onChange={this.handleOnChange}>{
                                                this.state.genres.map((genre) => (
                                                    <option key={genre} value={genre}>{genre}</option>
                                                ))
                                            }
                                        </select>
                                </td>
                                <td> <div className="form-control"> Rs. 499 </div> </td>
                                <td>
                                    <button className="btn btn-success form-control"> Subscribe </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="container text-center">
                    <hr/> <h5 className="text-muted"> Books : {this.state.subsGenre} </h5> <hr/>
                </div>
                <div className="row row-cols-auto justify-content-center">
                    {this.state.books.map((book) => (
                        <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                            <div className="book-card shadow p-3 bg-white rounded">
                                <div>
                                    <Link to="/product">
                                        <img className="book-thumbnail" 
                                            src={book.thumbnail}/> 
                                    </Link>
                                    <button className="btn btn-outline-success mt-3 form-control"
                                            onClick={this.doAddToCart}> 
                                        <i className="bi bi-cart2 me-2"></i> ₹{book.price} 
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
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
        let genres = [
            "Contemporary",
            "Crime",
            "Fantasy",
            "Fiction",
            "History",
            "Suspense"
        ];

        let books = [
            {
                isbn: "9780062013347",
                price: 330.61,
                thumbnail: require("../../resource/book/thumbnail/book-1.jpg"),
            },
            {
                isbn: "9780241988251",
                price: 528.66,
                thumbnail: require("../../resource/book/thumbnail/book-2.jpg"),
            },
            {
                isbn: "9780593439111",
                price: 700.66,
                thumbnail: require("../../resource/book/thumbnail/book-3.jpg")
            },
            {
                isbn: "9780598839111",
                price: 69,
                thumbnail: "https://media2.ebook.de/shop/coverscans/418/41857641_9783644011427_xl.jpg"
            },
            {
                isbn: "9769593439111",
                price: 788.89,
                thumbnail: "https://media2.ebook.de/shop/coverscans/418/41804247_9783462320848_xl.jpg"
            }
        ]

        this.setState({
            books: books,
            genres: genres,
            pages: 5
        });
    }

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1});
    }
}

export default BuySubscription;