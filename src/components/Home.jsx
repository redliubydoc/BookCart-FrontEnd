import "./Home.css";

import {
    React,
    Component
} from 'react';

import {
    Link 
} from 'react-router-dom';


import NavBarBeforeLogin from './Misc/NavBarBeforeLogin';
import SearchBar from "./SearchBar";
import Alert from "./Misc/Alert";
import AlertService from "../services/AlertService";
import BookFilter from "./BookFilter";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            alert: AlertService.getAlertInstance()
        }

        this.doAddToCart = this.doAddToCart.bind(this);
    }

    render() {
        return(<>
            <NavBarBeforeLogin/>

            {/* alert placeholder */}
            {this.state.alert.show && 
                <Alert level={this.state.alert.level} msg={this.state.alert.msg}/>
            }

            {/* -- Search box  */}
            <div className="row container-fluid my-3 justify-content-center text-center">
                <div className="col">
                    <SearchBar></SearchBar>
                </div>
            </div>
            <div className="row my-2">
                <div className="col-2">
                    <h1>Filter Component</h1>
                </div>
                <div className="col-10">
                    <div className="row row-cols-auto justify-content-center">
                        {
                            [...Array(40)].map((_, i) => {
                                return(
                                    <div className="col mb-4" key={i}>
                                        <div className="book-card">
                                            <div>
                                                <Link to="/product">
                                                    <img className="book-thumbnail" src={require(`../resource/book/thumbnail/book-${i%3+1}.jpg`)}/> 
                                                </Link>
                                                <button className="btn btn-outline-success mt-1 form-control"
                                                        onClick={this.doAddToCart}> 
                                                    <i className="bi bi-cart2 me-2"></i> Rs. {(400 % (i+1) + 1) * 100} 
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>);
    }

    doAddToCart() {
        AlertService.showAlert(this, 1, "Book added to cart", 10);
    }
}

export default Home;
