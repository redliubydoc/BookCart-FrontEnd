import { 
    React,
    Component 
} from "react";

class Alert extends Component {
    constructor(props) {
        super(props);

        this.getClass = this.getClass.bind(this);
    }

    render() {
        return (
            <>
                <div className={this.getClass()} role="alert">
                    <span className="text-center"> {this.props.msg} </span> 
                </div>
            </>
        );
    }

    getClass(level = this.props.level) {
        if (level == 1) return "text-center alert alert-success";
        if (level == 2) return "text-center alert alert-info";
        if (level == 3) return "text-center alert alert-warning";
        if (level == 4) return "text-center alert alert-danger";
    }
}

export default Alert;