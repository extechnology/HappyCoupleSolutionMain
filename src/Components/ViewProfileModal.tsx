import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfileModal = ({ show, handleClose, ModalData }) => {


    // Parse languages into array
    const parseLanguages = (languagesString) => {
        return languagesString?.split('|').map(lang => lang?.trim());
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered={true}
            dialogClassName="modal-dialog-centered modal-lg"
            contentClassName="border-0 shadow-lg"
        >
            <Modal.Header
                closeButton
                className="border-0"
                style={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderBottom: "none",
                    borderRadius: "0.5rem 0.5rem 0 0"
                }}
            >
                <div className="w-100 py-2 animate__animated animate__fadeIn">
                    <h3 className="fw-bold mb-0 text-white text-center">{ModalData?.name}</h3>
                </div>
            </Modal.Header>

            <Modal.Body className="p-0">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-md-4 bg-light">
                            <div className="p-4 h-100 d-flex flex-column justify-content-center">
                                <div className="animate__animated animate__fadeInLeft">
                                    <div className="mb-4 bg-white p-3 rounded-3 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
                                        <h5 className="border-bottom pb-2 text-primary">Experience</h5>
                                        <p className="mb-0 fs-5 fw-bold">{ModalData?.experience}</p>
                                    </div>

                                    <div className="mb-4 bg-white p-3 rounded-3 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
                                        <h5 className="border-bottom pb-2 text-primary">Languages</h5>
                                        <div className="d-flex flex-wrap gap-2 mt-2">
                                            {parseLanguages(ModalData?.languages)?.map((language, index) => (
                                                <span
                                                    key={index}
                                                    className="badge animate__animated animate__flipInX"
                                                    style={{
                                                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                                        fontSize: "0.8rem",
                                                        padding: "0.4rem 0.6rem",
                                                        animationDelay: `${0.2 + index * 0.1}s`
                                                    }}
                                                >
                                                    {language}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="p-4">
                                <div className="animate__animated animate__fadeInRight">
                                    <div className="mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                                        <h5 className="border-bottom pb-2 text-primary">Specialization</h5>
                                        <p className="text-muted">
                                            {ModalData?.specialization?.split(',').map((spec, index) => (
                                                <span key={index} className="d-block mb-1">
                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                    {spec.trim()}
                                                </span>
                                            ))}
                                        </p>
                                    </div>

                                    <div className="animate__animated animate__fadeInUp animate__delay-2s">
                                        <h5 className="border-bottom pb-2 text-primary">Qualification</h5>
                                        <p className="text-muted">
                                            {ModalData?.qualification?.split(',').map((qual, index) => (
                                                <span key={index} className="d-block mb-2">
                                                    <i className="bi bi-award text-warning me-2"></i>
                                                    {qual.trim()}
                                                </span>
                                            ))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0 justify-content-center">
                <button
                    className="btn animate__animated animate__pulse animate__infinite"
                    onClick={handleClose}
                    style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        padding: "0.6rem 2rem",
                        borderRadius: "50px",
                        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
                    }}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;

