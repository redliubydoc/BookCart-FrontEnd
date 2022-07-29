import {
    React,
    Component
} from 'react';

import withNavigate from '../../hocs/withNavigate';
import Alert from '../Misc/Alert';
import AlertService from '../../services/AlertService';
import ReaderNavbar from './ReaderNavbar';
import ReaderService from '../../services/ReaderService';
import withParams from '../../hocs/withParams';
import withAuthFilter from '../../hocs/withAuthFilter';

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
        this.getFeedback = this.getFeedback.bind(this);
    }

    render() {
        return (<>
            {/* navbar placeholder */}
            <ReaderNavbar/>
            {/* alert placeholder */}
            {this.state.alert.show &&
                <Alert level={this.state.alert.level} msg={this.state.alert.msg} />
            }
            
            <div className="container text-center">
                <h4 className="text-muted my-4"> Your Feedback </h4>
                <div className="container p-5 shadow-lg p-3 mb-5 bg-white rounded">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <textarea
                                        name="comment"
                                        className="form-control"
                                        rows="7"
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
                                                        className="hidden-button-radio"
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
                                    <button className={"btn btn-secondary mt-1 form-control"}
                                        onClick={() => this.props.navigate(`/${this.props.params.uid}/book/${this.props.params.id}`)}> Back </button>
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

    componentDidMount() {
        this.getFeedback();
    }

    handleOnChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    doSubmit() {
        this.setState({
            comment: this.state.comment.trim()
        }, () => {
            if (this.validateForm()) {
                ReaderService.submitFeedback(this.props.params.uid, this.props.params.id, {
                    comment: this.state.comment, 
                    rating: this.state.rating
                }).then((response) => {
                    if (response.status === 200) {
                        this.getFeedback(true);
                    }
                    else {
                        response.text().then(msg => AlertService.showAlert(this, 4, msg));
                    }
                }).catch(e => console.log(e));
            }
        });
    }

    getFeedback(flag) {

        if (flag) {
            AlertService.showAlert(this, 1, "Feedback submitted", 10);
        }

        ReaderService.getFeedback(this.props.params.uid, this.props.params.id)
            .then((response) => {
                if (response.status === 200) {
                    response.json().then(feedback => this.setState({
                        comment: feedback.comment, 
                        rating: feedback.rating
                    }));
                }
            }).catch(e => console.log(e));
    }

    validateForm(flag) {
        let valid = true;

        // empty filed validation
        if ((!this.state.comment || this.state.comment.length === 0)) {
            AlertService.showAlert(this, 3, "Write a review");
            valid = false;
        }
        return valid;
    }
}

export default 
    withAuthFilter(
    withNavigate(
    withParams(
        FeedbackFrom)));