import React, { Component }  from 'react';

import {
    useNavigate
} from 'react-router-dom';

function withNavigate(_Component) {
    return (props) => ( 
        <_Component {...props} navigate={useNavigate()}/> 
    );
}

export default withNavigate;