import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APIClient } from '../../backend/api.ts'; // Import APIClient
import CHeader from '../../components/CHeader.jsx';
import Footer from '../../components/Footer.jsx';
import './JobDetail.css';
import { Breadcrumb } from 'react-bootstrap';

const JobDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [job, setJob] = useState(null); // State để lưu thông tin công việc
  const [company, setCompany] = useState(null); // State để lưu thông tin công ty
  const [skills, setSkills] = useState([]); // State để lưu thông tin các kỹ năng
  const [category, setCategory] = useState(null); // State để lưu thông tin phân loại công việc
  const [resumes, setResumes] = useState([]); // State để lưu danh sách CV
  const [showModal, setShowModal] = useState(false); // State để điều khiển cửa sổ CV
  const [error, setError] = useState(null); // State để lưu thông tin lỗi

  useEffect(() => {
    const api_client = new APIClient();

    // Hàm lấy thông tin công việc từ API dựa trên id
    const fetchJobDetails = async () => {
      try {
        const jobResponse = await api_client.getJob(id); // Giả sử API lấy thông tin công việc
        if (jobResponse.success) {
          const jobData = jobResponse.data;
          setJob(jobData); // Lưu thông tin công việc

          // Gọi API để lấy thông tin công ty
          const companyResponse = await api_client.getCompany(jobData.company);
          if (companyResponse.success) {
            setCompany(companyResponse.data); // Lưu thông tin công ty
          }

          // Gọi API để lấy thông tin phân loại công việc
          const categoryResponse = await api_client.getJobCategory(jobData.category);
          if (categoryResponse.success) {
            setCategory(categoryResponse.data); // Lưu thông tin phân loại công việc
          }

          // Gọi API để lấy thông tin kỹ năng
          const skillsResponse = await Promise.all(
            jobData.skills.map((skillId) => api_client.getSkill(skillId))
          );
          const fetchedSkills = skillsResponse
            .filter((response) => response.success)
            .map((response) => response.data);
          setSkills(fetchedSkills); // Lưu thông tin kỹ năng
        } else {
          setError("Failed to fetch job details.");
        }
      } catch (error) {
        setError("Error fetching job details.");
        console.error("Error fetching job details:", error);
      }
    };

    // const fetchResumes = async () => {
    //   try {
    //     const response = await api_client.getResumes(); // Giả sử API lấy danh sách CV
    //     if (response.success) {
    //       setResumes(response.data); // Lưu danh sách CV vào state
    //     } else {
    //       setError("Failed to fetch resumes.");
    //     }
    //   } catch (error) {
    //     setError("Error fetching resumes.");
    //     console.error("Error fetching resumes:", error);
    //   }
    // };

    const fetchResumes = async () => {
      try {
        const resumes = await api_client.getResumes(); // Chờ kết quả từ API
        return resumes;
      } catch (error) {
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
      const response = await api_client.applyForJob(id, { cvId });
      if (response.success) {
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
              <p><strong>Phân loại:</strong> {category ? category.name : 'Đang tải...'}</p> {/* Hiển thị tên phân loại */}
            </div>
            <div>
              <p><strong>Mức lương:</strong> {job.salary_min} $ - {job.salary_max} $</p>
              <p><strong>Kinh nghiệm:</strong> {job.min_year_of_exp} năm</p>
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
          <h5>Kinh nghiệm</h5>
          <p>{job.min_year_of_exp} năm</p>
          <h5>Phân loại</h5>
          <p>{category ? category.name : 'Đang tải...'}</p> {/* Hiển thị tên phân loại */}
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

