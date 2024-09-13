import React, { useState, useEffect } from "react";
import axios from "../../backend/axios.jsx"; // Assuming axios is set up with base URL and headers
import { Card, Button, Row, Col, Breadcrumb, Alert } from "react-bootstrap";
import CHeader from "../../components/CHeader.jsx";
import Footer from "../../components/Footer.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

const CFeedback = () => {
    const [pendingApplications, setPendingApplications] = useState([]);
    const [reviewedApplications, setReviewedApplications] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch pending and reviewed applications
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const pendingResponse = await axios.get("/candidate/applications/pending");
                const reviewedResponse = await axios.get("/candidate/applications/reviewed");

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
            <CHeader />
            <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
                    Trang chủ
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Phản hồi từ nhà tuyển dụng</Breadcrumb.Item>
            </Breadcrumb>

            <div className="container mt-4">
                <h2>Phản hồi từ nhà tuyển dụng</h2>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Row>
                    {/* Applications Pending Approval Section */}
                    <Col md={6}>
                        <h4>Ứng tuyển đang chờ duyệt</h4>
                        {pendingApplications.length > 0 ? (
                            pendingApplications.map((application, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{application.jobTitle}</Card.Title>
                                        <Card.Text>Công ty: {application.companyName}</Card.Text>
                                        <Card.Text>Ngày nộp: {application.appliedDate}</Card.Text>
                                        <Button variant="primary">Xem chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>Không có đơn ứng tuyển đang chờ duyệt.</p>
                        )}
                    </Col>

                    {/* Applications Approved but Awaiting Candidate Response Section */}
                    <Col md={6}>
                        <h4>Ứng tuyển đã duyệt - Chờ phản hồi của bạn</h4>
                        {reviewedApplications.length > 0 ? (
                            reviewedApplications.map((application, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{application.jobTitle}</Card.Title>
                                        <Card.Text>Công ty: {application.companyName}</Card.Text>
                                        <Card.Text>Ngày duyệt: {application.reviewedDate}</Card.Text>
                                        <Button variant="success">Phản hồi</Button>
                                    </Card.Body>
                                </Card>
                            ))
                        ) : (
                            <p>Không có đơn ứng tuyển đã duyệt chờ phản hồi.</p>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
};

export default CFeedback;
