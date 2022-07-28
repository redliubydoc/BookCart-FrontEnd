import { BACKEND_BASE_URL } from "../../services/BookCart";

import { 
    React,
    Component
} from "react";

import {
    Link
} from 'react-router-dom';
import withNavigate from "../../hocs/withNavigate";
import withParams from "../../hocs/withParams";

import BookService from "../../services/BookService";
import AdminService from "../../services/AdminService";
import AlertService from "../../services/AlertService";
import Alert from "../Misc/Alert";

class ReviewPage extends Component {
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
   
            alert: AlertService.getAlertInstance()
        }

        this.viewBook = this.viewBook.bind(this);
        this.doApprove = this.doApprove.bind(this);
    }

    render() {
        return(<>
            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }

            {/* product card placeholder */}
            <div className="container-fluid px-4">
                <div className="row justify-content-center">
                    <div className="text-start my-3 col-auto">
                        <div className="container-fluid shadow-lg p-3 mb-5 bg-body rounded">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="my-3 px-5 py-3 mb-0 pb-0 text">
                                                <div className="text-center">
                                                    <img className="shadow-sm p-3 mb-5 bg-light rounded"
                                                        alt="thumbnail"
                                                        src={this.state.book.thumbnail} 
                                                        width="200" 
                                                        height="300"/>
                                                    </div>
                                                <div>
                                                    <b>Title</b>: <i> {this.state.book.title} </i> <br/>
                                                    <b>Author</b>:
                                                        <i> 
                                                            <Link to="/author-page"> <i> {this.state.book.author} </i> 
                                                            </Link>
                                                        </i> 
                                                    <br/>
                                                    <b>ISBN</b>: <i> {this.state.book.isbn} </i> <br/>
                                                    <b>Genre</b>: <i> {this.state.book.genre} </i> <br/>
                                                    <b>Date of Release</b>: <i> {this.state.book.dateOfRelease.toString()} </i> <br/>
                                                    <b>Language</b>: <i> {this.state.book.language} </i> <br/>
                                                    <b>Rating</b>: 
                                                    <span className="text-start ms-2 text-warning">
                                                        {[...Array(5)].map((_, i) => {
                                                            if ((i+1) <= Math.floor(this.state.book.averageRating))
                                                                return <i key={i} className="bi bi-star-fill"></i>;

                                                            if ((i+1) <= Math.ceil(this.state.book.averageRating)) 
                                                                return <i key={i} className="bi bi-star-half"></i>;
                                                            else 
                                                                return <i key={i} className="bi bi-star"></i>;
                                                                
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        </tr>
                                    <tr>
                                        <td>
                                            <div className="text-center mx-3 mt-3">
                                                <button 
                                                    className="btn btn-primary mt-1 form-control"
                                                    onClick={this.viewBook}> <i className="bi bi-book me-2"></i> Read
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="text-center mx-3 mb-4">
                                                <button className="btn btn-success mt-1 form-control"
                                                    onClick={this.doApprove}> Approve
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>    
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

    doApprove() {
        let isbn = this.props.params.id;

        AdminService.approveBook(isbn)
            .then((response) => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, "Book Approved!");
                }
                else {
                    response.text().then(msg => AlertService.showAlert(this, 4, msg));
                }
            }).catch(e => console.log(e));
    }

    viewBook() {
        let url = `${BACKEND_BASE_URL}/epubs/book/${this.props.params.id}.epub`;
        
        this.props.navigate(`/101/book/${this.props.params.id}/read`, {
            state: {
                url: url
            }
        });
    }
}

export default 
    withNavigate(
    withParams(
        ReviewPage));