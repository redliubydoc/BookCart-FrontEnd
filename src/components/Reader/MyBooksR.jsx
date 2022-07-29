import React from 'react';
import {Link} from 'react-router-dom'
import withAuthFilter from '../../hocs/withAuthFilter';
import withParams from '../../hocs/withParams';
import ReaderService from '../../services/ReaderService';
import ReaderNavbar from './ReaderNavbar';

class MyBooksR extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            books: [],
            pages: 3,
            currentPage: 1
        }

        this.getBooks = this.getBooks.bind(this);
    }

    render() {
        return (
            <>
            <ReaderNavbar/>

            <div className="container-fluid py-4 px-5">
                {/* -- Search box */}
                <div className="col p-0 pe-3">
                    <h1 className="text-muted text-center py-4">
                        My Books
                    </h1>
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
}

export default 
    withAuthFilter(
    withParams(
        MyBooksR));