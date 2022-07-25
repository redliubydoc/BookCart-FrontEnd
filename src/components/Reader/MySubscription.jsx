import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';
import withParams from '../../hocs/withParams';
import BookService from '../../services/BookService';
import ReaderService from '../../services/ReaderService';
import ReaderNavbar from '../Misc/ReaderNavbar';

class MySubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscriptions : [],

            selectedSubscription: {
                id: -1,
                genre: "",
                daysLeft: 0
            },

            books: [],
            pages: 1,
            currentPage: 3
        }

        this.doPagination = this.doPagination.bind(this);
        this.selectSubscription = this.selectSubscription.bind(this);
        this.getSubscriptions = this.getSubscriptions.bind(this);
        this.getBooks = this.getBooks.bind(this);
    }
  
    render() {
        return(<>
            {/* navbar placeholder */}
            <ReaderNavbar/>
            
            {!this.state.subscriptions.length && 
                <div className="container text-muted text-center py-5">
                    <h1> No active subscription found! </h1> 
                </div>
            }

            {!!this.state.subscriptions.length && <div className="container-fluid py-3 my-3">
                {/* subscription details placeholder */}
                <div className="row row-cols-auto justify-content-center text-center">
                {this.state.subscriptions.map((subscription) => {
                    return (
                        <div className="col"
                            key={subscription.id}>
                            <button id={subscription.id}
                                className="btn btn-primary position-relative mx-1 my-2"
                                onClick={this.selectSubscription}>
                                {subscription.genre} <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> 
                                    {subscription.daysLeft} days
                                </span>
                            </button>
                        </div>
                    );
                })}
                </div>

                {/* -- Search box */}
                <div className="container mt-4">
                    <center>
                        <div className="input-group shadow p-3 mb-4 bg-white rounded">
                            <select className="btn btn-primary">
                                <option value="ISBN"> ISBN </option>
                                <option value="TITLE"> Title </option>
                                <option value="AUTHOR"> Author </option>
                            </select>

                            <input type="text" 
                                className="form-control" 
                                placeholder="ISBN / Title / Author"
                                aria-label="Search"/>

                            <button className="btn btn-primary">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </center>
                </div>

                <div className="container text-center">
                    <h5 className="text-muted my-4"> Books : {this.state.selectedSubscription.genre} </h5>
                </div>

                {/* -- genre wise books display space */}
                <div className="row row-cols-auto justify-content-center">
                    {this.state.books.map((book) => (
                        <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                            <div className="book-card shadow p-3 bg-white rounded">
                                <div>
                                    <Link to={`/101/book/${book.isbn}`}>
                                        <img className="book-thumbnail" 
                                            alt="thumbnail"
                                            src={book.thumbnail}/> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> }
            
            {/* -- pagination control placeholder */}
            {!!this.state.subscriptions.length &&
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
            }
        </>);
    }

    componentDidMount() {
        this.getSubscriptions();
    }

    selectSubscription(e) {
        for (let subscription of this.state.subscriptions) {
            if (subscription.id == e.target.id) {
                this.setState({selectedSubscription: subscription}, () => this.getBooks(subscription.genre));
                break;
            }
        }
    }

    getSubscriptions() {
        ReaderService.getSubscriptions(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(subscriptions => this.setState(
                        {subscriptions: subscriptions}
                    ));
                }
                else {
                    console.log("some error occurred");
                }
            }).catch(e => console.log(e));
    }

    getBooks() {
        BookService.getAllBooksByGenre(this.state.selectedSubscription.genre.toLowerCase())
            .then(response => response.json())
            .then(data => this.setState({books: data}))
            .catch(e => console.log(e));
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}, () => window.scrollTo({top: 0, behavior: 'smooth'})); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }
}

export default 
    withParams(
        MySubscription);