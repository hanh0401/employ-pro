import React, { useState } from 'react';
import axios from '../../backend/axios.jsx';  // Ensure axios is set up to handle API calls
import { Breadcrumb, Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CHeader from '../../components/CHeader.jsx';
import Footer from '../../components/Footer.jsx';
import { APIClient } from '../../backend/api.ts';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateProfile = () => {

  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  // Initial form data for candidate's personal profile
  const [formData, setFormData] = useState({
    fullName: '',
    email: userProfile?.username,
    phone: userProfile?.phone_number,
    address: '',
    education: '',
    experience: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enable editing
  const handleEditClick = () => {
    setIsEditing(true);
    setMessage('');
  };

  // Save candidate profile changes
  const handleSaveClick = async () => {
    try {
      const response = await axios.put('/candidate/profile/', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        education: formData.education,
        experience: formData.experience
      });

      // Success response
      setMessage('Thông tin cá nhân đã được cập nhật thành công.');
      setIsEditing(false);
    } catch (error) {
      // Error handling
      setMessage('Cập nhật thông tin không thành công. Vui lòng thử lại.');
      console.error(error);
    }
  };

  return (
    <>
      <CHeader />
      <Container className="mt-4">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
              Trang chủ
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Quản lý hồ sơ cá nhân</Breadcrumb.Item>
        </Breadcrumb>

        {message && <Alert variant={message.includes('thành công') ? 'success' : 'danger'}>{message}</Alert>}

        <h2>Hồ Sơ Cá Nhân</h2>
        <Card className="mt-4">
          <Card.Body>
            <Form>
              <Row>
                {/* Full Name */}
                <Col md={6}>
                  <Form.Group controlId="fullName">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập họ và tên"
                    />
                  </Form.Group>
                </Col>

                {/* Email */}
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập email"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Phone */}
                <Col md={6}>
                  <Form.Group controlId="phone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập số điện thoại"
                    />
                  </Form.Group>
                </Col>

                {/* Address */}
                <Col md={6}>
                  <Form.Group controlId="address">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập địa chỉ"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                {/* Education */}
                <Col md={6}>
                  <Form.Group controlId="education">
                    <Form.Label>Học vấn</Form.Label>
                    <Form.Control
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập học vấn"
                    />
                  </Form.Group>
                </Col>

                {/* Experience */}
                <Col md={6}>
                  <Form.Group controlId="experience">
                    <Form.Label>Kinh nghiệm</Form.Label>
                    <Form.Control
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập kinh nghiệm"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Action buttons */}
              <div className="text-center mt-4">
                {isEditing ? (
                  <Button variant="success" onClick={handleSaveClick}>
                    Lưu
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleEditClick}>
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default CandidateProfile;
