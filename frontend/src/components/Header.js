import React from "react";
import {Container, 
        Navbar, 
        Nav, 
        } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">Zagara</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            >
                            <Nav.Link href="/cart">Cart <i className="fas fa-shopping-cart"></i> </Nav.Link>
                            <Nav.Link href="/signin">Sign In <i className="fas fa-user"></i> </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header