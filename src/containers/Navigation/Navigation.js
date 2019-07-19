import React from 'react';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

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
    if (props.dummy || !props.config) {
        elements =  <Navbar.Text>Corrupted configuration.js found.</Navbar.Text>
    }  else {
        elements = navigationParser(props.config);
    }  

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">{props.brand ? props.brand : 'Notebook Classroom'}</Navbar.Brand>
            <Navbar.Toggle aria-controls="menu"></Navbar.Toggle>
            <Navbar.Collapse id="menu">
                <Nav className="mx-auto" onSelect={eventKey => props.navigator(eventKey)}>
                    {elements}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;