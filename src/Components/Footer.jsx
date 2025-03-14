import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {



  return (


    <>

      <footer className="text-center text-lg-start text-white py-1 px-5">

        <section className="p-5 pb-0 pt-0" style={{ borderBottom: '1px solid #414141' }}>

          <div className="container text-center text-md-start mt-5">

            <div className="row mt-3">


              {/* Navigation */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-2">
                  Navigation
                </h6>

                <p className='mb-2'>

                  <Link to={'/'} className='text-reset foot-link'>Home</Link>

                </p>

                <p className='mb-2'>

                  <Link to={'/ai'} className='text-reset foot-link'>AI Consultant</Link>

                </p>


                <p className='mb-2'>

                  <Link to={'/doctors'} className='text-reset foot-link'>Talk to Doctor</Link>

                </p>

                {/* <p className='mb-2'>

                  <Link to={'/performance'} className='text-reset foot-link'>Your Concern</Link>

                </p> */}

                <p className='mb-2'>

                  <Link to={'/allproducts'} className='text-reset foot-link'>Treatment Plans</Link>

                </p>

              </div>



              {/* About */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 foot-res">


                <div className='foot-logo'>

                  <img src="/Foot-Logo.png" loading='lazy' className='img-fluid' alt="" />

                </div>

                <p>Happy Couple Solutions <br />
                  MEDICARE PHARMA <br />
                  An initiative of <br />
                  Medresearch India Pvt. Ltd.</p>


                <p style={{ fontSize: '15px' }}><i className="fas fa-home me-3"></i>RKP,3/569G,Parammal Road,Ramanatukara,Kozhikode <br />- 673 634</p>


                <p className='text-start'>

                  <a href='mailto:info@happycouplesolution.com' className='foot-link' style={{ fontSize: '15px' }} target='_blank'>

                    <i className="fas fa-envelope me-3 mb-4"></i>
                    info@happycouplesolution.com

                  </a>

                </p>


                <p className='w-100'>

                  <a href={`tel:+919020200100`} className='foot-link' target='_blank' style={{ fontSize: '15px' }} > <i className="fas fa-phone me-3"></i>+91 9020200100</a>

                </p>

                <p className='w-100'>

                  <a href={`https://wa.me/+919072399100?text=Hi`} className='foot-link me-2' target='_blank' style={{ fontSize: '15px' }} > <i class="fa-brands fa-whatsapp me-3 fa-xl"></i>+91 9072399100,</a>
                  <a href={`https://wa.me/+919072377100?text=Hi`} className='foot-link' target='_blank' style={{ fontSize: '15px' }} >+91 9072377100</a>

                </p>



              </div>


              {/* Pages */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-2">
                  Pages
                </h6>


                <p className='mb-2'>

                  <Link to={'about'} className='text-reset foot-link'>About Us</Link>

                </p>


                <p>

                  <Link to={'/contact'} className='text-reset foot-link'>Contact Us</Link>

                </p>



              </div>

            </div>

          </div>

        </section>


        <div class="text-center p-4 pb-0" style={{ color: '#ccc' }}>


          <p> Copyright © 2024 happycouplesolution. All Rights Reserved. </p>

          <p>Powered by <a href="https://exmedia.in" target='_blank' className='foot-link'>exmedia.in</a></p>


          <div className='d-flex justify-content-center'>

            <p><Link className='nav-link foot-link' to={'/pirvacyPolicy'}> Privacy Policy</Link></p>

            <span className='me-3 ms-3 policy-none'>|</span>

            <p><Link className='nav-link foot-link' to={'/termsandConditions'}>Terms & Conditions</Link></p>

            <span className='me-3 ms-3 policy-none'>|</span>

            <p><Link className='nav-link foot-link me-3' to={'/CancellationandRefundPolicy'}>Cancellation and Refund Policy</Link></p>

            <span className='me-3  policy-none'>|</span>

            <p><Link className='nav-link foot-link me-3' to={'/ShippingPolicy'}>Shipping Policy</Link></p>

            <span className='me-3  policy-none'>|</span>

            <p><Link className='nav-link foot-link me-3' to={'/contact'}>Contact Us</Link></p>

          </div>


        </div>




        {/* Socail Media Links */}
        <section class="d-flex justify-content-center pb-3">

          <a data-mdb-ripple-init class="btn m-1" href="https://www.facebook.com/happycouplesolution/" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fab fa-facebook-f text-white"></i
          ></a>


          <a data-mdb-ripple-init class="btn m-1" href="https://x.com/happycouplesolu" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fa-brands fa-x-twitter text-white"></i></a>

          <a data-mdb-ripple-init class="btn  m-1" href="https://www.instagram.com/happycouplesolution/" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fab fa-instagram text-white"></i
          ></a>


          <a data-mdb-ripple-init class="btn  m-1" href="https://www.linkedin.com/company/happycouplesolution/?viewAsMember=true" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fab fa-linkedin-in text-white"></i
          ></a>


          <a data-mdb-ripple-init class="btn m-1" href="https://www.youtube.com/@happycouplesolution" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fa-brands fa-youtube text-white"></i></a>


          <a data-mdb-ripple-init class="btn  m-1" href="https://in.pinterest.com/happycouplesolution/" role="button" target='_blank' style={{ borderRadius: '5rem' }}
          ><i class="fa-brands fa-pinterest text-white"></i></a>


        </section>

      </footer>


    </>


  )


}

export default Footer