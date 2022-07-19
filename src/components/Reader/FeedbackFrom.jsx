import './FeedbackFrom.css';

import {
    React,
    Component
} from 'react';

import withNavigate from '../../hocs/withNavigate';
import NavBarBeforeLogin from '../Misc/NavBarBeforeLogin';
import Alert from '../Misc/Alert';
import { Link } from 'react-router-dom';
import AlertService from '../../services/AlertService';

class FeedbackFrom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: "",
            rating: 0,
            hover: 0,

            alert: AlertService.getAlertInstance()
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.doSubmit = this.doSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    render() {
        return (<>
            {/* navbar placeholder */}
            <NavBarBeforeLogin />
            {/* alert placeholder */}
            {this.state.alert.show &&
                <Alert level={this.state.alert.level} msg={this.state.alert.msg} />
            }
            
            <div className="container text-center">
                <h1 className="text-muted my-4"> Write Feedback </h1>
                <div className="container p-4 pb-2 border rounded-3 bg-light bg-gradient shadow-lg p-3 mb-5 bg-body rounded">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <textarea
                                        name="comment"
                                        className="form-control"
                                        rows="10"
                                        placeholder="Write a review . . ."
                                        value={this.state.comment}
                                        onChange={this.handleOnChange}></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <div className="text-end">
                                        <h1 className="text-warning">{
                                            [1, 2, 3, 4, 5].map((ratingValue) => {
                                                return (
                                                    <label key={ratingValue}>
                                                        <input type="radio"
                                                            name="rating"
                                                            value={ratingValue}
                                                            onChange={this.handleOnChange} />

                                                        <i className={ratingValue <= (this.state.hover || this.state.rating) ? "star bi bi-star-fill p-1" : "star bi bi-star p-1"}
                                                            onMouseEnter={() => this.setState({ hover: ratingValue })}
                                                            onMouseLeave={() => this.setState({ hover: 0 })}
                                                        ></i>
                                                    </label>
                                                );
                                            })
                                        }</h1>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="w-50">
                                    <Link className={"btn btn-secondary mt-1 form-control"}
                                        to="/"> Cancel </Link>
                                </td>
                                <td className="w-50">
                                    <button className="btn btn-primary mt-1 form-control"
                                        onClick={this.doSubmit}> Submit </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>);
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    }

    doSubmit() {
        this.setState({
            comment: this.state.comment.trim()
        }, () => {
            if (this.validateForm()) {
                console.log("\n=========================\n", this.state.rating, this.state.comment, "\n=========================\n");
                console.log("feedback form submitted");
            }
        });
    }

    validateForm() {
        let valid = true;

        // empty filed validation
        if ((!this.state.comment || this.state.comment.length === 0)) {
            AlertService.showAlert(this, 3, "Write a review");
            valid = false;
        }
        return valid;
    }
}

export default withNavigate(FeedbackFrom);