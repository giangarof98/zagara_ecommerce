import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import {Container, 
        Navbar, 
        Nav, 
        } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Zagara</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            >
                            <LinkContainer to="/cart">
                                <Nav.Link>Cart <i className="fas fa-shopping-cart"></i> </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/signin">
                                <Nav.Link>Sign In <i className="fas fa-user"></i> </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header