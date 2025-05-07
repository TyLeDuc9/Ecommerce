import React from "react";
import "./footer.css";
import pay1 from "../../assets/images/payments/pay1.png";
import pay2 from "../../assets/images/payments/pay2.png";
import pay3 from "../../assets/images/payments/pay3.png";
import shipped1 from "../../assets/images/shipped/shipped1.png";
import shipped2 from "../../assets/images/shipped/shipped2.png";
import shipped3 from "../../assets/images/shipped/shipped3.png";
import download1 from "../../assets/images/download/download1.png";
import download2 from "../../assets/images/download/download2.png";
import qr1 from "../../assets/images/download/qr1.png";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>DỊCH VỤ KHÁCH HÀNG</h4>
          <ul>
            <li>
              <a href="/help">Trung Tâm Trợ Giúp</a>
            </li>
            <li>
              <a href="/blog">Shopee Blog</a>
            </li>
            <li>
              <a href="/buy-guide">Hướng Dẫn Mua Hàng</a>
            </li>
            <li>
              <a href="/sell-guide">Hướng Dẫn Bán Hàng</a>
            </li>
            <li>
              <a href="/shopeepay">Ví ShopeePay</a>
            </li>
            <li>
              <a href="/shopee-xu">Shopee Xu</a>
            </li>
            <li>
              <a href="/orders">Đơn Hàng</a>
            </li>
            <li>
              <a href="/returns">Trả Hàng/Hoàn Tiền</a>
            </li>
            <li>
              <a href="/contact">Liên Hệ Shopee</a>
            </li>
            <li>
              <a href="/warranty">Chính Sách Bảo Hành</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>SHOPEE VIỆT NAM</h4>
          <ul>
            <li>
              <a href="/about">Về Shopee</a>
            </li>
            <li>
              <a href="/careers">Tuyển Dụng</a>
            </li>
            <li>
              <a href="/terms">Điều Khoản Shopee</a>
            </li>
            <li>
              <a href="/privacy">Chính Sách Bảo Mật</a>
            </li>
            <li>
              <a href="/mall">Shopee Mall</a>
            </li>
            <li>
              <a href="/seller-channel">Kênh Người Bán</a>
            </li>
            <li>
              <a href="/flash-sale">Flash Sale</a>
            </li>
            <li>
              <a href="/affiliate">Tiếp Thị Liên Kết</a>
            </li>
            <li>
              <a href="/media-contact">Liên Hệ Truyền Thông</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>THANH TOÁN</h4>
          <div className="payment-logos">
            {/* Thêm các logo thanh toán */}
            <img src={pay1} alt="Logo 1" />
            <img src={pay2} alt="Logo 2" />
            <img src={pay3} alt="Logo 3" />
          </div>
          <h4>ĐƠN VỊ VẬN CHUYỂN</h4>
          <div className="shipping-logos">
            {/* Thêm các logo vận chuyển */}
            <img src={shipped1} alt="Logo 1" />
            <img src={shipped2} alt="Logo 2" />
            <img src={shipped3} alt="Logo 3" />
          </div>
        </div>
        <div className="footer-section">
          <h4>THEO DÕI SHOPEE</h4>
          <div className="social-logos">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                alt="Facebook"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                alt="LinkedIn"
              />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>TẢI ỨNG DỤNG SHOPEE</h4>
          <div className="app-download">
            <img src={qr1} alt="QR Code" />
            <div className="app-links">
              <img src={download1} alt="App 1" />
              <img src={download2} alt="App 2" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Shopee. Tất cả các quyền được bảo lưu.</p>
        <p>Quốc gia & Khu vực: Việt Nam</p>
      </div>
    </footer>
  );
};
