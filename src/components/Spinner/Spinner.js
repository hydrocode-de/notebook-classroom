import React from 'react';
import classes from './Spinner.module.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';

const Spinner = props => (
    <div className={classes.Spinner}>
        <FontAwesomeIcon 
            icon={faSpinner} 
            spin 
            size={props.size ? props.size : "5x"} 
            color={props.color ? props.color : "silver"}
        />
        {props.message ? <p style={{color: props.color ? props.color : "silver"}}>{props.message}</p> : null}
    </div>
);

export default Spinner;