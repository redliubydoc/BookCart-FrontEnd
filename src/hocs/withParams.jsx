import {
    useParams
} from 'react-router-dom';

function withParams(_Component) {
    return (props) => ( 
        <_Component {...props} params={useParams()}/>
    );
}
 
export default withParams;