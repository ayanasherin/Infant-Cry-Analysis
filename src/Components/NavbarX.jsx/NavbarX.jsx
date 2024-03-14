import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css';
import ModalX from '../Modal/Modal';
import DropDownX from '../DropDown/DropDown';

function NavbarX() {
    const user = localStorage.getItem('user');

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className='ctn'>
                <Navbar.Brand href="#home"><img src="logo.png" className='logo' /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/" className='link'>Home</Nav.Link>
                        <Nav.Link href="/upload" className='link'>Upload</Nav.Link>
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