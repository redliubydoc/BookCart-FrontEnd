import React, { Component } from "react";
import { BACKEND_BASE_URL } from "../../services/BookCart";
import AuthorService from "../../services/AuthorService";
import AuthorNavbar from "../Author/AuthorNavbar";
import withParams from "../../hocs/withParams";
import AlertService from "../../services/AlertService";
import withAuthFilter from "../../hocs/withAuthFilter";
import Alert from "../Misc/Alert";
import withNavigate from "../../hocs/withNavigate";
import AdminService from "../../services/AdminService";
import AdminNavbar from "../Misc/AdminNavbar";

class ReviewBooks extends Component {

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
                <AdminNavbar/>

                {/* alert placeholder */}
                {this.state.alert.show && 
                    <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
                }

                <div className="container-fluid my-5">
                    <div className="container">
                        <table className="table text-center table-striped table-success">
                            <thead>
                                <tr>
                                    <th>ISBN</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.books.map((book) => (
                                    <tr key={book.isbn}>
                                        <td> {book.isbn} </td>
                                        <td> {book.title} </td>
                                        <td> {book.author} </td>
                                        <td> {book.price} </td>
                                        <td> 
                                            <button className="btn-small btn-info" 
                                                onClick={() => this.viewBook(book.isbn)}> Review </button> 
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
        AdminService.getBooksToBeReviewed()
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then(books => this.setState({books: books}));
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
        let url = `/admin/dashboard/review/book/${isbn}`;
        this.props.navigate(url);
    }
}

export default 
    withNavigate(
    withParams(ReviewBooks));
