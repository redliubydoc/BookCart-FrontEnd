import React, { Component } from "react";
import { BACKEND_BASE_URL } from "../../services/BookCart";
import AuthorService from "../../services/AuthorService";
import AuthorNavbar from "./AuthorNavbar";
import withParams from "../../hocs/withParams";
import AlertService from "../../services/AlertService";
import withAuthFilter from "../../hocs/withAuthFilter";
import Alert from "../Misc/Alert";
import withNavigate from "../../hocs/withNavigate";

class MyBooks extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: [],

            alert: AlertService.getAlertInstance()
        }

        this.getBooks = this.getBooks.bind(this);
        this.getApprovalBadgeClass = this.getApprovalBadgeClass.bind(this);
        this.getApprovalBadgeText = this.getApprovalBadgeText.bind(this);
        this.viewBook = this.viewBook.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    render() {
        return (
            <>
                <AuthorNavbar/>

                {/* alert placeholder */}
                {this.state.alert.show && 
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
                }

                <div className="container-fluid my-5">
                    <div className="container">
                        <table className="table text-center">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Status</th>
                                    <th>Copies Sold</th>
                                    <th>Revenue</th>
                                    <th>Preview</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.books.map((book) => (
                                    <tr key={book.isbn}>
                                        <td> {book.isbn} </td>
                                        <td> 
                                            <div className={this.getApprovalBadgeClass(book.status)}> 
                                                {this.getApprovalBadgeText(book.status)}</div>
                                        </td>

                                        <td> <div > {book.copiesSold} </div> </td>
                                        <td> <div > ₹ {book.revenue}  </div> </td>
                                        <td> 
                                            <button className="btn" 
                                                onClick={() => this.viewBook(book.isbn)}>
                                                <i className="bi bi-eye-fill text-info"></i></button> 
                                        </td>
                                        <td> 
                                            <button className="btn" 
                                                disabled={book.status}
                                                onClick={() => this.deleteBook(book.isbn)}>
                                                <i className="bi bi-trash3-fill text-danger"></i>
                                            </button> 
                                        </td>
                                    </tr>
                                ))
                            }</tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        AuthorService.getBooks(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(books => 
                                this.setState({books: books}, 
                                () => console.log(this.state.books))
                        );
                }   
            }).catch(e => console.log(e));
    }
    
    getApprovalBadgeClass(status) {
        if (status === true) return "badge bg-success";
        else return "badge bg-danger";
    }

    getApprovalBadgeText(status) {
        if (status === true) return "Approved";
        else return "Pending";
    }

    deleteBook(isbn) {
        AuthorService.deleteBook(this.props.params.uid, isbn)
            .then((response) => {
                if (response.status === 200) {
                    AlertService.showAlert(this, 1, `Book ${isbn} deleted`, 5);
                    this.getBooks();
                }
                else {
                    response.text().then(msg => AlertService.showAlert(this, 4, msg));
                }
            }).catch(e => console.log(e));
    }

    viewBook(isbn) {
        let url = `${BACKEND_BASE_URL}/epubs/book/${isbn}.epub`;
        
        this.props.navigate(`/${this.props.params.uid}/book/${isbn}/read`, {
            state: {
                url: url
            }
        });
    }
}

export default 
    withAuthFilter(
    withNavigate(
    withParams(MyBooks)));
