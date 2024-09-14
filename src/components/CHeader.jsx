import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const CHeader = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Giả sử trạng thái đăng nhập
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
  
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        setUserProfile(JSON.parse(userProfile));
        setIsLoggedIn(true)
      }
      console.log(userProfile)
    }, []);

    const handleLogout = () => {
      localStorage.removeItem('userProfile');
      setIsLoggedIn(false); // Đặt lại trạng thái đăng xuất
      setUserProfile(null); // Xóa thông tin người dùng
      setShowLogoutModal(false);
      // Xử lý logic đăng xuất (xóa token, session, v.v.)
      navigate('/'); // Điều hướng về trang chủ
    };

    // Hiển thị modal xác nhận
    const handleLogoutClick = () => {
      setShowLogoutModal(true);
    };

    // Hủy đăng xuất, đóng modal
    const handleCloseModal = () => {
      setShowLogoutModal(false);
    };

  return <>
    <Navbar bg="white" expand="lg" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/" title="TLJOB" className="mx-auto order-sm-2">
          <img
            src="/public/TLJOB-Logo.png"
            alt="TL-JOB Logo"
            style={{ maxHeight: '40px' }}
          />
          
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="order-sm-1" />
        <Navbar.Collapse id="basic-navbar-nav" className="order-sm-2">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/candidates/Profile">Quản lý hồ sơ cá nhân</Nav.Link>
            <Nav.Link as={Link} to="/candidates/CV">Quản lý CV</Nav.Link>
            <Nav.Link as={Link} to="/candidates/Feedback">Phản hồi</Nav.Link>
            {!isLoggedIn ? ( 
                <>
                    <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                    <Nav.Link as={Link} to="/register">Đăng ký</Nav.Link>
                </>
            ) : (
                <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="/employers/Home" className="order-sm-3">
            Dành cho nhà tuyển dụng
            {userProfile?.username && <div>{userProfile.username}</div>}
        </Nav.Link>
        
      </Container>
    </Navbar>

    {/* Modal xác nhận đăng xuất */}
    <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận đăng xuất</Modal.Title>
      </Modal.Header>
      <Modal.Body>Bạn có chắc chắn muốn đăng xuất không?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Modal.Footer>
    </Modal>
  </>
};

export default CHeader;
