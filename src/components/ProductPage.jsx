import { 
    React,
    Component
} from "react";

import {
    Link
} from 'react-router-dom';
import withNavigate from "../hocs/withNavigate";
import withParams from "../hocs/withParams";

import AlertService from "../services/AlertService";
import AuthService from "../services/AuthService";
import { LOGIN_PAGE_URL } from "../services/BookCart";
import BookService from "../services/BookService";
import ReaderService from "../services/ReaderService";
import Alert from "./Misc/Alert";
import FeedbackList from "./Misc/FeedbackList";
import ReaderNavbar from "./Reader/ReaderNavbar";

class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {
                isbn: "",
                title: "",
                author: "",
                description: "",
                genre: "",
                language: "",
                price: "",
                dateOfRelease: "",
                averageRating: "",
                noOfRatings: "",
                thumbnail: ""
            },
            
            feedbacks: [],
            currentPage: 0,
            pages: 5,
            alert: AlertService.getAlertInstance()
        }

        this.loadFeedBacks = this.loadFeedBacks.bind(this);
        this.doAddToCart = this.doAddToCart.bind(this);
    }

    render() {
        return(<>
            {/* navbar placeholder */}
            <ReaderNavbar/>
            
            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }
            
            {/* product card placeholder */}
            <div className="container p-5 mt-5 shadow-lg p-3 mb-5 bg-body rounded">
                <table className="table table-borderless">
                    <tbody>
                        <tr>
                            <td>
                                <div className="my-3">
                                    <img className="shadow-sm p-3 mb-5 bg-light rounded"
                                        src={this.state.book.thumbnail} 
                                        width="200" 
                                        height="300"
                                        alt="book thumbnail"
                                    /> <br/>
                                    <div className="mt-4">
                                        <b>Title</b>: <i> {this.state.book.title} </i> <br/>
                                        <b>Author</b>: <i> {this.state.book.author} </i> <br/>
                                        <b>ISBN</b>: <i> {this.state.book.isbn} </i> <br/>
                                        <b>Genre</b>: <i> {this.state.book.genre} </i> <br/>
                                        <b>Date of Release</b>: <i> {this.state.book.dateOfRelease} </i> <br/>
                                        <b>Language</b>: <i> {this.state.book.language} </i> <br/>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="text-start mt-3 ms-5">
                                    <h4 className="text-uppercase"> {this.state.book.title} </h4> 
                                    by <Link to="/author-page"> <i> {this.state.book.author} </i> </Link>
                                </div>
                                <div className="text-start text-warning ms-5">
                                    {this.state.book.noOfRatings} ratings |
                                    {[...Array(5)].map((_, i) => {
                                        if ((i+1) <= Math.floor(this.state.book.averageRating))
                                            return <i key={i} className="bi bi-star-fill"></i>;

                                        if ((i+1) <= Math.ceil(this.state.book.averageRating)) 
                                            return <i key={i} className="bi bi-star-half"></i>;
                                        else 
                                            return <i key={i} className="bi bi-star"></i>;
                                            
                                    })}
                                </div>
                                <div className="text-start ms-5">
                                    <h3 className="text-success"> ₹ {this.state.book.price} </h3>
                                </div>
                                <div className="mt-5 ms-5">
                                    <p> {this.state.book.description} </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <div className="text-center">
                                    <button className="btn-lg btn-success mt-1"
                                        onClick={this.doAddToCart}> <i className="bi bi-cart2 me-2"></i> Add To Cart
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* feedbacks placeholder */}
            {
                !!this.state.feedbacks.length &&
                <div className="container p-3">
                    <h4 className="mb-5 text-center text-warning"> Feedbacks </h4>
                    <FeedbackList feedbacks={this.state.feedbacks}/>
                </div>
            }
        </>);
    }

    componentDidMount() {
        BookService.getBook(this.props.params.id)
            .then(response => response.json())
            .then(book => this.setState({
                    book: book
                }, this.loadFeedBacks)
            ).catch(e => console.log(e));
    }

    loadFeedBacks() {
        BookService.getAllFeedbacks(this.props.params.id)
            .then(response => response.json())
            .then(feedbacks => this.setState({feedbacks: feedbacks}))
            .catch(e => console.log(e));
    }

    doAddToCart() {
        if (!AuthService.isLoggedIn()) {
            this.props.navigate(LOGIN_PAGE_URL);
        }
        else {
            ReaderService.addBookToCart(AuthService.getLoggedInUser(), this.props.params.id)
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
}

export default 
    withNavigate(
    withParams(
        ProductPage)) ;