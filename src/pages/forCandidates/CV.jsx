// import React, { useEffect, useState } from "react";
// import CHeader from "../../components/CHeader.jsx";
// import Footer from "../../components/Footer.jsx";
// import { Card, Button, Form, Alert, Modal, Breadcrumb } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import './CV.css'
// import axios from "axios";

// const CV = () => {
//   const [hasCreatedCV, setHasCreatedCV] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [cvList, setCvList] = useState([]);
//   const [selectedCV, setSelectedCV] = useState(null);
//   const [cvData, setCvData] = useState({
//     title: "",
//     attachment: "",
//     // id: false,
//     // user: "",
//   });
//   const [showAlert, setShowAlert] = useState(false); // Trạng thái để hiển thị thông báo
//   const [attachmentFile, setAttachmentFile] = useState(null); // State to store the selected file

//   const fetchCVs = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/api/resumes/');
//       setCvList(response.data);
//     } catch (error) {
//       console.error("Error fetching CVs:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCVs();
//   }, []);

//   const handleCreateNewCV = () => {
//     setShowModal(true);
//   };

//   // Xử lý khi form được submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     api_client.setAuthToken(localStorage.getItem("authToken"));
//     cvData.user = JSON.parse(localStorage.getItem("userProfile")).id;

//     // If file is selected, upload it using FormData
//     if (attachmentFile) {
//       const formData = new FormData();
//       formData.append("title", cvData.title);
//       formData.append("user", cvData.user);
//       formData.append("attachment", attachmentFile); // Append the file here

//       try {
//         const response = await api_client.createResume(formData);
//         console.log(response);
//         setShowAlert(true);
//         setTimeout(() => setShowAlert(false), 3000); // Ẩn thông báo sau 3 giây
//         setHasCreatedCV(true);
//         setCvList([...cvList, response.data]); // Update CV list with new CV
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // Xóa form và hiển thị CV đã tạo
//     setShowModal(false); // Ẩn form sau khi tạo CV
//   };

//   // Xử lý thay đổi dữ liệu trong form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCvData({ ...cvData, [name]: value });
//   };

//   // Xử lý thay đổi file đính kèm
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setAttachmentFile(file); // Set the file to state
//   };

//   const fetchData = async () => {
//     try {
//       const resumes = await api_client.getResumes(); // Chờ kết quả từ API
//       return resumes;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     const authToken = localStorage.getItem("authToken");
//     console.log(authToken);

//     if (authToken) {
//       api_client.setAuthToken(authToken);
//       const fetchDataAsync = async () => {
//         const data = await fetchData();
//         console.log(data);
//         setCvList(data?.data);
//       };

//       fetchDataAsync();
//     }
//   }, []);

//   return (
//     <>
//       <CHeader />
//       <Breadcrumb>
//         <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
//           Trang chủ
//         </Breadcrumb.Item>
//         <Breadcrumb.Item active>Quản lý CV</Breadcrumb.Item>
//       </Breadcrumb>
//       <div className="cv-container">
//         <div className="cv header">
//           <h2>Trang CV</h2> 
//         </div>
//         <div className="cv-content">
//           <Card className="cv-card">
//             <Card.Body>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <Card.Title>CV đã tạo trên TLU-JOB</Card.Title>
//                 <Button
//                   variant="primary"
//                   className="btn-create-cv"
//                   onClick={handleCreateNewCV}
//                 >
//                   + Tạo mới
//                 </Button>
//               </div>

//               {/* Hiển thị thông báo thành công */}
//               {showAlert && <Alert variant="success">Lưu CV thành công!</Alert>}

//               {/* Hiển thị danh sách CV nếu đã có */}
//               {cvList?.length > 0 ? (
//                 <div>
//                   {cvList?.map((cv, index) => (
//                     <div key={index} className="cv-item">
//                       <h5>{cv.fullName}</h5>
//                       <p>title: {cv.title}</p>
//                       <Card.Img
//                         variant="top"
//                         src={cv.attachment}
//                         alt="CV image"
//                         style={{ maxWidth: "100px", margin: "auto" }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div>
//                   <Card.Text className="no-cv-text">Bạn chưa tạo CV nào</Card.Text>
//                 </div>
//               )}
//             </Card.Body>
//           </Card>

