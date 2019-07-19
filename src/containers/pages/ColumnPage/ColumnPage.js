import React from 'react';
import classes from './ColumnPage.module.css';

const ColumnPage = props => (
    <div className={classes.ColumnPage}>
        {props.children}
    </div>
);

export default ColumnPage;