import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EnquireModal({ show, handleClose, phoneNumber = "+1234567890" }) {


    // Function to redirect to WhatsApp
    const redirectToWhatsApp = () => {
        const message = encodeURIComponent("Hello! I would like to enquire about your services.");
        window.open(`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    };

    
    // Function to redirect to phone dialer
    const redirectToPhoneDialer = () => {
        window.location.href = `tel:${phoneNumber}`;
    };

    // Add animation when modal opens
    useEffect(() => {
        if (show) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [show]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered={true}
                className="enquire-modal"
                size="md"
            >
                <Modal.Header closeButton className="border-0">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-100 text-center"
                    >
                        <h2 className="modal-title fw-bold">Get In Touch</h2>
                    </motion.div>
                </Modal.Header>

                <Modal.Body className="px-4 py-3">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <h4 className="text-center mb-4">How would you like to connect with us?</h4>

                        <p className="text-center text-muted mb-4">
                            Our team is ready to assist you with any questions or inquiries you might have.
                        </p>

                        <div className="d-flex justify-content-center gap-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-success btn-lg contact-btn"
                                onClick={redirectToWhatsApp}
                            >
                                <i className="fa-brands fa-whatsapp me-2"></i>
                                WhatsApp
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary btn-lg contact-btn"
                                onClick={redirectToPhoneDialer}
                            >
                                <i className="fa-solid fa-phone me-2"></i>
                                Call Us
                            </motion.button>
                        </div>

                      
                    </motion.div>
                </Modal.Body>

                <Modal.Footer className="border-0 justify-content-center pb-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn btn-outline-secondary"
                        onClick={handleClose}
                    >
                        Close
                    </motion.button>
                </Modal.Footer>
            </Modal>
        </>
    );
}