import {
    React,
    Component
} from 'react';

import withNavigate from "../../hocs/withNavigate";
import withLocation from "../../hocs/withLocation";
import AlertService from "../../services/AlertService";
import ReaderService from '../../services/ReaderService';
import withParams from '../../hocs/withParams';

class DummyPaymentGateway extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag: 1,
            totalPrice: 0,
            productDetails: "",
            alert: AlertService.getAlertInstance(),
            genre: "",
            type: ""
        }

        this.doBuy = this.doBuy.bind(this);
    }

    render() {
        return (<>
            <style>
                <>
                    @import
                    url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&amp;display=swap');
                    * {"{"}
                    margin: 0; padding: 0; box-sizing: border-box; font-family: 'Poppins',
                    sans-serif
                    {"}"}
                    .container {"{"}
                    margin: 30px auto;
                    {"}"}
                    .container .card {"{"}
                    width: 100%; box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; background: #fff;
                    border-radius: 0px;
                    {"}"}
                    body {"{"}
                    background: #eee
                    {"}"}
                    .btn.btn-primary {"{"}
                    background-color: #ddd; color: black; box-shadow: none; border: none;
                    font-size: 20px; width: 100%; height: 100%;
                    {"}"}
                    .btn.btn-primary:focus {"{"}
                    box-shadow: none;
                    {"}"}
                    .container .card .img-box {"{"}
                    width: 80px; height: 50px;
                    {"}"}
                    .container .card img {"{"}
                    width: 100%; object-fit: fill;
                    {"}"}
                    .container .card .number {"{"}
                    font-size: 24px;
                    {"}"}
                    .container .card-body .btn.btn-primary .fab.fa-cc-paypal {"{"}
                    font-size: 32px; color: #3333f7;
                    {"}"}
                    .fab.fa-cc-amex {"{"}
                    color: #1c6acf; font-size: 32px;
                    {"}"}
                    .fab.fa-cc-mastercard {"{"}
                    font-size: 32px; color: red;
                    {"}"}
                    .fab.fa-cc-discover {"{"}
                    font-size: 32px; color: orange;
                    {"}"}
                    .c-green {"{"}
                    color: green;
                    {"}"}
                    .box {"{"}
                    height: 40px; width: 50px; display: flex; align-items: center;
                    justify-content: center; background-color: #ddd;
                    {"}"}
                    .btn.btn-primary.payment {"{"}
                    background-color: #1c6acf; color: white; border-radius: 0px; height: 50px;
                    display: flex; align-items: center; justify-content: center; margin-top: 24px;
                    {"}"}
                    .form__div {"{"}
                    height: 50px; position: relative; margin-bottom: 24px;
                    {"}"}
                    .form-control {"{"}
                    width: 100%; height: 45px; font-size: 14px; border: 1px solid #DADCE0;
                    border-radius: 0; outline: none; padding: 2px; background: none; z-index: 1;
                    box-shadow: none;
                    {"}"}
                    .form__label {"{"}
                    position: absolute; left: 16px; top: 10px; background-color: #fff; color:
                    #80868B; font-size: 16px; transition: .3s; text-transform: uppercase;
                    {"}"}
                    .form-control:focus+.form__label {"{"}
                    top: -8px; left: 12px; color: #1A73E8; font-size: 12px; font-weight: 500;
                    z-index: 10;
                    {"}"}
                    .form-control:not(:placeholder-shown).form-control:not(:focus)+.form__label{" "}
                    {"{"}
                    top: -8px; left: 12px; font-size: 12px; font-weight: 500; z-index: 10;
                    {"}"}
                    .form-control:focus {"{"}
                    border: 1.5px solid #1A73E8; box-shadow: none;
                    {"}"}
                </>
            </style>

            <div className="container DummyPaymentGateway">
                <div className="row">
                    <div className="col-lg-4 mb-lg-0 mb-3">
                        <div className="card p-3">
                            <div className="img-box">
                                <img
                                    src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png"
                                    alt=""
                                />
                            </div>
                            <div className="number">
                                <label className="fw-bold" htmlFor="">
                                    **** **** **** 1060
                                </label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <small>
                                    <span className="fw-bold">Expiry date:</span>
                                    <span>10/16</span>
                                </small>
                                <small>
                                    <span className="fw-bold">Name:</span>
                                    <span> John Doe </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                        <div className="card p-3">
                            <div className="img-box">
                                <img
                                    src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png"
                                    alt=""
                                />
                            </div>
                            <div className="number">
                                <label className="fw-bold">**** **** **** 1060</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <small>
                                    <span className="fw-bold">Expiry date:</span>
                                    <span>10/16</span>
                                </small>
                                <small>
                                    <span className="fw-bold">Name:</span>
                                    <span> John Doe </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-lg-0 mb-3">
                        <div className="card p-3">
                            <div className="img-box">
                                <img
                                    src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png"
                                    alt=""
                                />
                            </div>
                            <div className="number">
                                <label className="fw-bold">**** **** **** 1060</label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <small>
                                    <span className="fw-bold">Expiry date:</span>
                                    <span>10/16</span>
                                </small>
                                <small>
                                    <span className="fw-bold">Name:</span>
                                    <span> John Doe </span>
                                </small>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="card p-3">
                            <p className="mb-0 fw-bold h4">Payment Methods</p>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card p-3">
                            <div className="card-body border p-0">
                                <p>
                                    <a
                                        className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
                                        data-bs-toggle="collapse"
                                        href="#collapseExample"
                                        role="button"
                                        aria-expanded="true"
                                        aria-controls="collapseExample"
                                    >
                                        <span className="fw-bold">PayPal</span>
                                        <span className="fab fa-cc-paypal"></span>
                                    </a>
                                </p>
                                <div className="collapse p-3 pt-0" id="collapseExample">
                                    <div className="row">
                                        <div className="col-8">
                                            <p className="h4 mb-0">Summary</p>
                                            <p className="mb-0">
                                                <span className="fw-bold">Product: </span>
                                                <span className="c-green"> {this.state.productDetails}</span>
                                            </p>
                                            <p className="mb-0">
                                                <span className="fw-bold">Price:</span>
                                                <span className="c-green">  ₹  {this.state.price}</span>
                                            </p>
                                            <p className="mb-0">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                                Atque nihil neque quisquam aut repellendus, dicta vero? Animi
                                                dicta cupiditate, facilis provident quibusdam ab quis, iste
                                                harum ipsum hic, nemo qui!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="btn btn-primary payment" onClick={this.doBuy}>Make Payment</div>
                    </div>
                </div>
            </div>
        </>);
    }

    componentDidMount() {
        if (!!this.props.location.state && 
                !!this.props.location.state.price &&
                !!this.props.location.state.productDetails &&
                !!this.props.location.state.flag) {

            this.setState({
                flag: this.props.location.state.flag,
                price: this.props.location.state.price,
                productDetails: this.props.location.state.productDetails
            }, () => {
                if (this.state.flag === 2) {
                    this.setState({
                        genre: this.props.location.state.genre,
                        type: this.props.location.state.type
                    })
                }
            });
        }
        console.log(this.props.location.state);
    }

    doBuy() {
        if (this.state.flag === 1) { // buy book
            ReaderService.checkOutAndBuy(this.props.params.uid)
                .then((response) => {
                    if (response.status === 200) {
                        window.alert("Payment Successful");
                        this.props.navigate(`/${this.props.params.uid}/book`);
                    }
                    else {
                        window.alert("Payment Unsuccessful");
                        this.props.navigate(`/${this.props.params.uid}/book`);
                    }
                }).catch((e) => {
                    console.log(e);
                    window.alert("Payment Unsuccessful");
                    this.props.navigate(`/${this.props.params.uid}/book`);
                });
        } 
        else if (this.state.flag === 2){ // buy subscription
            ReaderService.buySubscription(this.props.params.uid, this.state.type, this.state.genre)
                .then((response) => {
                    if (response.status === 200) {
                        window.alert("Payment Successful");
                        this.props.navigate(`/${this.props.params.uid}/subscription/active/`);
                    }
                    else {
                        window.alert("Payment Unsuccessful");
                        this.props.navigate(`/${this.props.params.uid}/subscription/active/`);
                    }
                }).catch((e) => {
                    console.log(e);
                    window.alert("Payment Unsuccessful");
                    this.props.navigate(`/${this.props.params.uid}/subscription/active/`);
                });
        }
    }
}

export default 
    withNavigate(
    withLocation(
        withParams(
        DummyPaymentGateway)));