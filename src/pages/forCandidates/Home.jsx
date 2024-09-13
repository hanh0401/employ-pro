import React, { useState, useEffect } from 'react';
import CHeader from '../../components/CHeader.jsx';
import CSearch from '../../components/CSearch.jsx';
import Footer from '../../components/Footer.jsx';
import JobCard from '../../components/JobCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';
// import { APICli} from '../../backend/axios.jsx'

const CandidateHome = () => {
  const [searchResults, setSearchResults] = useState({
    keyword: '',
    salary_min: 0,
    working_form: '',
    min_year_of_exp: 0
  });
  return <>
    <div>
      <CHeader />
      <CSearch onSearch={(criteria) => setSearchResults(criteria)}/>
      <JobCard searchCriteria={searchResults}/>
      <Footer />
    </div>
  </>
};

export default CandidateHome;