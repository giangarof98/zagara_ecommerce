import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import {Container, 
        Navbar, 
        Nav,
        NavDropdown, 
        } from 'react-bootstrap'
import { logout } from "../actions/userAction";

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const logoutHandler = () => {
        dispatch(logout())
    }
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
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                                </NavDropdown>
                            ):
                            <LinkContainer to="/login">
                                <Nav.Link>Sign In <i className="fas fa-user"></i> </Nav.Link>
                            </LinkContainer>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header