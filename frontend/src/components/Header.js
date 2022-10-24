import React from "react";
//import { Route } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import {Container, 
        Navbar, 
        Nav,
        NavDropdown, 
        } from 'react-bootstrap'
import { logout } from "../actions/userAction";
import SearchBox from './SearchBox'

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
                        <SearchBox />
                        {/* <Route render={(navigate) => <SearchBox navigate={navigate}/>} /> */}
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
                            {
                                userInfo && userInfo.isAdmin && (
                                    <NavDropdown title='Admin' id='adminmenu'>
                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Producst</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>
                                        
                                    </NavDropdown>
                                )  
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header