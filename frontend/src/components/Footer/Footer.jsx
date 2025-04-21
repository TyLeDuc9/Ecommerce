import React from "react";
import "./footer.css";

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
            <img src="/path/to/logo1.png" alt="Logo 1" />
            <img src="/path/to/logo2.png" alt="Logo 2" />
            <img src="/path/to/logo3.png" alt="Logo 3" />
          </div>
        </div>
        <div className="footer-section">
          <h4>ĐƠN VỊ VẬN CHUYỂN</h4>
          <div className="shipping-logos">
            {/* Thêm các logo vận chuyển */}
            <img src="/path/to/logo1.png" alt="Logo 1" />
            <img src="/path/to/logo2.png" alt="Logo 2" />
            <img src="/path/to/logo3.png" alt="Logo 3" />
          </div>
        </div>
        <div className="footer-section">
          <h4>THEO DÕI SHOPEE</h4>
          <ul>
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://linkedin.com">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>TẢI ỨNG DỤNG SHOPEE</h4>
          <div className="app-download">
            <img src="/path/to/qr-code.png" alt="QR Code" />
            <div className="app-links">
              <img src="/path/to/app1.png" alt="App 1" />
              <img src="/path/to/app2.png" alt="App 2" />
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
