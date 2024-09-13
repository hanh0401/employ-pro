import React, { useState } from 'react';
import EHeader from '../../components/EHeader.jsx';
import Footer from '../../components/Footer.jsx';
import JobCard from '../../components/JobCard.jsx';

const EmployerHome = () => {
  const [searchResults, setSearchResults] = useState({
    keyword: '',
    salary_min: 0,
    working_form: '',
    min_year_of_exp: 0
  });
  return <>
    <div>
      <EHeader />
      <JobCard searchCriteria={searchResults}/>
      <Footer />
    </div>
  </>
};

export default EmployerHome;