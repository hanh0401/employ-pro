import React, { useState } from 'react';
import axios from "../backend/axios"; // Cập nhật đường dẫn nếu cần
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Xử lý thay đổi khi nhập thông tin
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'newPassword') setNewPassword(value);
    };

    // Xử lý khi nhấn gửi
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/forgot-password/', {
                username,
                newPassword
            });

            if (response.data.success) {
                setMessage('Mật khẩu đã được thay đổi thành công!');
                setError(null);
                setTimeout(() => navigate('/login'), 2000); // Chuyển hướng sau 2 giây
            } else {
                setMessage(null);
                setError('Có lỗi xảy ra. Vui lòng kiểm tra lại.');
            }
        } catch (err) {
            setMessage(null);
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div>
            <h2>Quên mật khẩu</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={username}
                    onChange={handleInputChange}
                    required 
                />
                <input 
                    type="password" 
                    name="newPassword" 
                    placeholder="Mật khẩu mới" 
                    value={newPassword}
                    onChange={handleInputChange}
                    required 
                />
                <button type="submit">Cập nhật mật khẩu</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
