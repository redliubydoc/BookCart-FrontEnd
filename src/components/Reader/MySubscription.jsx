import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import NavBarBeforeLogin from '../Misc/NavBarBeforeLogin';

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

            booksByGenre: [],
            pages: 1,
            currentPage: 3
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doPagination = this.doPagination.bind(this);
        this.selectSubscription = this.selectSubscription.bind(this);
        this.getBooksByGenre = this.getBooksByGenre.bind(this);
    }
  
    render() {
        return(<>
            {/* navbar placeholder */}
            <NavBarBeforeLogin/>
            
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
                    {this.state.booksByGenre.map((book) => (
                        <div className="col px-2 pb-4 pt-0" key={book.isbn}>
                            <div className="book-card shadow p-3 bg-white rounded">
                                <div>
                                    <Link to="/book-page">
                                        <img className="book-thumbnail" 
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
        // TODO: fetch from backend
        let subscriptions = [
            {
                id: 1,
                genre: "Contemporary",
                daysLeft: 20
            },
            {
                id: 2,
                genre: "Suspense",
                daysLeft: 316
            },
            {
                id: 3,
                genre: "History",
                daysLeft: 30
            },
            {
                id: 4,
                genre: "Fiction",
                daysLeft: 1
            },
            {
                id: 5,
                genre: "Fantasy",
                daysLeft: 69
            },
            {
                id: 6,
                genre: "Crime",
                daysLeft: 420
            },
        ];

        // by default first subscription will be selected
        if (subscriptions.length) {
            this.setState({
                subscriptions: subscriptions,
                selectedSubscription: subscriptions[0]
            }, () => this.getBooksByGenre(this.state.selectedSubscription.genre));
        }
    }

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    selectSubscription(e) {
        for (let subscription of this.state.subscriptions) {
            if (subscription.id == e.target.id) {
                this.setState(
                    {selectedSubscription: subscription}, 
                    () => this.getBooksByGenre(subscription.genre)
                );
                break;
            }
        }
    }

    getBooksByGenre(genre) {
        // TODO: fetch total pages from backend
        let pages= 5;

        // TODO: fetch from backend
        let booksByGenre =[
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
        ];
        
        this.setState({
            booksByGenre: booksByGenre,
            pages: pages,
            currentPage: 0
        });
    }

    doPagination(e) {
        if (e.target.getAttribute("name") === "moveFirst") this.setState({currentPage: 1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveLast") this.setState({currentPage: this.state.pages}, () => window.scrollTo({top: 0, behavior: 'smooth'})); 
        if (e.target.getAttribute("name") === "movePrev") this.setState({currentPage: this.state.currentPage-1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
        if (e.target.getAttribute("name") === "moveNext") this.setState({currentPage: this.state.currentPage+1}, () => window.scrollTo({top: 0, behavior: 'smooth'}));
    }
}

export default MySubscription;