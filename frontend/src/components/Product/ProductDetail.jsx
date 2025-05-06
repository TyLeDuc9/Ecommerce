import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Button, Carousel } from "antd";
import axios from "axios";
import "./productDetail.css"; // Tạo file CSS riêng cho trang chi tiết

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4003/api/product/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) {
    return <div>Đang tải thông tin sản phẩm...</div>;
  }

  if (!product) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div className="product-detail">
      <Button className="back-button" onClick={() => navigate(-1)}>
        Quay lại
      </Button>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Carousel autoplay>
            {product.image.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`${product.name} - ảnh ${index + 1}`}
                  className="product-image"
                />
              </div>
            ))}
          </Carousel>
        </Col>

        <Col xs={24} md={12}>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-price">
              {product.price.toLocaleString("vi-VN")} đ
            </div>
            <div className="product-status">Trạng thái: {product.status}</div>
            <div className="product-description">
              <h3>Mô tả sản phẩm</h3>
              <p>{product.describe}</p>
            </div>

            <div className="product-actions">
              <Button type="primary" size="large">
                Thêm vào giỏ hàng
              </Button>
              <Button size="large">Mua ngay</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
