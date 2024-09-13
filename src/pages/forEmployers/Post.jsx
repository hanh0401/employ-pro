import EHeader from "../../components/EHeader.jsx";
import Footer from "../../components/Footer.jsx";
import axious from '../../backend/axios.jsx'

import { Card, Button, Form, Alert, Modal, Breadcrumb } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios, { Axios } from "axios";
import { useState } from "react";
import { Link } from 'react-router-dom';

const Post = () => {
const [hasCreatedJob, setHasCreatedJob] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [jobData, setJobData] = useState({
      position: '',
      description: '',
      requirements: '',
      salary: '',
      location: ''
  });
  const [showAlert, setShowAlert] = useState(false) // Trạng thái để hiển thị thông báo
  const [alertMessage, setAlertMessage] = useState('');  // Thông báo nội dung

  const handleCreateNewJob = () => {
      setShowModal(true);
  };

  // Xử lý khi form được submit
  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          // Gọi API để lưu tin tuyển dụng vào hệ thống
          const response = await axios.post('https://your-backend-api.com/api/job/', jobData);
          
          // Thêm tin tuyển dụng đã lưu vào danh sách hiển thị
          setJobList([...jobList, response.data]);

          // Xóa form và hiển thị tin tuyển dụng đã tạo
          setHasCreatedJob(true); // Khi tạo xong, trạng thái chuyển thành đã có tin tuyển dụng
          setShowModal(false); // Ẩn form sau khi tạo tin tuyển dụng
          
          // Reset form data
          setJobData({
              position: '',
              description: '',
              requirements: '',
              salary: '',
              location: ''
          });

          // Hiển thị thông báo lưu thành công
          setAlertMessage('Lưu tin tuyển dụng thành công!');
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);  // Ẩn thông báo sau 3 giây

      } catch (error) {
          // Xử lý lỗi nếu API không thành công
          setAlertMessage('Đã xảy ra lỗi khi lưu tin tuyển dụng. Vui lòng thử lại.');
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);  // Ẩn thông báo sau 3 giây
          console.error("Error saving job:", error);
      }
  };

  // Xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
      const { name, value } = e.target;
      setJobData({ ...jobData, [name]: value });
  };
  return <>
    <EHeader />
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/employers/Home" }}>
            Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quản lý tin tuyển dụng</Breadcrumb.Item>
      </Breadcrumb>
      <h2>Trang Quản Lý Tin Tuyển Dụng</h2>
        <div className="d-flex justify-content-center mt-4">
            <Card style={{ width: '30rem', textAlign: 'center' }}>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <Card.Title>Tin Tuyển Dụng Trên TLU-JOB</Card.Title>
                        <Button variant="success" className="px-4" onClick={handleCreateNewJob}>
                        + Tạo mới
                        </Button>
                    </div>

                    {/* Hiển thị thông báo */}
                    {showAlert && <Alert variant="success">{alertMessage}</Alert>}
                    
                    {/* Hiển thị danh sách tin tuyển dụng nếu đã có */}
                    {hasCreatedJob && jobList.length > 0 ? (
                        <div>
                            {jobList.map((job, index) => (
                                <div key={index} className="mb-3 text-left">
                                    <h5>Vị trí: {job.position}</h5>
                                    <p>Mô tả: {job.description}</p>
                                    <p>Yêu cầu: {job.requirements}</p>
                                    <p>Mức lương: {job.salary}</p>
                                    <p>Địa điểm: {job.location}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <Card.Text className="mt-3">Bạn chưa tạo tin tuyển dụng nào</Card.Text>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {/* Hiển thị form tạo tin tuyển dụng nếu nhấn "Tạo mới" */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Tin Tuyển Dụng Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="position" className="mt-3">
                        <Form.Label>Vị trí tuyển dụng</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={jobData.position}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="description" className="mt-3">
                        <Form.Label>Mô tả công việc</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="requirements" className="mt-3">
                        <Form.Label>Yêu cầu ứng viên</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="requirements"
                            value={jobData.requirements}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="salary" className="mt-3">
                        <Form.Label>Mức lương</Form.Label>
                        <Form.Control
                            type="text"
                            name="salary"
                            value={jobData.salary}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Form.Group controlId="location" className="mt-3">
                        <Form.Label>Địa điểm làm việc</Form.Label>
                        <Form.Control
                            type="text"
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>
                        <Button variant="primary" className="mt-4" type="submit">
                        Lưu Tin Tuyển Dụng
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
      <Footer />
  </>
};

export default Post;