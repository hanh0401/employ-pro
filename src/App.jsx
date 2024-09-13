import { Outlet } from 'react-router-dom'
import Login from './pages/Login.jsx'
import CandidateHome from './pages/forCandidates/Home.jsx'
import EmployerHome from './pages/forEmployers/Home.jsx'

function App() {
  return (
    <>
      <CandidateHome />
      {/* <Login /> */}
      <Outlet />
    </>
  )
}

export default App
