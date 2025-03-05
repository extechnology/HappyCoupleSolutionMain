import React from 'react'
import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'




function Header() {



  // Modal State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  // Suggestions
  const [Suggest, SetSuggest] = useState([

    "Find a Perfect Solution for You.", "Take a FREE Performance Test ",
    "Test a Free Stress Management Test", "Book a Free Consultation with Doctor",
    "Consult with an Expert for low-drive", "Buy Products for improve performance",
    "Buy product for keeping a long drive "

  ])



  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false); // Collapse the navbar
  };


  const handlelogout = () => {
    if (sessionStorage.getItem("token")) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        
        // Reload the page after logging out
        window.location.reload();
    } else {
        toast.warning("No User Found. Please Login...!");
    }
};



  return (


    <>


      <Navbar expand="lg" className="header" collapseOnSelect expanded={expanded}>

        <Container className='contain'>


          <div className='nav-logo'>

            <a href="/">

              <img src="/NAV-LOGO.png" loading='lazy' className='img-fluid' alt="img" />

            </a>

          </div>



          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />

          <Navbar.Collapse id="basic-navbar-nav" className='nav-col'>


            <Nav className="me-auto navigation">

              <Link to={'/'} onClick={handleNavClick}>Home</Link>


              <Link to={'/ai'} onClick={handleNavClick}>AI Consultant</Link>


              <Link to={'/doctors'} onClick={handleNavClick}>Talk to Doctor</Link>


              <div className='dropdown'>

                <Nav.Link href="#link" >Your Concern <i class="fa-solid fa-caret-down" style={{ color: '#ccc' }}></i></Nav.Link>


                <div className='dropdown-content'>

                  <Link to={'/performance'} className='drop-link d-block' onClick={handleNavClick}>Performance</Link>
                  <Link to={'/stress'} className='drop-link d-block' onClick={handleNavClick}>Stress Management</Link>

                </div>

              </div>


              <Link to={'/allproducts'} onClick={handleNavClick}>Treatment Plans</Link>



              <div className='dropdown'>

                <Nav.Link href="#link">Pages<i class="fa-solid fa-caret-down" style={{ color: '#ccc' }}></i></Nav.Link>


                <div className='dropdown-content'>

                  <Link to={'/about'} className='drop-link d-block' onClick={handleNavClick}>About Us</Link>
                  <Link to={'/contact'} className='drop-link d-block' onClick={handleNavClick}>Contact Us</Link>

                </div>


              </div>


              <Link onClick={() => { handleShow(), handleNavClick() }}><i class="fa-solid fa-magnifying-glass"></i></Link>



              <Link to={'/cart'} onClick={handleNavClick}><i class="fa-solid fa-cart-shopping"></i></Link>


              <div className='dropdown d-flex'>

                <Nav.Link ><i class="fa-solid fa-user"></i></Nav.Link>


                <div className='dropdown-content'>

                  <Link to={'/auth'} className='drop-link d-block' onClick={handleNavClick}>Login</Link>
                  <Link className='drop-link d-block' onClick={handlelogout}>Logout</Link>
                  <Link to={'/order'} className='drop-link d-block'>Orders</Link>

                </div>

              </div>




            </Nav>

          </Navbar.Collapse>


        </Container>


      </Navbar>




      {/* Search Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}

      >

        <Modal.Header closeButton className='bg-transparent border-0'>



        </Modal.Header>


        <Modal.Body>

          <div className='search'>

            <input type="text" placeholder='Search' className='form-control' />

            {/* Suggestions */}
            <div className='p-4 pb-0 suggest'>

              <ul>

                <Link to={'/ai'} onClick={handleClose} className='nav-link'> <li>Find a Perfect Solution for You</li></Link>

                <Link to={'/ai'} onClick={handleClose} className='nav-link'> <li>Take a FREE Performance Test</li></Link>

                <Link to={'/stress'} onClick={handleClose} className='nav-link'> <li>Test a Free Stress Management Test</li></Link>

                <Link to={'/doctors'} onClick={handleClose} className='nav-link'> <li>Book a Free Consultation with Doctor</li></Link>

                <Link to={'/ai'} onClick={handleClose} className='nav-link'> <li>Consult with an Expert for low-drive</li></Link>

                <Link to={'/allproducts'} onClick={handleClose} className='nav-link'> <li>Buy Products for improve performance</li></Link>

                <Link to={'/allproducts'} onClick={handleClose} className='nav-link'> <li>Buy product for keeping a long drive</li></Link>

              </ul>

            </div>


            {/* Products */}

            <div className='scrollable'>

              <h5 className='text-center mb-3' style={{ fontWeight: '600' }}>Recommended Products</h5>


              <div className="d-flex mb-5 ps-4 pt-2 pb-1">

                <a href="#" className="me-3">
                  <img src="/LYGIN_M.jpg" style={{ minWidth: '96px', height: '96px' }} className="img-md" />
                </a>


                <div className="info">
                  <a href="#" className="nav-link mb-1">
                    Lygin-M 30<br />
                    Tables

                  </a>
                  <strong className="text-dark"> ₹38.90</strong>


                  <button className='btn btn-cart'>Add to Cart</button>

                </div>

              </div>


              <div className="d-flex mb-3 ps-4 pt-2 pb-1">

                <a href="#" className="me-3">
                  <img src="/LYGIN_M.jpg" style={{ minWidth: '96px', height: '96px' }} className="img-md" />
                </a>


                <div className="info">
                  <a href="#" className="nav-link mb-1">
                    Lygin-M 30<br />
                    Tables

                  </a>
                  <strong className="text-dark"> ₹38.90</strong>


                  <button className='btn btn-cart'>Add to Cart</button>

                </div>

              </div>





            </div>


          </div>

        </Modal.Body>


      </Modal>

    </>

  )



}

export default Header