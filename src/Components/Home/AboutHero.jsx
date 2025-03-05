import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const HappyCoupleSolutions = () => {
    const solutions = [
        {
            name: "MindEase Solution",
            description: "Expert-led counseling for stress & confidence",
            icon: "🧠",
            color: "primary"
        },
        {
            name: "VitalCore Solution",
            description: "Nutraceutical support for natural sexual wellness",
            icon: "❤️",
            color: "success"
        },
        {
            name: "ErecSure Solution",
            description: "Vacuum therapy for non-invasive enhancement",
            icon: "🛡️",
            color: "warning"
        },
        {
            name: "PharmaMax Solution",
            description: "Prescription-based treatment for effective results",
            icon: "💊",
            color: "info"
        }
    ];

    return (
        <div className="">
            {/* Hero Section */}
            <Container className="py-5">
                <Row className="align-items-center g-4">
                    <Col md={6} className="order-md-1 order-2">
                        <div className="mb-4 pe-md-4">
                            <h1 className="display-4 fw-bold text-dark mb-3 animate__animated animate__fadeInLeft">
                                Happy Couple Solutions
                            </h1>
                            <p className="lead text-muted mb-4 animate__animated animate__fadeInLeft animate__delay-1s">
                                Your Partner in Confidence, Wellness & Deeper Connections
                            </p>
                            <p className="text-dark mb-4 animate__animated animate__fadeInLeft animate__delay-2s">
                                At Happy Couple Solutions, we help you reclaim confidence, intimacy,
                                and relationship harmony with scientifically-backed treatment plans
                                and expert guidance.
                            </p>
                          
                        </div>
                    </Col>
                    <Col md={6} className="order-md-2 order-1">
                        <div className="position-relative">
                            <img
                                src="/Happy Couple LOGO.svg"
                                alt="Couple Wellness"
                                loading='lazy'
                                className="img-fluid rounded-4"
                            />
                           
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Approach Section */}
            <Container className="py-5 bg-white">
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="display-6 fw-bold mb-3 text-dark">Our Approach Helps You</h2>
                        <p className="lead text-muted">
                            Comprehensive solutions designed to transform your relationship
                        </p>
                    </Col>
                </Row>
                <Row className="g-4">
                    {[
                        {
                            icon: "lightning-charge",
                            title: "Manage Stress & Anxiety",
                            text: "Create a relaxed, fulfilling experience by addressing underlying stress.",
                            color: "primary"
                        },
                        {
                            icon: "heart",
                            title: "Enhance Confidence & Trust",
                            text: "Build stronger emotional connections between partners.",
                            color: "success"
                        },
                        {
                            icon: "people",
                            title: "Strengthen Intimacy",
                            text: "Improve emotional and physical intimacy through personalized treatments.",
                            color: "danger"
                        }
                    ].map((approach, idx) => (
                        <Col md={4} key={idx}>
                            <Card className="h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div
                                        className={`rounded-circle bg-${approach.color} text-white d-flex align-items-center justify-content-center mb-3 mx-auto`}
                                        style={{ width: '90px', height: '90px' }}
                                    >
                                        <i className={`bi bi-${approach.icon} fs-2`}></i>
                                    </div>
                                    <h5 className="mb-3 fw-bold">{approach.title}</h5>
                                    <p className="text-muted">{approach.text}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Solutions Section */}
            <Container className="py-5">
                <Row className="text-center mb-5">
                    <Col>
                        <h2 className="display-6 fw-bold mb-3 text-dark">
                            Stepwise, Science-Backed Solutions
                        </h2>
                        <p className="lead text-muted">
                            Comprehensive, personalized approaches to enhance your relationship
                        </p>
                    </Col>
                </Row>
                <Row className="g-4">
                    {solutions.map((solution, idx) => (
                        <Col md={3} sm={6} key={idx}>
                            <Card className="h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div
                                        className={`rounded-circle bg-${solution.color} text-white d-flex align-items-center justify-content-center mb-3 mx-auto`}
                                        style={{ width: '90px', height: '90px' }}
                                    >
                                        <span className="fs-2">{solution.icon}</span>
                                    </div>
                                    <h5 className="mb-3 fw-bold">{solution.name}</h5>
                                    <p className="text-muted">{solution.description}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Final Call to Action */}
            <div className="bg-gradient-primary text-white py-5">
                <Container>
                    <Row className="text-center">
                        <Col>
                            <h2 className="display-5 fw-bold mb-4">
                                Regain Passion, Connection, and Confidence
                            </h2>
                            <p className="lead mb-4">
                                With safe, proven, and easy-to-follow treatment plans, we empower
                                individuals and couples to regain passion and connection.
                            </p>
                            <Button
                                variant="light"
                                size="lg"
                                className="px-5 py-2 rounded-pill shadow-lg text-primary"
                            >
                                Begin Your Journey
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Custom CSS */}
            <style jsx global>{`
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .hover-lift:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 1rem 3rem rgba(0,0,0,.175) !important;
                }
                .bg-gradient-primary {
                    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
                }
            `}</style>
        </div>
    );
};

export default HappyCoupleSolutions;