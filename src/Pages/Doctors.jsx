import React, { useState } from 'react'
import './Doctors.css'
import { useEffect } from 'react';
import { GetDoctor } from '../Services/AllApi';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function Doctors() {



    const [DocData, SetDocData] = useState([])

    const [ModalData, SetModalData] = useState({})


    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {


        // TO MOUNT ON THE TOP LEVEL 
        window.scrollTo(0, 0);


        const Doctor = async () => {


            try {


                const res = await GetDoctor()

                if (res.status >= 200 && res.status <= 300) {


                    SetDocData(res.data)




                } else {

                    console.log(res);


                }

            }
            catch (Err) {

                console.log(Err);

            }

        }

        Doctor()

    }, []);



    // Modal Click
    const handlemodal = (item) => {

        SetModalData(item)
        handleShow()

    }





    

    return (

        <>


            <section className='container '>


                <div className='doc-head p-4'>

                    <h3 className='text-center'>Talk to Doctor</h3>

                    <p className='text-center'>Hi, Welcome to Happy Couple Solution</p>

                    <p className='text-center'>Fin Perfect Expert to your Health Concern</p>

                </div>


                <div className='doc-2'>


                    <h4 className='text-center'>Specialist Centre I General Physicians I Health Coaches</h4>


                    <div className='d-flex justify-content-center align-items-center mt-4'>


                        <div className='spec-logo'>


                            <Link to={'/ai'}>

                                <img loading='lazy' src="/Erect_Well-04.jpg" className='img-fluid' alt="img" />

                            </Link>


                            <p className='text-center'>Performance</p>

                        </div>

                        <div className='spec-logo ms-3'>

                            <Link to={'/stress'}>

                                <img loading='lazy' src="/Erect_Well-01.jpg" className='img-fluid' alt="img" />

                            </Link>

                            <p className='text-center'>Stress</p>

                        </div>



                    </div>

                </div>



                <div className="row  d-flex justify-content-center py-5 ">



                    {

                        DocData &&

                        DocData.map((item) => (


                            <main  class="mb-5 d-flex flex-column justify-content-center align-items-center">

                                {/* <div className="">

                                    <div className="doctor-container bg-white shadow">

                                        <div className="d-c-top ">

                                            <div className="doctor-image p-0 col-4 col-md-3">



                                                <img src={item.image} alt="img" loading='lazy' />



                                            </div>


                                            <div className="doctor-info col-6 col-md-6">

                                                <h3>{item.name}</h3>

                                                <p>{item.specialization}</p>

                                            </div>


                                            <div className="col-2 p-0 online-btn col-md-2">
                                                <button className="btn-shimmer-green">Online</button>
                                            </div>

                                        </div>

                                        <div className="c-d-middle row p-0">
                                            <div className="doctor-experiance"></div>
                                        </div>


                                        <div className="row pt-2 d-c-footer">

                                            <div className="col-8 chat d-flex justify-content-center">

                                                <a href="https://wa.me/+919072399100?text=Hi" target='_blank' className='btn w-100 btn-chatnow'>Chat Now</a>

                                            </div>


                                            <div className="col-4 info d-flex justify-content-center">
                                                <button className="btn w-100 btn-doc-info" onClick={() => { handlemodal(item) }}>Info</button>
                                            </div>

                                        </div>


                                    </div>
                                </div> */}





                                <div class="card1">

                                    <div class="card-header">

                                        <img src={item.image} alt="Dr. Ajayan Varughes" class="doctor-image" />
                                        <div class="doctor-info">
                                            <h2>{item.name}</h2>
                                            <p>{item.specialization}</p>
                                            
                                        </div>
                                        <div class="status">
                                            <span class="online-status">Online</span>
                                        </div>

                                    </div>

                                    <div class="card-body bg-white">
                                        <div class="details">
                                            <p><strong>{item.experience}</strong></p>
                                            {/* <p><strong>999 consultations</strong></p> */}
                                            <p>Can speak in English, हिंदी, தமிழ், മലയാളം</p>
                                        </div>
                                    </div>

                                    <div class="card-footer">
                                        <button class="talk-now-btn">Talk now</button>
                                        <button class="view-profile-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" type="button">View Profile</button>
                                    </div>




                                </div>





                            </main>


                        ))


                    }

                </div>


            </section>




            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={true}
                
            >



                <Modal.Header closeButton>


                </Modal.Header>


                <Modal.Body>


                    <h3>{ModalData.name}</h3>

                    <p style={{ fontSize: '15px', textAlign: 'justify' }}>{ModalData.specialization}</p>

                </Modal.Body>


                <Modal.Footer>

                    <button className='btn btn-closed' onClick={handleClose}>Close</button>


                </Modal.Footer>


            </Modal>


        </>


    )




}

export default Doctors