import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import CandidateHome from './pages/forCandidates/Home.jsx'
import EmployerHome from './pages/forEmployers/Home.jsx'
import Register from './pages/Register.jsx'
import CV from './pages/forCandidates/CV.jsx'
import Post from './pages/forEmployers/Post.jsx'
import Company from './pages/forEmployers/Company.jsx'
import CandidateProfile from './pages/forCandidates/Profile.jsx'
import CFeedback from './pages/forCandidates/Feedback.jsx'
import EFeedback from './pages/forEmployers/Feedback.jsx'
import JobDetail from './pages/forCandidates/JobDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/candidates/Home",
    element: <CandidateHome />
  },
  {
    path: "/employers/Home",
    element: <EmployerHome />
  },
  {
    path: "/candidates/CV",
    element: <CV />
  },
  {
    path: "/jobs/:id",
    element: <JobDetail />
  },
  {
    path: "/candidates/Profile",
    element: <CandidateProfile />
  },
  {
    path: "/candidates/Feedback",
    element: <CFeedback />
  },
  {
    path: "/employers/post",
    element: <Post />
  },
  {
    path: "/employers/company",
    element: <Company />
  },
  {
    path: "/employers/Feedback",
    element: <EFeedback />
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {/* <CartProvider> */}
         <RouterProvider router={router} />
     {/* </CartProvider> */}
  </React.StrictMode>,
)


