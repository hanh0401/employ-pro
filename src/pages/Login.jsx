import axios from "../backend/axios.jsx";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import { APIClient } from "../backend/api.ts"
import './Login.css';
import Footer from "../components/Footer.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [userRole, setUserRole] = useState('candidate');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const api_client = new APIClient(); // Tạo API Client

    // Xử lý thay đổi khi nhập thông tin đăng nhập
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý khi nhấn đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            // Đối với API khác đăng nhập/ký thì trước khi gọi thêm dòng sau
            // api_client.setAuthToken("ma-token-cua-nguoi-dung")
            // Gọi API đăng nhập
            const response = await api_client.login(formData);
            console.log(response);
            // Kiểm tra phản hồi từ server
            if (response.success) {
                console.log(response);
                // Lưu token vào localStorage hoặc state tùy ý
                localStorage.setItem('authToken', response.data.access);
                api_client.setAuthToken(response.data.access);
                const userProfile = await api_client.getProfile();
                console.log(userProfile);
                if(userProfile){
                    localStorage.setItem('userProfile', JSON.stringify(userProfile.data));
                }

                
                // Điều hướng đến trang tương ứng dựa trên vai trò
                if (userRole === 'candidate') {
                    navigate('/candidates/Home');
                } else if (userRole === 'employer') {
                    navigate('/employers/Home');
                }
            } else {
                // Hiển thị lỗi nếu không nhận được token
                
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
            }
        } catch (err) {
            // Hiển thị lỗi nếu có lỗi xảy ra từ server
            setError('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.');
        }
    };
    return <>
        <div className="login-container">
            <div className="login-left">
                <img src="/public/background-login.png" alt="Login Art" className="login-image"/>
            </div>
            <div className="login-right">
                <h2 className="login-title">Đăng nhập</h2>
                <p className="login-subtitle">Quý khách sử dụng thông tin tài khoản đã đăng ký để đăng nhập vào TLJOB.vn</p>
                {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}
                <label htmlFor="">
                    <input 
                        type="radio" 
                        name="userRole" 
                        value="candidate" 
                        checked={userRole === 'candidate'} 
                        onChange={() => setUserRole('candidate')}
                    /> Ứng viên
                </label>
                <label htmlFor="">
                    <input 
                        type="radio" 
                        name="userRole" 
                        value="employer" 
                        checked={userRole === 'employer'} 
                        onChange={() => setUserRole('employer')}
                    /> Nhà tuyển dụng
                </label>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className="login-input"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Mật khẩu" 
                        value={formData.password}
                        onChange={handleInputChange}
                        required 
                        className="login-input"
                    />
                    <button type="submit" className="login-button">Đăng nhập</button>
                </form>
                <p className="register-text">Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
            </div>            
        </div>
        <Footer />
    </>
};

export default Login;