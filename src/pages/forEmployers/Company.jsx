import React, { useState } from 'react';
import axios from '../../backend/axios.jsx';  // Assuming axios is already set up to handle base URL and headers
import { Breadcrumb, Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EHeader from '../../components/EHeader.jsx';
import Footer from '../../components/Footer.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyProfile = () => {
  // Initial form data with empty values
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    website: '',
    phone: '',
    email: '',
    description: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setIsEditing(true);  // Enable editing
    setMessage('');      // Clear any previous messages
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put('/company/profile/', {
        name: formData.companyName,
        address: formData.address,
        website: formData.website,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });

      // Handle successful save
      setMessage('Company information updated successfully.');
      setIsEditing(false);
    } catch (error) {
      // Handle error response
      setMessage('Failed to update company information. Please try again.');
      console.error(error);
    }
  };

  return <>
    <EHeader />
    <Container className="mt-4">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/employers/Home" }}>
            Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý hồ sơ công ty</Breadcrumb.Item>
      </Breadcrumb>
      {message && <Alert variant={message.includes('success') ? 'success' : 'danger'}>{message}</Alert>}
      <h2>Thông tin công ty</h2>
      <Card className="mt-4">
          <Card.Body>
            <Form>
              <Row>
                {/* Company Name */}
                <Col md={6}>
                  <Form.Group controlId="companyName">
                    <Form.Label>Tên công ty</Form.Label>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập tên công ty"
                    />
                  </Form.Group>
                </Col>

                {/* Description */}
                <Col md={6}>
                  <Form.Group controlId="description">
                    <Form.Label>Mô tả công ty</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập mô tả công ty"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
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

                {/* Website */}
                <Col md={6}>
                  <Form.Group controlId="website">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Nhập địa chỉ website"
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
                      placeholder="Nhập địa chỉ email"
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
};

export default CompanyProfile;