//           {/* Hiển thị form tạo CV nếu nhấn "Tạo mới" */}
//           <Modal show={showModal} onHide={() => setShowModal(false)}>
//             <Modal.Header closeButton>
//               <Modal.Title>Tạo CV mới</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="title" className="mt-3">
//                   <Form.Label>Tiêu đề</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="title"
//                     value={cvData.title} // Giá trị từ state
//                     onChange={handleChange} // Hàm xử lý khi người dùng thay đổi input
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group controlId="attachment" className="mt-3">
//                   <Form.Label>Đính kèm (File)</Form.Label>
//                   <Form.Control
//                     type="file"
//                     name="attachment"
//                     onChange={handleFileChange} // Hàm xử lý khi người dùng chọn file
//                     required
//                   />
//                 </Form.Group>
//                 <Button variant="primary" className="mt-4" type="submit">
//                   Lưu CV
//                 </Button>
//               </Form>
//             </Modal.Body>
//           </Modal>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default CV;

import React, { useEffect, useState } from "react";
import CHeader from "../../components/CHeader.jsx";
import Footer from "../../components/Footer.jsx";
import { Card, Button, Modal, Breadcrumb, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import './CV.css';

const CV = () => {
  const [cvList, setCvList] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null); // State to store the selected CV
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isNewCV, setIsNewCV] = useState(false); // State to check if it's a new CV creation
  const [formData, setFormData] = useState({ title: "", file: null }); // State for form data
  const [showAlert, setShowAlert] = useState(false); // Alert for successful creation

  // Fetch CV list on component mount
  const fetchCVs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/resumes/');
      setCvList(response.data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  // Open modal for viewing/editing/creating CV
  const handleCVClick = (cv) => {
    if (cv) {
      setSelectedCV(cv);
      setFormData({ title: cv.title, file: null }); // Reset form data for editing
      setIsNewCV(false); // Editing an existing CV
    } else {
      setFormData({ title: "", file: null }); // Reset form data for creating new CV
      setIsNewCV(true); // Creating a new CV
    }
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCV(null);
  };

  // Handle file change for upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle form submission for editing/creating the CV
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, file } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append("title", title);
    if (file) formDataToSend.append("file", file);

    try {
      if (isNewCV) {
        // Create a new CV
        await axios.post(`http://127.0.0.1:8000/api/resumes/`, formDataToSend);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Auto-hide alert
      } else {
        // Edit the selected CV
        await axios.put(`http://127.0.0.1:8000/api/resumes/${selectedCV.id}/`, formDataToSend);
      }
      fetchCVs(); // Refresh CV list after updating
      handleCloseModal();
    } catch (error) {
      console.error("Error submitting CV:", error);
    }
  };

  // Delete the selected CV
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/resumes/${selectedCV.id}/`);
      fetchCVs(); // Refresh CV list after deletion
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

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
        <div className="cv-header">
          <h2>Danh sách CV đã tạo</h2>
        </div>
        <div className="cv-content">
          <Card className="cv-card">
            <Card.Body>
              {/* Show alert after successful CV creation */}
              {showAlert && <Alert variant="success">CV đã được tạo thành công!</Alert>}

              {cvList.length > 0 ? (
                <ul>
                  {cvList.map((cv) => (
                    <li key={cv.id}>
                      <Button onClick={() => handleCVClick(cv)}>
                        {cv.title || `CV #${cv.id}`}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Bạn chưa tạo CV nào.</p>
              )}
            </Card.Body>
          </Card>
          {/* Button to create a new CV */}
          <div className="create-new-cv">
            <Button variant="primary" onClick={() => handleCVClick(null)}>
              + Tạo mới
            </Button>
          </div>
        </div>

        {/* Modal for viewing/editing/creating CV */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isNewCV ? "Tạo CV mới" : "Chỉnh sửa CV"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="file" className="mt-3">
                <Form.Label>Đính kèm (File)</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} required={isNewCV} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                {isNewCV ? "Tạo CV" : "Lưu thay đổi"}
              </Button>
              {!isNewCV && (
                <Button variant="danger" onClick={handleDelete} className="mt-3 ms-3">
                  Xóa CV
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default CV;
