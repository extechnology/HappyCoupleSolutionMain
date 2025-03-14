import React from 'react'
import './ContactUs.css'
import { useEffect } from 'react'

function ContactUs() {



    useEffect(() => {


        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);


    }, []);


    return (


        <>

            <section className='contact container'>



                <div className='Contact-hero row'>

                    <h2 className='text-center'>Contact Us</h2>

                </div>



                <div className='contact-form row  mt-5'>


                    {/* Contact Deatils */}
                    <div className='col-md-6 get-in'>

                        <h3 className='mb-4'>Contact Us</h3>


                        <p><i class="fa-solid fa-house me-2"></i>RKP, 3/569G, Parammal Road, Ramanatukara, Kozhikode - 673 634 , Kerala, INDIA</p>

                        <p>

                            <a href="https://wa.me/+91 9020200100" className='nav-link' target='_blank'> <i class="fa-solid fa-phone me-2"></i>  +91 9020 200 100</a>


                        </p>

                        <p>

                            <a href="mailto:info@happycouplesolution.in.com" className='nav-link' target='_blank'><i class="fa-solid fa-envelope me-2"></i> info@happycouplesolution.com</a>


                        </p>



                        <p>

                            <a href="https://happycouplesolution.com" className='nav-link' target='_blank'><i class="fa-solid fa-earth-americas me-2"></i>www.happycouplesolution.com</a>

                        </p>


                    </div>



                    {/* Contact Form */}
                    <div className='col-md-6 margin-get'>

                        <h3>Get In Touch</h3>

                        <form onSubmit={(e) => { e.preventDefault() }} className='pt-3'>


                            <input type="text" className='form-control mb-4' placeholder='Name' />


                            <input type="text" className='form-control mb-4' placeholder='Email' />


                            <input type="text" className='form-control mb-4' placeholder='Phone' />


                            <input type="text" className='form-control mb-4' placeholder='Subject' />


                            <textarea name="" placeholder='Your Message' className='form-control' id=""></textarea>

                            <button type='submit' className='btn btn-dark w-50 mt-4'>Send</button>


                        </form>


                    </div>


                </div>



                <div className='map pt-5'>

                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7440.894326451381!2d75.869884!3d11.179174!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6511aeb3e77af%3A0xa0c3829452195f7!2sMedicare%20Pharma!5e1!3m2!1sen!2sin!4v1723117537037!5m2!1sen!2sin" width="100%" height="450" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>


                </div>


            </section>


        </>

    )





}

export default ContactUs