import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import './Slider.css'
import { Link } from 'react-router-dom';

function Slider() {



    return (


        <>

            <section className='container-fluid  Slider-main'>


                <div className='row'>


                    <div className='col-md-6'>


                        <Carousel data-bs-theme="dark" controls={false} indicators={false} slide={true}>


                            <Carousel.Item>

                                <img
                                    className="d-block w-100"
                                    src="/slide-1.jpeg"
                                    alt="First slide"
                                    loading='lazy'
                                />


                            </Carousel.Item>


                            <Carousel.Item>

                                <img
                                    className="d-block w-100"
                                    src="/slide-2.jpeg"
                                    alt="Second slide"
                                    loading='lazy'
                                />

                            </Carousel.Item>



                            <Carousel.Item>

                                <img
                                    className="d-block w-100"
                                    src="/slide-3.jpeg"
                                    alt="Third slide"
                                    loading='lazy'
                                />

                            </Carousel.Item>


                            <Carousel.Item>

                                <img
                                    className="d-block w-100"
                                    src="/slide-4.jpeg"
                                    alt="Third slide"
                                    loading='lazy'
                                />

                            </Carousel.Item>



                        </Carousel>



                    </div>



                    <div className='col-md-6'>

                        <div className='row'>


                            <div className='col-md-6 Slide-hover slider-margin'>

                                <Link className='nav-link' to={'/doctors'}>

                                    <img src="/Side_Baner_(385x330)-01.jpg" loading='lazy' className='img-fluid' alt="" />

                                    <div className='text-over'>

                                        <h4>Book a Consultation</h4>

                                    </div>


                                </Link>



                            </div>


                            <div className='col-md-6 Slide-hover slider-margin'>

                                <Link className='nav-link' to={'/ai'}>

                                    <img src="/li-2.jpeg" loading='lazy' className='img-fluid' alt="" />

                                    <div className='text-over'>

                                        <h4>Personalized Health Assessment </h4>

                                    </div>

                                </Link>

                            </div>


                            <div className='col-md-6 Slide-hover' style={{ marginTop: '1.3rem' }} >

                                <Link className='nav-link' to={'/doctors'}>

                                    <img src="/li-3.jpeg" loading='lazy' className='img-fluid' alt="" />

                                    <div className='text-over'>

                                        <h4>Explore Treatment Plans</h4>

                                    </div>

                                </Link>


                            </div>


                            <div className='col-md-6 Slide-hover' style={{ marginTop: '1.3rem' }}>

                                <Link className='nav-link' to={'/stress'}>

                                    <img src="/li-4.jpeg" loading='lazy' className='img-fluid' alt="" />


                                    <div className='text-over'>

                                        <h4>Manage Stress & Confidence</h4>

                                    </div>

                                </Link>

                            </div>


                        </div>


                    </div>


                </div>





            </section>


        </>

    )





}

export default Slider