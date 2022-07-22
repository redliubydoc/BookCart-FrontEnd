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
import withNavigate from '../../hocs/withNavigate';
import BookService from '../../services/BookService';
import SubscriptionService from '../../services/SubscriptionService';

class BuySubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: AlertService.getAlertInstance(),
            subsGenre: "",
            subsType: 1,
            subsPrice: -1000,
            genres: [],
            books: [],
            pages: 5,
            currentPage: 3
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doPagination = this.doPagination.bind(this);
        this.doAddToCart = this.doAddToCart.bind(this);
        this.doSubscribe = this.doSubscribe.bind(this);
        this.getBooks = this.getBooks.bind(this);
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
                                        className="w-100 btn btn-primary py-2"
                                        value={this.state.value}
                                        onChange={this.handleOnChange}>
                                            <option value={1}> Monthly </option>
                                            <option value={2}> Yearly </option>
                                    </select>
                                </td>
                                <td>
                                    <select name="subsGenre"
                                        className="w-100 btn btn-primary py-2"
                                        value={this.state.value}
                                        onChange={this.handleOnChange}>{
                                            this.state.genres.map((genre) => (
                                                <option key={genre} value={genre}>{genre}</option>
                                            ))
                                        }
                                    </select>
                                </td>
                                <td> <div className="form-control"> {this.state.subsPrice <= 0 ? 0 : this.state.subsPrice} </div> </td>
                                <td>
                                    <button className="btn btn-success form-control"
                                        onClick={this.doSubscribe} disabled={this.state.subsPrice <= 0}> Subscribe </button>
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
                                    <Link to={`/book/${book.isbn}`}>
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
            "Crime",
            "Contemporary",
            "Fantasy",
            "Fiction",
            "History",
            "Suspense"
        ];

        this.setState({genres: genres, subsGenre: genres[0]}, () => {
            SubscriptionService.getPrice(this.state.subsType, this.state.subsGenre.toLowerCase())
                .then(response => response.json())
                .then(data => this.setState({subsPrice: data}))
                .catch(e => console.log(e))   
            this.getBooks();
        });
    }

    getBooks() {
        BookService.getAllBooksByGenre(this.state.subsGenre.toLowerCase())
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch(e => console.log(e));
    }

    handleOnChange(e) {

        this.setState(
            {[e.target.name]: e.target.value}, 
            () => { 
                SubscriptionService.getPrice(this.state.subsType, this.state.subsGenre.toLowerCase())
                    .then(response => response.json())
                    .then(data => this.setState({subsPrice: data}))
                    .catch(e => console.log(e));
                
                this.getBooks();
            }
        );
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}, () => window.scrollTo({top: 0, behavior: 'smooth'})); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }

    doAddToCart() {
        AlertService.showAlert(this, 1, "Book added to cart", 10);
    }

    doSubscribe() {
        this.props.navigate("/payment-page")
    }
}

export default withNavigate(BuySubscription);