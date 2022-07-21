import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReaderNavbar from "../Misc/ReaderNavbar";

export default class Cart extends Component {
    render() {
        return (
            <>
                <ReaderNavbar/>
                
                <br/><br/>
                <div className="d-flex container justify-content-center">
                <h3 style={{color: "green"}} >Shopping Cart <span style={{color:"black"}}> &nbsp; &gt; &nbsp; </span></h3>
                <h3 style={{color: "grey"}}>Review Order & Checkout <span style={{color:"black"}}> &nbsp; &gt; &nbsp; </span></h3>
                <h3 style={{color: "grey"}}>Start Reading</h3>
                </div>

                <br/>
                <div className="container">

                   
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ISBN</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">Price</th>
                                <th scope="col">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Fifty shades of orange</td>
                                <td>Daniel Michel</td>
                                <td>Rs 450</td>
                                <td><button type="button" className="btn btn-danger"><i className="bi bi-cart-x"></i></button></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>React book</td>
                                <td>Amit ahuja</td>
                                <td>Rs 500</td>
                                <td><button type="button" className="btn btn-danger"><i className="bi bi-cart-x"></i></button></td>
                            </tr>
                            <tr className="table-success">
                                <td className="font-weight-bold" colspan="3">Total Price</td>
                                <td className="font-weight-bold" colspan="2">Rs 14449</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="text-center">
                        <Link to="/payment-page" className="btn btn-outline-success">Review Order & checkout</Link><br /><br />
                        <Link to="/shop" className="btn btn-outline-danger btn-sm text-center">Continue Shopping</Link>
                    </div>
                </div>
            </>
        );
    }
}