import React, { Component } from "react";
import { Link } from "react-router-dom";
import withNavigate from "../../hocs/withNavigate";
import withParams from "../../hocs/withParams";
import AlertService from "../../services/AlertService";
import ReaderNavbar from "../Misc/ReaderNavbar";
import Alert from "../Misc/Alert";
import ReaderService from "../../services/ReaderService";

class Cart extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cart: [],
            totalPrice : 0,

            alert: AlertService.getAlertInstance()
        }

        this.loadCart = this.loadCart.bind(this);
    }
    render() {
        return (<>
            {/* navbar placeholder */}
            <ReaderNavbar />

            {/* alert placeholder */}
            {this.state.alert.show &&
                <Alert level={this.state.alert.level} msg={this.state.alert.msg} />
            }
                            
            <br/><br/>
            <div className="container text-center">
                <h3 className="row row-cols-auto justify-content-center">
                    <div className="col">
                        <span style={{color: "green"}} >Shopping Cart <span style={{color:"black"}}> &nbsp; &gt; &nbsp; </span></span>
                    </div>
                    <div className="col">
                        <span style={{color: "grey"}}>Review Order {"&"} Checkout <span style={{color:"black"}}> &nbsp; &gt; &nbsp; </span></span>
                    </div>
                    <div className="col">
                        <span style={{color: "grey"}}>Start Reading</span>
                    </div>
                </h3>
            </div>

            <br/>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Book</th>
                            <th>ISBN</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.cart.map(book => (
                            <tr key={book.isbn}>
                                <td>
                                    <div className="book-card-2 shadow p-1 bg-white rounded">
                                        <div>
                                            <Link to={`/book/${book.isbn}`}>
                                                <img className="book-thumbnail-2" 
                                                    alt="thumbnail"
                                                    src={book.thumbnail}/> 
                                            </Link>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="y-1">{book.isbn}</div>
                                </td>
                                <td>
                                    <div className="y-1">{book.price}</div>
                                </td>
                                <td>
                                    <div className="y-1">
                                        <button className="btn btn-outline-danger p-1 px-2"> <i className="bi bi-trash3" style={{fontSize: "20px"}}></i> </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }</tbody>
                </table>
                
                <table className="table table-striped">
                    <tbody>
                        <tr className="table-success">
                            <td className="font-weight-bold" colSpan="3">Total Price</td>
                            <td className="font-weight-bold" colSpan="2">₹ {this.state.price}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-center p-5">
                    <Link to="/payment-page" className="btn btn-outline-success">Review Order {"&"} checkout</Link><br /><br />
                    <Link to="/shop" className="btn btn-outline-danger btn-sm text-center">Continue Shopping</Link>
                </div>
            </div>
        </>);
    }

    componentDidMount() {
        this.loadCart();
    }

    loadCart() {
        ReaderService.loadCart(this.props.params.uid)
            .then((response) => {
                if (response.status === 200) {
                    response.json(data => this.setState({
                        cart: data.cart, 
                        totalPrice: data.totalPrice
                    }));
                }
                else {
                    AlertService.showAlert(this, 4, "Could not load cart some error has occurred");

                    // Dummy data
                    let cart = [
                        {
                            "isbn": "9780316420013",
                            "price": 500.0,
                            "thumbnail": "http://localhost:8080/images/thumbnail/9780316420013.jpeg"
                        },
                        {
                            "isbn": "9780316453691",
                            "price": 100.0,
                            "thumbnail": "http://localhost:8080/images/thumbnail/9780316453691.jpeg"
                        }
                    ];
            
                    this.setState({cart: cart, totalPrice: 0});
                }
            }).catch((e) => {
                console.log(e)
                AlertService.showAlert(this, 4, "Could not load cart some error has occurred");
            });
    }
}

export default 
    withParams(
    withNavigate(Cart));