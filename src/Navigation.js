import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import {AmplifySignOut } from '@aws-amplify/ui-react';

// import {  Link } from 'react-router-dom';


// function Navigation () {
//     return(
//         <div>
           
//             <Navbar collapseOnSelect fixed='top' expand='sm' bg = 'dark' variant='dark'>
//                 <Container>
//                     <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
//                     <Navbar.Collapse id='responsive-navbar-nav'>
//                         <Nav>
//                         <Nav.Link as={Link} to="/nft" >Home</Nav.Link>
//                         <Nav.Link as={Link} to="/about-us" >About Us</Nav.Link>
                       
//                         <NavDropdown  title="NFT" id="collasible-nav-dropdown">
//                             <NavDropdown.Item as={Link} to="/owned">Owned</NavDropdown.Item>
//                             <NavDropdown.Item  as={Link} to="/wishlist">Wishlist</NavDropdown.Item>
//                         </NavDropdown>


                      
                            

//                         </Nav>

//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </div>
//     )
// }
// export default Navigation;

import React from 'react';
import {  Link } from "react-router-dom";
const Navigation= () =>{
  return (
    <div>
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/home">Finvest</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/nft">+ NFT</Nav.Link>
      <Nav.Link href="/mylist">My List</Nav.Link>
    </Nav>
    <div style = {{width :'100px'}}>
    <AmplifySignOut/>
    </div>
    </Container>
  </Navbar>
  


  </div>
      

  );
}
export default Navigation;