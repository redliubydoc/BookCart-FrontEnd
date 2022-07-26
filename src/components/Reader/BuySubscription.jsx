import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import Alert from "../Misc/Alert";
import AlertService from "../../services/AlertService";
import withNavigate from '../../hocs/withNavigate';
import BookService from '../../services/BookService';
import ReaderService from '../../services/ReaderService';
import ReaderNavbar from '../Misc/ReaderNavbar';
import withParams from '../../hocs/withParams';
import { type } from '@testing-library/user-event/dist/type';

class BuySubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: AlertService.getAlertInstance(),

            
            type: 1,
            genre: "",
            price: 0,

            genres: [],
            books: [],

            selectedSubscription: {
                type: "monthly",
                genre: "",
                price: 0
            },
            
            pages: 5,
            currentPage: 3
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doPagination = this.doPagination.bind(this);
        this.doAddToCart = this.doAddToCart.bind(this);
        this.doSubscribe = this.doSubscribe.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.getSubscriptionPrice = this.getSubscriptionPrice.bind(this);
        this.getAllGenres = this.getAllGenres.bind(this);
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
                                    <select name="type"
                                        className="w-100 btn btn-primary py-2"
                                        value={this.state.type}
                                        onChange={this.handleOnChange}>
                                            <option value={1}> Monthly </option>
                                            <option value={2}> Yearly </option>
                                    </select>
                                </td>
                                <td>
                                    <select name="genre"
                                        className="w-100 btn btn-primary py-2"
                                        value={this.state.genre}
                                        onChange={this.handleOnChange}>{
                                            this.state.genres.map((genre) => (
                                                <option key={genre} value={genre}>
                                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td> <div className="form-control"> ₹ {this.state.price} </div> </td>
                                <td>
                                    <button className="btn btn-success form-control"
                                        onClick={this.doSubscribe}> Subscribe </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="container text-center">
                    <hr/> <h5 className="text-muted"> Books : {this.state.genre} </h5> <hr/>
                </div>
                <div className="row row-cols-auto justify-content-center">
                    {this.state.books.map((book) => (
                        <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                            <div className="book-card shadow p-3 bg-white rounded">
                                <div>
                                    <Link to={`/book/${book.isbn}`}>
                                        <img className="book-thumbnail" 
                                            src={book.thumbnail}/> 
                                    </Link>
                                    <button className="btn btn-outline-success mt-3 form-control"
                                            onClick={() => this.doAddToCart(book.isbn)}> 
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
        this.getAllGenres();
    }

    getAllGenres() {
        BookService.getAllGenres().
            then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        this.setState({genres: data.genres, genre: data.genres[0]}, () => { 
                            this.getBooks(); 
                            this.getSubscriptionPrice() 
                        });
                    });
                }
            }).catch(e => console.log(e));
    }

    getSubscriptionPrice() {
        BookService.getSubscriptionPrice(this.state.type, this.state.genre.toLowerCase())
            .then((response) => {
                if (response.status === 200) {
                    response.text().then(price => this.setState({price: price}));
                }
            }).catch(e => console.log(e));
    }

    getBooks() {
        BookService.getAllBooksByGenre(this.state.genre)
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch(e => console.log(e));
    }

    handleOnChange(e) {
        console.log(this.state.type, this.state.genre);
        this.setState({[e.target.name]: e.target.value}, () => { 
                this.getBooks(); 
                this.getSubscriptionPrice()
            }
        );
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}, () => window.scrollTo({top: 0, behavior: 'smooth'})); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }

    doAddToCart(isbn) {
        //TODO: remove hardcoded user
        ReaderService.addBookToCart(101, isbn)
            .then((response => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, "Book added to cart", 10);
                }
                else {
                    response.text().then(msg => AlertService.showAlert(this, 4, msg, 10));
                }
            }));  
    }

    doSubscribe() {
        ReaderService.isSubscriptionAlreadyTaken(101, this.state.type, this.state.genre.toLowerCase())
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((flag) => {
                        if (!flag) {
                            this.props.navigate(`/${this.props.params.uid}/payment`, {
                                state : {
                                    flag: 2,
                                    price: this.state.price,
                                    productDetails: `Subscription :: ${this.state.genre}`,
                                    type: this.state.type,
                                    genre: this.state.genre
                                }
                            });
                        }
                        else {
                            AlertService.showAlert(this, 4, "You have already subscribed", 10);
                        }
                    });
                }
            }).catch(e => console.log(e));
            
        
    }
}

export default 
    withNavigate(
    withParams(
        BuySubscription));