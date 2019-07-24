import React from 'react';
import classes from './ButtonOverlay.module.css';

import {Button, ButtonGroup} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import binderLogo from './binder_logo.png';

const ButtonOverlay = props => {
    let buttonCount = 0;
    let btnCls = [classes.ButtonGroup];
    
    if(props.github) {
        buttonCount += 1;
    }
    if (props.binder) {
        buttonCount += 1;
    }
    // check if one or two buttons were set
    if (buttonCount === 0) {
        return null;
    } else if  (buttonCount === 1){
        btnCls.push(classes.OneButton);
    } else if (buttonCount === 2) {
        btnCls.push(classes.TwoButtons);
    }

    // return
    return (
        <div className={classes.ButtonOverlay}>
            <ButtonGroup className={btnCls} aria-label="button-overlay">
                { props.github ? 
                <Button className={classes.Button} variant="default" href={props.github}>
                    <FontAwesomeIcon icon={faGithub} size="3x" />
                </Button> : null
                }
                {props.binder ? 
                <Button className={[classes.Button, classes.Binder].join(' ')} variant="default" href={props.binder}>
                    <img src={binderLogo} alt="binder" width="57px" />
                </Button> : null
                }
                <Button variant="default" className={classes.Chevron} disabled>
                    <FontAwesomeIcon icon={faChevronRight} color="silver" size="3x" />
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default ButtonOverlay;
