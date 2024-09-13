import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
// import { APIClient } from '../backend/api.ts'; // Import APIClient
import './CSearch.css'; // Custom CSS for styling the search component

const CSearch = ({ onSearch }) => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [workingForm, setWorkingForm] = useState('');
  const [minYearOfExp, setMinYearOfExp] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');

  // Reset function to clear the form
  const handleReset = () => {
    setSearchTerm('');
    setSalaryMin('');
    setWorkingForm('');
    setMinYearOfExp('');
    setAdvancedSearch(false);
    onSearch('');
  };

  // Function to handle the search and make the API call
  const handleSearch = () => {
    onSearch({ searchTerm, salaryMin, workingForm, minYearOfExp})
  };

  return (
    <>
      <div className="search-background" style={{ backgroundImage: 'url(/public/bg1.jpg)' }}>
        <div className="search-box p-4">
          <h5>Đón lấy cơ hội thành công</h5>
          <h3><strong>26,867 cơ hội nghề nghiệp</strong></h3>

          {/* Search Box */}
          <Form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <Row className="align-items-center">
              <Col md={8}>
                <Form.Group controlId="formSearch">
                  <Form.Control
                    type="text"
                    placeholder="Từ khóa tên công việc"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="light" onClick={handleReset}>
                  <i className="fas fa-sync"></i> Reset
                </Button>
              </Col>
            </Row>

            {/* Advanced Search Section */}
            {advancedSearch && (
              <div className="mt-3">
                <Row>
                  <Col md={4}>
                    <Form.Group controlId="formSalaryMin">
                      <Form.Label>Lương tối thiểu</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Lương tối thiểu"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formWorkingForm">
                      <Form.Label>Hình thức công việc</Form.Label>
                      <Form.Select value={workingForm} onChange={(e) => setWorkingForm(e.target.value)}>
                        <option value="">Chon hình thức</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formMinYearsExp">
                      <Form.Label>Kinh nghiệm (năm)</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Kinh nghiệm"
                        value={minYearOfExp}
                        onChange={(e) => setMinYearOfExp(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {/* Advanced Search Toggle */}
            <div className="mt-3">
              <Button
                variant="link"
                onClick={() => setAdvancedSearch(!advancedSearch)}
              >
                {advancedSearch ? 'Thu gọn' : 'Tìm kiếm nâng cao'}
              </Button>
            </div>

            <Button variant="success" className="w-100 mt-2" onClick={handleSearch}>TÌM VIỆC NGAY</Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CSearch;
