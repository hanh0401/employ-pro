// import React, { useState } from 'react';
// import { Breadcrumb, Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import CHeader from '../../components/CHeader.jsx';
// import Footer from '../../components/Footer.jsx';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CandidateProfile = () => {

//   const userProfile = JSON.parse(localStorage.getItem('userProfile'));
//   // Initial form data for candidate's personal profile
//   const [formData, setFormData] = useState({
//     fullName: userProfile.fullName || '',
//     email: userProfile.email || '', // Không chỉnh sửa được
//     phone: userProfile.phone_number || '', // Không chỉnh sửa được
//     date_of_birth: userProfile.date_of_birth || '',
//     address: userProfile.address || '', // Không chỉnh sửa được
//     skills: userProfile.skills || '',
//     experience: userProfile.experience_years || ''
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [message, setMessage] = useState('');

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Enable editing
//   const handleEditClick = () => {
//     setIsEditing(true);
//     setMessage('');
//   };

//   // Save candidate profile changes
//   const handleSaveClick = async () => {
//     try {
//       const response = await axios.patch('/api/candidate/profile/', {
//         fullName: formData.fullName,
//         date_of_birth: formData.date_of_birth,
//         skills: formData.skills,
//         experience_years: parseInt(formData.experience)
//       });

//       // Success response
//       setMessage('Thông tin cá nhân đã được cập nhật thành công.');
//       setIsEditing(false);
//     } catch (error) {
//       // Error handling
//       setMessage('Cập nhật thông tin không thành công. Vui lòng thử lại.');
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <CHeader />
//       <Container className="mt-4">
//         <Breadcrumb>
//           <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
//               Trang chủ
//           </Breadcrumb.Item>
//           <Breadcrumb.Item active>Quản lý hồ sơ cá nhân</Breadcrumb.Item>
//         </Breadcrumb>

//         {message && <Alert variant={message.includes('thành công') ? 'success' : 'danger'}>{message}</Alert>}

//         <h2>Hồ Sơ Cá Nhân</h2>
//         <Card className="mt-4">
//           <Card.Body>
//             <Form>
//               <Row>
//                 {/* Họ tên */}
//                 <Col md={6}>
//                   <Form.Group controlId="fullName">
//                     <Form.Label>Họ và tên</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       placeholder="Nhập họ và tên"
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Email (không thay đổi) */}
//                 <Col md={6}>
//                   <Form.Group controlId="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 {/* Phone (no change) */}
//                 <Col md={6}>
//                   <Form.Group controlId="phone">
//                     <Form.Label>Số điện thoại</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="phone"
//                       value={formData.phone}
//                       // onChange={handleInputChange}
//                       // disabled={!isEditing}
//                       // placeholder="Nhập số điện thoại"
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Date Of Birth */}
//                 <Col md={6}>
//                   <Form.Group controlId="date_of_birth">
//                     <Form.Label>Ngày sinh</Form.Label>
//                     <Form.Control
//                       type="date"
//                       name="date_of_birth"
//                       value={formData.date_of_birth}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       placeholder="Nhập ngày sinh"
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Address (no change)*/}
//                 <Col md={6}>
//                   <Form.Group controlId="address">
//                     <Form.Label>Địa chỉ</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="address"
//                       value={formData.address}
//                       // onChange={handleInputChange}
//                       // disabled={!isEditing}
//                       // placeholder="Nhập địa chỉ"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 {/* Skills */}
//                 <Col md={6}>
//                   <Form.Group controlId="skills">
//                     <Form.Label>Kỹ năng</Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       name="skills"
//                       value={formData.skills}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       placeholder="Nhập các kỹ năng"
//                     />
//                   </Form.Group>
//                 </Col>

//                 {/* Experience */}
//                 <Col md={6}>
//                   <Form.Group controlId="experience">
//                     <Form.Label>Kinh nghiệm</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="experience"
//                       value={formData.experience}
//                       onChange={handleInputChange}
//                       disabled={!isEditing}
//                       placeholder="Nhập kinh nghiệm"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               {/* Action buttons */}
//               <div className="text-center mt-4">
//                 {isEditing ? (
//                   <Button variant="success" onClick={handleSaveClick}>
//                     Lưu
//                   </Button>
//                 ) : (
//                   <Button variant="primary" onClick={handleEditClick}>
//                     Chỉnh sửa
//                   </Button>
//                 )}
//               </div>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default CandidateProfile;

import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Form, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CHeader from '../../components/CHeader.jsx';
import Footer from '../../components/Footer.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CandidateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    skills: '',
    experience: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
        fetchProfileData();
      } else {
        setIsAuthenticated(false);
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch profile data
  const fetchProfileData = async () => {
    try {
      const response = await axios.get('/api/profile/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      const profile = response.data;
      setFormData({
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        phone: profile.phone_number,
        date_of_birth: profile.date_of_birth,
        address: profile.address,
        skills: profile.skills || '', // Update based on actual API response
        experience: profile.experience_years || '' // Update based on actual API response
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

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
      await axios.patch('/api/profile/', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.date_of_birth,
        skills: formData.skills,
        experience_years: parseInt(formData.experience)
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      setMessage('Thông tin cá nhân đã được cập nhật thành công.');
      setIsEditing(false);
    } catch (error) {
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
        {isAuthenticated ? (
          <Card className="mt-4">
            <Card.Body>
              <Form>
                <Row>
                  {/* First Name */}
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập tên"
                      />
                    </Form.Group>
                  </Col>

                  {/* Last Name */}
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Họ</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập họ"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email (no change) */}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  {/* Phone (no change) */}
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {/* Date of Birth */}
                  <Col md={6}>
                    <Form.Group controlId="date_of_birth">
                      <Form.Label>Ngày sinh</Form.Label>
                      <Form.Control
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập ngày sinh"
                      />
                    </Form.Group>
                  </Col>

                  {/* Address (no change) */}
                  <Col md={6}>
                    <Form.Group controlId="address">
                      <Form.Label>Địa chỉ</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {/* Skills */}
                  <Col md={6}>
                    <Form.Group controlId="skills">
                      <Form.Label>Kỹ năng</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập các kỹ năng"
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
        ) : (
          <Alert variant="info">
            Bạn cần đăng nhập để chỉnh sửa hồ sơ cá nhân.
          </Alert>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CandidateProfile;
