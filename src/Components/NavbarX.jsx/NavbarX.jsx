import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './navbar.css';
import ModalX from '../Modal/Modal';
import DropDownX from '../DropDown/DropDown';

function NavbarX() {
    const user = localStorage.getItem('user');

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className='ctn'>
                <Navbar.Brand as={Link} to="/"><img src="logo.png" className='logo' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/" className='link'>Home</Nav.Link>
                        <Nav.Link as={Link} to="/upload" className='link'>Upload</Nav.Link>
                        <NavDropdown  className='link' title="Services"  id="basic-nav-dropdown">
                            <NavDropdown.Item  className='link' as={Link} to="/healthcare-m">Maternal Care</NavDropdown.Item>
                            <NavDropdown.Item  className='link' as={Link} to="/exercise">Exercises</NavDropdown.Item>
                            <NavDropdown.Item  className='link' as={Link} to="/mentalhealth">Mental Health</NavDropdown.Item>
                            <NavDropdown.Item  className='link' as={Link} to="/tips">Tips</NavDropdown.Item>
                            <NavDropdown.Item  className='link' as={Link} to="/nutrition">Nutrition</NavDropdown.Item>



                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {user ? <DropDownX /> :
                            <Nav.Link href="#link" className='login-link'><ModalX source="Login" item="login" /></Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarX;
