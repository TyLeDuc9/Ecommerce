import React, { useState, useEffect } from "react";
import "./product.css";
import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../utils/toSlug";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";

export const Product = () => {
  const { addToCart, updateCartItem, removeFromCart } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4003/api/product/all"
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Đang tải sản phẩm...</div>;
  }

  return (
    <section className="product">
      <Row className="product__title">
        <h4>Gợi ý hôm nay</h4>
      </Row>
      <Row>
        <Col span={24}>
          <div className="product__list">
            {products.map((item) => (
              <div
                key={item._id}
                className="product__item"
                onClick={() =>
                  navigate(
                    `/product/${
                      item.categoryId
                        ? toSlug(item.categoryId.name)
                        : "uncategorized"
                    }/${item._id}`
                  )
                }
              >
                <div>
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="product__item-img"
                  />
                </div>
                <div className="product__item-info">
                  <p className="product__item-name">{item.name}</p>
                  <span className="product__item-price">
                    {item.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Button className="product__btn">Xem thêm</Button>
    </section>
  );
};
