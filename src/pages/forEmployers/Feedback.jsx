import React, { useState, useEffect } from "react";
import axios from "../../backend/axios.jsx"; // Assuming axios is set up with base URL and headers
import { Card, Button, Row, Col, Breadcrumb, Alert } from "react-bootstrap";
import EHeader from "../../components/EHeader.jsx";
import Footer from "../../components/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const EFeedback = () => {
    const [pendingApplications, setPendingApplications] = useState([]);
    const [reviewedApplications, setReviewedApplications] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch pending and reviewed applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const pendingResponse = await axios.get("/applications/pending");
                const reviewedResponse = await axios.get("/applications/reviewed");

                setPendingApplications(pendingResponse.data);
                setReviewedApplications(reviewedResponse.data);
            } catch (error) {
                setErrorMessage('Error fetching applications. Please try again later.');
                console.error(error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <>
            <EHeader />
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/employers/Home" }}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Phản hồi ứng viên</Breadcrumb.Item>
            </Breadcrumb>

            <div className="container mt-4">
                <h2>Phản hồi từ ứng viên</h2>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Row>
                    {/* Pending Applications Section */}
                    <Col md={6}>
                        <h4>Ứng tuyển chưa duyệt</h4>
                        {pendingApplications.length > 0 ? (
                            pendingApplications.map((application, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{application.jobTitle}</Card.Title>
                                        <Card.Text>Tên ứng viên: {application.candidateName}</Card.Text>
                                        <Card.Text>Email: {application.candidateEmail}</Card.Text>
                                        <Card.Text>Ngày nộp: {application.appliedDate}</Card.Text>
                                        <Button variant="primary">Xem chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>Không có đơn ứng tuyển chưa duyệt.</p>
                        )}
                    </Col>

                    {/* Reviewed Applications Section */}
                    <Col md={6}>
                        <h4>Ứng tuyển đã duyệt - Đang chờ phản hồi</h4>
                        {reviewedApplications.length > 0 ? (
                            reviewedApplications.map((application, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{application.jobTitle}</Card.Title>
                                        <Card.Text>Tên ứng viên: {application.candidateName}</Card.Text>
                                        <Card.Text>Email: {application.candidateEmail}</Card.Text>
                                        <Card.Text>Ngày duyệt: {application.reviewedDate}</Card.Text>
                                        <Button variant="success">Chờ phản hồi</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>Không có đơn ứng tuyển đã duyệt.</p>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default EFeedback;
