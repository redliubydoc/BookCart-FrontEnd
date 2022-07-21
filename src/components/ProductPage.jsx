import { 
    React,
    Component
} from "react";

import {
    Link
} from 'react-router-dom';

import AlertService from "../services/AlertService";
import Alert from "./Misc/Alert";
import FeedbackList from "./Misc/FeedbackList";
import NavBarBeforeLogin from "./Misc/NavBarBeforeLogin";

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
        this.doPagination = this.doPagination.bind(this);
        this.doAddToCart = this.doAddToCart.bind(this);
    }

    render() {
        return(<>
            {/* navbar placeholder */}
            <NavBarBeforeLogin/>
            
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
                                            return <i className="bi bi-star-fill"></i>;

                                        if ((i+1) <= Math.ceil(this.state.book.averageRating)) 
                                            return <i className="bi bi-star-half"></i>;
                                        else 
                                            return <i className="bi bi-star"></i>;
                                            
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
            <div className="container p-3">
                <h4 className="mb-5 text-center text-warning"> Feedbacks </h4>
                <FeedbackList feedbacks={this.state.feedbacks}/>
            </div>
            
            {/* pagination placeholder */}
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
        this.setState({
            book: {
                isbn: "9780593439111",
                title: "Eltern Haus",
                author: "Jennifer Mentges",
                description: "The house has been empty for years. The charm of the abandoned wafted about it. And something else, darker... Night after night, bar pianist Tobias Hansen is drawn to an old villa that has been vacant for years in a posh Hamburg suburb on the Elbe. He parks and stays in the car, staring at the dark house for a few minutes. Until the day Yvette Winkler moves in with her family. Yvette wants to realize her dream of the perfect home with the old villa. And dare a new start - also for your marriage that got into trouble. Tobias Hansen quickly becomes friends with the Winklers, gives the children piano lessons and soon goes in and out of their house as a matter of course. For a long time no one suspects who they really let into their own four walls. Until the evening when he is alone in the house with Yvette and the children... Psychological tension that gets under your skin and won't let go ",
                genre: "Suspense",
                language: "German",
                price: 500,
                dateOfRelease: "1st September 1999",
                averageRating: 2.5,
                noOfRatings: 420,
                thumbnail: require("../resource/book/thumbnail/book-1.jpg")
            }
        }, this.loadFeedBacks);
    }

    loadFeedBacks() {
        let pages = 5;
        let feedbacks = [
            {
                id: "1",
                readerName: "Maggie Marsh",
                rating: 5,
                comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it. ",
                date: new Date()
            },
            {
                id: "2",
                readerName: "Lara Stewart",
                rating: 3,
                comment: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites.",
                date: new Date()
            },
            {
                id: "3",
                readerName: "Alexa Bennett",
                rating: 2,
                comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure. ",
                date: new Date()
            },
            {
                id: "4",
                readerName: "Betty Walker",
                rating: 1,
                comment: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
                date: new Date()
            },
        ]

        this.setState({
            pages: pages, 
            feedbacks: feedbacks
        });
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1}, () => {window.scrollTo({top: 800, behavior: 'smooth'})});
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}, () => {window.scrollTo({top: 800, behavior: 'smooth'})}); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1}, () => {window.scrollTo({top: 800, behavior: 'smooth'})});
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1}, () => {window.scrollTo({top: 800, behavior: 'smooth'})});
    }

    doAddToCart() {
        // TODO: backend communication
        AlertService.showAlert(this, 1, "Book added to cart", 10);
    }
}

export default ProductPage;