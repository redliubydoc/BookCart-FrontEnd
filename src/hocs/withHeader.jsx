import Header from '../components/Header';

function withHeader(_Component) {
    return (props) => ( 
        <>
            <Header/>
            <_Component {...props}/> 
        </>
    );
}

export default withHeader;