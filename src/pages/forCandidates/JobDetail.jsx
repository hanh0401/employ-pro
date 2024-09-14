import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CHeader from '../../components/CHeader.jsx';
import Footer from '../../components/Footer.jsx';
import './JobDetail.css';
import { Breadcrumb } from 'react-bootstrap';

const JobDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [job, setJob] = useState(null); // State để lưu thông tin công việc
  const [company, setCompany] = useState(null); // State để lưu thông tin công ty
  const [resumes, setResumes] = useState([]); // State để lưu danh sách CV
  const [showModal, setShowModal] = useState(false); // State để điều khiển cửa sổ CV
  const [error, setError] = useState(null); // State để lưu thông tin lỗi

  useEffect(() => {

    // Hàm lấy thông tin công việc từ API dựa trên id
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await axios.get('http://127.0.0.1:8000/api/jobs/${id}/');
          const jobData = jobResponse.data;
          setJob(jobData); // Lưu thông tin công việc

          // Gọi API để lấy thông tin công ty
          const companyResponse = await axios.get('http://127.0.0.1:8000/api/employer/${jobData.company}/');
          setCompany(companyResponse.data);
      } catch (error) {
        setError("Lỗi tải thông tin công việc");
        console.error("Error fetching job details:", error);
      }
    };

    const fetchResumes = async () => {
      try {
        const resumes = await axios.get('http://127.0.0.1:8000/api/resumes/'); // Chờ kết quả từ API
        setResumes(response.data);
      } catch (error) {
        setError("Lỗi tải dữ liệu CV")
        console.error("Error fetching data:", error);
      }
    };

    fetchJobDetails();
    fetchResumes
  }, [id]);

  // Hàm mở cửa sổ ứng tuyển
  const handleApplyClick = () => {
    setShowModal(true);
  };

  // Hàm đóng cửa sổ ứng tuyển
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hàm gửi CV
  const handleSendCV = async (cvId) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api//applications/', {
        status: 'pending',
        date_applied: new Date().toISOString(),
        job: id,
        resume: cvId 
      });
      if (response.status === 200) {
        alert("Ứng tuyển thành công!");
        setShowModal(false);
      } else {
        alert("Ứng tuyển thất bại.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  // Hiển thị khi job chưa load xong
  if (!job && !error) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <>
      <CHeader />
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/candidates/Home" }}>
          Trang chủ
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Chi tiết công việc</Breadcrumb.Item>
      </Breadcrumb>

      <div className='container'>
        <div className='left-section'>
          <div className='job-info'>
            <div>
              <h2 className="job-title">{job.title}</h2>
              <h4>Công ty: {company ? company.name : 'Đang tải...'}</h4> {/* Hiển thị tên công ty */}
              {/* <p><strong>Phân loại:</strong> {category ? category.name : 'Đang tải...'}</p> Hiển thị tên phân loại */}
            </div>
            <div>
              <p><strong>Mức lương:</strong> {job.salary_min} $ - {job.salary_max} $</p>
              {/* <p><strong>Kinh nghiệm:</strong> {job.min_year_of_exp} năm</p> */}
              <p><strong>Kiểu công việc:</strong> {job.working_form}</p>
            </div>
          </div>
          <div className="job-description">
            <p><strong>Mô tả công việc:</strong> {job.description}</p>
            <p><strong>Kỹ năng:</strong> {skills.length > 0 ? skills.map(skill => skill.name).join(', ') : 'Đang tải...'}</p> {/* Hiển thị tên kỹ năng */}
            <p><strong>Yêu cầu:</strong> </p>
            <p><strong>Quyền lợi:</strong> </p>
          </div>
          <div>
            <button className='apply-btn' onClick={handleApplyClick}>
              Ứng tuyển
            </button>
            <p><strong>Ngày hết hạn:</strong> {new Date(job.expired_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className='right-section'>
          <h5>Tên công ty</h5>
          <p>{company ? company.name : 'Đang tải...'}</p> {/* Hiển thị tên công ty */}
          {/* <h5>Kinh nghiệm</h5>
          <p>{job.min_year_of_exp} năm</p> */}
          {/* <h5>Phân loại</h5>
          <p>{category ? category.name : 'Đang tải...'}</p> Hiển thị tên phân loại */}
        </div>
        {/* Modal chọn CV */}
        {showModal && (
          <div className="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Chọn CV để gửi</h5>
                  <button type="button" onClick={handleCloseModal}>X</button>
                </div>
                <div className="modal-body">
                  {resumes.length > 0 ? (
                    <ul>
                      {resumes.map((resume) => (
                        <li key={resume.id}>
                          <button onClick={() => handleSendCV(resume.id)}>
                            {resume.title || `CV #${resume.id}`} {/* Hiển thị tên CV hoặc ID */}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Bạn chưa có CV nào.</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={handleCloseModal}>Đóng</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default JobDetail;

