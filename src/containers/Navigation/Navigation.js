import React from 'react';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import classes from './Navigation.module.css';

/**
 * Parse the given config to create a JSX navigation.
 * 
 * TODOs:
 *  - needs error handling
 *  - put an empty message into the Dropdown, if empty
 */
function navigationParser (navArray, level=0) {
    if (navArray.length === 0) {
        return <Nav.Item className="px-3">no sites found</Nav.Item>
    }
    return navArray.map(el => {
        if (el.navigation) {
            return (
                <NavDropdown id={el.label} title={el.label} key={el.label}>
                    {navigationParser(el.navigation, 1)}
                </NavDropdown>
            );
        } else {
            if (level > 0) {
                return <NavDropdown.Item key={el.label} eventKey={el.link}>{el.label}</NavDropdown.Item>
            } else {
                return (
                    <Nav.Item key={el.label}>
                        <Nav.Link eventKey={el.link}>{el.label}</Nav.Link>
                    </Nav.Item>
                )
            }
        }
    })
}

const Navigation = props => {
    // build the navigation elements from config
    let elements = null;
    if (props.dummy || !props.config.navigation) {
        elements =  <Navbar.Text>Corrupted configuration.js found.</Navbar.Text>
    }  else {
        elements = navigationParser(props.config.navigation);
    }  

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href={props.config.homeUrl ? props.config.homeUrl : '/'}>
                <span className={classes.title}>{props.config.title ? props.config.title : 'Notebook Classroom'}</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="menu"></Navbar.Toggle>
            <Navbar.Collapse id="menu">
                <Nav className="mx-auto" onSelect={eventKey => props.navigator(eventKey)}>
                    {elements}
                </Nav>
            </Navbar.Collapse>
            <Nav.Item>
                <Nav.Link className="navbar-text" href="https://hydrocode.de" target="_blank">
                    <img src="logo.png" width="25" height="25" alt="logo" /> a hydrocode application
                </Nav.Link>
            </Nav.Item>
        </Navbar>
    );
}

export default Navigation;