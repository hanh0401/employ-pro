import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, Modal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const EHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State để quản lý hiển thị modal
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
      setIsLoggedIn(false);
      setUserProfile(null);
      setShowLogoutModal(false); // Đóng modal sau khi đăng xuất
      navigate('/');
  }

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      setUserProfile(JSON.parse(userProfile));
      setIsLoggedIn(true)
    }
  }, []);

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
            <Nav.Link as={Link} to="/employers/company">Hồ sơ công ty</Nav.Link>
            <Nav.Link as={Link} to="/employers/post">Quản lý tin tuyển dụng</Nav.Link>
            <Nav.Link as={Link} to="/employers/Feedback">Phản hồi</Nav.Link>
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
        <Nav.Link as={Link} to="/candidates/Home" className="order-sm-3">
            Dành cho ứng viên
            {userProfile?.username && <div>{userProfile?.username}</div>}
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

export default EHeader;