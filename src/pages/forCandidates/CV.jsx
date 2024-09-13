import React, { useEffect, useState } from "react";
import CHeader from "../../components/CHeader.jsx";
import Footer from "../../components/Footer.jsx";
import { Card, Button, Form, Alert, Modal, Breadcrumb } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { APIClient } from "../../backend/api.ts";
import './CV.css'

const CV = () => {
  const api_client = new APIClient();
  const [hasCreatedCV, setHasCreatedCV] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cvList, setCvList] = useState([]);
  const [cvData, setCvData] = useState({
    title: "",
    attachment: "",
    id: false,
    user: "",
  });
  const [showAlert, setShowAlert] = useState(false); // Trạng thái để hiển thị thông báo
  const [attachmentFile, setAttachmentFile] = useState(null); // State to store the selected file

  const handleCreateNewCV = () => {
    setShowModal(true);
  };

  // Xử lý khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    api_client.setAuthToken(localStorage.getItem("authToken"));
    cvData.user = JSON.parse(localStorage.getItem("userProfile")).id;

    // If file is selected, upload it using FormData
    if (attachmentFile) {
      const formData = new FormData();
      formData.append("title", cvData.title);
      formData.append("user", cvData.user);
      formData.append("attachment", attachmentFile); // Append the file here

      try {
        const response = await api_client.createResume(formData);
        console.log(response);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Ẩn thông báo sau 3 giây
        setHasCreatedCV(true);
        setCvList([...cvList, response.data]); // Update CV list with new CV
      } catch (error) {
        console.log(error);
      }
    }
    // Xóa form và hiển thị CV đã tạo
    setShowModal(false); // Ẩn form sau khi tạo CV
  };

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCvData({ ...cvData, [name]: value });
  };

  // Xử lý thay đổi file đính kèm
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachmentFile(file); // Set the file to state
  };

  const fetchData = async () => {
    try {
      const resumes = await api_client.getResumes(); // Chờ kết quả từ API
      return resumes;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);

    if (authToken) {
      api_client.setAuthToken(authToken);
      const fetchDataAsync = async () => {
        const data = await fetchData();
        console.log(data);
        setCvList(data?.data);
      };

      fetchDataAsync();
    }
  }, []);

  return (
    <>
      <CHeader />
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý CV</Breadcrumb.Item>
      </Breadcrumb>
      <div className="cv-container">
        <div className="cv header">
          <h2>Trang CV</h2> 
        </div>
        <div className="cv-content">
          <Card className="cv-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title>CV đã tạo trên TLU-JOB</Card.Title>
                <Button
                  variant="primary"
                  className="btn-create-cv"
                  onClick={handleCreateNewCV}
                >
                  + Tạo mới
                </Button>
              </div>

              {/* Hiển thị thông báo thành công */}
              {showAlert && <Alert variant="success">Lưu CV thành công!</Alert>}

              {/* Hiển thị danh sách CV nếu đã có */}
              {cvList?.length > 0 ? (
                <div>
                  {cvList?.map((cv, index) => (
                    <div key={index} className="cv-item">
                      <h5>{cv.fullName}</h5>
                      <p>title: {cv.title}</p>
                      <Card.Img
                        variant="top"
                        src={cv.attachment}
                        alt="CV image"
                        style={{ maxWidth: "100px", margin: "auto" }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <Card.Text className="no-cv-text">Bạn chưa tạo CV nào</Card.Text>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Hiển thị form tạo CV nếu nhấn "Tạo mới" */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Tạo CV mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mt-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={cvData.title} // Giá trị từ state
                    onChange={handleChange} // Hàm xử lý khi người dùng thay đổi input
                    required
                  />
                </Form.Group>

                <Form.Group controlId="attachment" className="mt-3">
                  <Form.Label>Đính kèm (File)</Form.Label>
                  <Form.Control
                    type="file"
                    name="attachment"
                    onChange={handleFileChange} // Hàm xử lý khi người dùng chọn file
                    required
                  />
                </Form.Group>
                <Button variant="primary" className="mt-4" type="submit">
                  Lưu CV
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CV;
