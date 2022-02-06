import React from "react";
import { Navbar, Nav, Link, Container,Button,FormControl,Form,NavDropdown,Offcanvas} from 'react-bootstrap';
import ContentContainer from "./ContentContainer";


function Navbarhome() {

    let sy={
        color:'black',
        marginTop:'10px'
    }
    let navstyle={
        backgroundColor:'white',
        color:'black',
        borderBottom:'2px solid black '
    }
    return (

        <>
            <Navbar style={navstyle} expand={false} >
                <Container fluid>
                    <Navbar.Brand href="#"><h1 style={sy}>Notebook App</h1></Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Related Fields</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/login"><h2>Login</h2></Nav.Link>
                                <Nav.Link href="/"><h2> Log out </h2></Nav.Link>
                                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>

    )
}


export default Navbarhome;