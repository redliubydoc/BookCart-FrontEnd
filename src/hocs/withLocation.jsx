import React, { Component }  from 'react';

import {
    useLocation
} from 'react-router-dom';

function withLocation(_Component) {
    return (props) => ( 
        <_Component {...props} location={useLocation()}/> 
    );
}

export default withLocation;