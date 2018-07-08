import React from 'react';
import './GenerateButton.css';

const GenerateButton = (props) => {
    return (
        <a onClick={props.clickIT} className="myButton waves-effect waves-light btn-large"><i className="material-icons left">cloud</i>Generate Quote</a>
    );
}

export default GenerateButton;