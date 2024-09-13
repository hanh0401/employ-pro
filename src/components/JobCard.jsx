import React, { useState, useEffect } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { APIClient } from "../backend/api.ts"; // Import APIClient
import './JobCard.css';

const JobCard = ({ searchCriteria }) => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]); // State để lưu thông tin các công ty
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api_client = new APIClient();
    
    // Lấy danh sách công việc và công ty từ API
    const fetchData = async () => {
      try {
        const [jobsResponse, companiesResponse] = await Promise.all([
          api_client.getJobs(),
          api_client.getCompanies()
        ]);

        if (jobsResponse.success && companiesResponse.success) {
          setJobs(jobsResponse.data); // Lưu danh sách công việc
          setCompanies(companiesResponse.data); // Lưu danh sách công ty
        } else {
          setError('Failed to fetch jobs or companies');
        }
      } catch (err) {
        setError('An error occurred while fetching jobs or companies');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Tìm tên công ty dựa vào job.company (ID của công ty)
  const getCompanyName = (companyId) => {
    const company = companies.find((comp) => comp.id === companyId);
    return company ? company.name : 'Không xác định';
  };

  // Filter jobs based on search criteria
  const filteredJobs = jobs.filter((job) => {
    const { searchTerm, salaryMin, workingForm, minYearOfExp } = searchCriteria;

    const matchesSearchTerm = !searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSalary = !salaryMin || job.salary_min >= parseInt(salaryMin, 10);
    const matchesWorkingForm = !workingForm || job.working_form === workingForm;
    const matchesYearsExp = !minYearOfExp || job.min_year_of_exp >= parseInt(minYearOfExp, 10);

    return matchesSearchTerm && matchesSalary && matchesWorkingForm && matchesYearsExp;
  });

  if (loading) return <Spinner animation="border" />;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      {filteredJobs.map((job) => (
        <Card className="mb-3" style={{ margin: '15px' }} key={job.id}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <strong>Tên công ty: </strong>{getCompanyName(job.company)} {/* Hiển thị tên công ty */}
            </Card.Subtitle>
            <Card.Text>{job.working_form}</Card.Text>
            <Card.Text><strong>Kinh nghiệm: </strong>{job.min_year_of_exp} năm </Card.Text>
            <Card.Text><strong>Lương: </strong> {job.salary_min} $ - {job.salary_max} $</Card.Text>
            <Button className="btn" href={`/jobs/${job.id}`}>Xem chi tiết</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default JobCard;
