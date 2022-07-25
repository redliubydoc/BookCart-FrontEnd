import {
    React,
    Component
} from "react";

import moment from "moment";

class FeedbackList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>
            <div className="card text-dark">{
                this.props.feedbacks.map((feedback) => {
                    return (
                        <div className="card-body shadow-lg p-3 mb-2 bg-body rounded" key={feedback.id}>
                            <div className="d-flex flex-start">
                            <h1> <i className="bi bi-person-circle" 
                                style={{fontSize: "6opx"}}></i> </h1>

                                <div className="container-fluid">
                                    <h6 className="fw-bold mb-1"> {feedback.readerName} </h6>
                                    <span className="text-warning">{
                                        [...Array(5)].map((_, i) => {
                                            if ((i+1) <= feedback.rating) {
                                                return <i key={i} className="bi bi-star-fill"></i>
                                            }
                                            else {
                                                return <i key={i} className="bi bi-star" ></i>
                                            }
                                        })
                                    }</span>
                                    <small className="text-muted"> &nbsp;
                                        <i> {moment(feedback.date).format('MMMM D, YYYY')} </i> 
                                    </small>
                                    <p className="mb-0"> {feedback.comment} </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>);
    }
}

export default FeedbackList;