import logo from '../../assets/images/logo/logo.png';
import { NavLink, Link } from 'react-router-dom';
import './register.css';

export const Register = () => {

  return (
    <div className='register'>
      <header className='register__header'>
        <div className='register__header-box'>
          <div className='register__header-logo'>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
            <h3>Đăng ký</h3>
          </div>
          <a href="#">Bạn cần giúp đỡ?</a>
        </div>
      </header>


      <div className='register__container'>
        <div className='register-logoleft'>
          <img src={logo} alt="Logo" />
          <p>Nền tảng thương mại điển tử hàng đầu Đông Nam Á</p>
        </div>
        <form>
          <span>Đăng ký</span>
          <div className='form-group'>
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Số điện thoại" />
          </div>
          <button type="submit" className='btn-submit'>Tiếp theo</button>
          <div className="social-login">
            <button className="btn-facebook"><i class="fa-brands fa-facebook"></i>Facebook</button>
            <button className="btn-google"><i class="fa-brands fa-google"></i>Google</button>
          </div>
          <p className="terms">
            Bằng việc đăng kí, bạn đã đồng ý với <Link to="/terms">Shopee về Điều khoản sử dụng</Link> &amp;
            <Link to="/privacy-policy"> Chính sách bảo mật</Link>
          </p>
          <p className="already-account">
            Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
          </p>
        </form>
      </div>

    </div>
  );
};
