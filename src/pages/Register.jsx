import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { APIClient } from '../backend/api.ts';
import { ssrDynamicImportKey } from 'vite/runtime';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    // username: '',
    password: '',
    email: '',
    username: '',
    address:'',
    phone_number: '',
    confirmPassword: '',
    // userRole: 'candidates',
  })

  const [userRole, setUserRole] = useState('candidate');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const api_client = new APIClient();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    // Logic để xử lý đăng ký
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {

      const { confirmPassword, ...dataToSend } = formData;
      const response = await api_client.register(dataToSend);
      console.log(response);
      // Kiểm tra phản hồi từ server
      if (response.success) {
        // console.log('DL đến server:', dataToSend);
        // Lưu token vào localStorage hoặc state tùy ý
        // localStorage.setItem('authToken', response.data.token);

        // Điều hướng đến trang tương ứng dựa trên vai trò
        alert('Đăng ký thành công!');
        navigate('/login')
      } else {
          // Hiển thị lỗi nếu không nhận được token
          console.error('Lỗi khi đăng ký:', response);
          setError(`Đăng ký thất bại. Vui lòng kiểm tra lại thông tin. ${response.error.response.data.email[0] || response.error.response.data.email[0] }`);
      } 
    } catch (error) {
      // if (error.response && error.response.data) {
      //   // Hiển thị lỗi chi tiết từ backend
      //   setError(error.response.data.detail || 'Đăng ký thất bại. Hãy thử lại.');
      // } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      // }
    }
  };

  return (
    <div className='register-container'>
      <div className="register-left">
        <img src="/public/background-register.png" alt="Register Art" className="register-image" />
      </div>
      <div className='register-right'>

        <h2 className='register-title'>Đăng Ký Tài Khoản TLJOB</h2>
        <p className="register-subtitle">Quý khách sử dụng thông tin tài khoản này để đăng nhập vào TLJOB.vn</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="radio" 
            name="userRole" 
            value="candidates"
            checked={formData.role === 'candidates'} 
            onChange={handleRoleChange}
          /> Ứng viên
        </label>
        <label>
          <input 
            type="radio" 
            name="userRole" 
            value="employers" 
            checked={formData.role === 'employers'} 
            onChange={handleRoleChange}
          /> Nhà tuyển dụng
        </label>
          <input 
            type="text" 
            name='username'
            placeholder="Tên người dùng" 
            value={formData.username} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <input 
            type="email" 
            name='email'
            placeholder="Email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <input 
            type="text" 
            name="address"
            placeholder="Address" 
            value={formData.address} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <input 
            type="text" 
            name='phone_number'
            placeholder="Số điện thoại" 
            value={formData.phone_number} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <input 
            type="password" 
            name='password'
            placeholder="Mật khẩu" 
            value={formData.password} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <input 
            type="password" 
            name='confirmPassword'
            placeholder="Confirm Password" 
            value={formData.confirmPassword} 
            onChange={handleInputChange} 
            required 
            className="register-input"
          />
          <button type="submit" className='register-button'>Đăng Ký</button>
        </form>
        <p className="login-text">Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
      </div>
    </div>
  );
};

export default Register;
