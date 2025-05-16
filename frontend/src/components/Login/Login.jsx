// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './login.css';
// import logo from '../../assets/images/logo/logo.png';

// export const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const togglePassword = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:4005/api/auth/login', formData);
//       const { token, user } = res.data;
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
//       navigate('/'); 
//     } catch (error) {
//       console.error('Lỗi đăng nhập:', error.response?.data?.message || error.message);
//       alert(error.response?.data?.message || 'Đăng nhập thất bại');
//     }
//   };

//   return (
//     <div className='login'>
//       <header className='login__header'>
//         <div className='login__header-box'>
//           <div className='login__header-logo'>
//             <Link to="/"><img src={logo} alt="Logo" /></Link>
//             <h3>Đăng nhập</h3>
//           </div>
//           <a href="#">Bạn cần giúp đỡ?</a>
//         </div>
//       </header>

//       <div className='login__container'>
//         <div className='login-logoleft'>
//           <img src={logo} alt="Logo" />
//           <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á</p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <span>Đăng nhập</span>
//           <div className='form-group'>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//             />

//             <div className="password-input-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Mật khẩu"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               <span className="toggle-password" onClick={togglePassword}>
//                 <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
//               </span>
//             </div>
//           </div>

//           <button type="submit" className='btn-submit'>Đăng nhập</button>

//           <div className='login__options'>
//             <span>Quên mật khẩu</span>
//             <span>Đăng nhập với SMS</span>
//           </div>

//           <div className="social-login">
//             <button type="button" className="btn-facebook"><i className="fa-brands fa-facebook"></i> Facebook</button>
//             <button type="button" className="btn-google"><i className="fa-brands fa-google"></i> Google</button>
//           </div>

//           <p className="no-account">
//             Bạn mới biết đến Shopee? <Link to="/register">Đăng ký</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import logo from '../../assets/images/logo/logo.png';
import { useAppContext } from '../../context/AppContext'; // ⬅️ Thêm dòng này

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { handleLogin } = useAppContext(); // ⬅️ Lấy hàm từ context

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4005/api/auth/login', formData);
      const { token, user } = res.data;

      handleLogin(user, token); // ⬅️ Dùng context để cập nhật user và token
      navigate('/');            // Chuyển trang sau khi cập nhật
    } catch (error) {
      console.error('Lỗi đăng nhập:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className='login'>
      <header className='login__header'>
        <div className='login__header-box'>
          <div className='login__header-logo'>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
            <h3>Đăng nhập</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>

      <div className='login__container'>
        <div className='login-logoleft'>
          <img src={logo} alt="Logo" />
          <p>Nền tảng thương mại điện tử hàng đầu Đông Nam Á</p>
        </div>

        <form onSubmit={handleSubmit}>
          <span>Đăng nhập</span>
          <div className='form-group'>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span className="toggle-password" onClick={togglePassword}>
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          <button type="submit" className='btn-submit'>Đăng nhập</button>

          <div className='login__options'>
            <span>Quên mật khẩu</span>
            <span>Đăng nhập với SMS</span>
          </div>

          <div className="social-login">
            <button type="button" className="btn-facebook"><i className="fa-brands fa-facebook"></i> Facebook</button>
            <button type="button" className="btn-google"><i className="fa-brands fa-google"></i> Google</button>
          </div>

          <p className="no-account">
            Bạn mới biết đến Shopee? <Link to="/register">Đăng ký</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
