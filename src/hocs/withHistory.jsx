import {
    useHistory
} from 'react-router-dom';

function withHistory(_Component) {
    return (props) => ( 
        <_Component {...props} history={useHistory()}/> 
    );
}

export default withHistory;