import React from 'react';
import { motion } from 'framer-motion';

const CustomerJourney = () => {
    const journeySteps = [
        {
            icon: "🏁",
            title: "Free Initial Consultation",
            description: "Expert-guided, personalized assessment of your wellness needs.",
            color: "bg-primary"
        },
        {
            icon: "🔬",
            title: "Choose a Treatment Plan",
            description: "Start with Nutraceuticals, Device Therapy, or Medication",
            color: "bg-success"
        },
        {
            icon: "💡",
            title: "Paid Consultation & Treatment",
            description: "₹500 consultation (Refundable upon purchase of any treatment, including nutraceuticals, devices, or medications.)",
            color: "bg-warning"
        },
        {
            icon: "📈",
            title: "Progress Tracking & Follow-Ups",
            description: "Regular check-ins to optimize results.",
            color: "bg-info"
        }
    ];

    return (
        <div className="py-5 overflow-hidden">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h2 className="display-5 fw-bold text-dark mb-3">
                        Your Wellness Journey
                    </h2>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        A meticulously crafted, user-centric approach designed to transform
                        your health and confidence with precision and care.
                    </p>
                </motion.div>

                <div className="row g-2 justify-content-center position-relative">
                    {/* Journey Line */}
                    <div
                        className="journey-line d-none d-md-block"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: 0,
                            width: '100%',
                            height: '2px',
                            backgroundColor: '#e9ecef',
                            transform: 'translateY(-50%)',
                            zIndex: 1
                        }}
                    />

                    {journeySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="col-12 col-md-3 col-lg-3 position-relative z-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.2
                            }}
                        >
                            <div
                                className="card border-0 shadow-lg rounded-4 text-center p-4 h-100 overflow-hidden position-relative"
                                style={{
                                    background: 'white',
                                    transition: 'all 0.3s ease',
                                    transform: 'translateY(0)',
                                }}
                            >
                                {/* Step Indicator */}
                                <div
                                    className={`position-absolute top-0 start-50 translate-middle-x rounded-bottom-4 text-white px-3 py-1 ${step.color}`}
                                    style={{ zIndex: 10 }}
                                >
                                    Step {index + 1}
                                </div>

                                {/* Icon */}
                                <div
                                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        fontSize: '48px'
                                    }}
                                >
                                    {step.icon}
                                </div>

                                {/* Content */}
                                <div className="card-body">
                                    <h5 className="card-title fw-bold mb-3 text-dark">
                                        {step.title}
                                    </h5>
                                    <p className="card-text text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Custom Global Styles */}
            <style jsx global>{`
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                @media (max-width: 768px) {
                    .journey-line {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default CustomerJourney;