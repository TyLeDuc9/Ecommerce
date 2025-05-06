import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import "./category.css";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../../utils/toSlug";

export const Category = () => {
  const [categories, setCategories] = useState([]); // State để lưu dữ liệu danh mục
  const navigate = useNavigate();

  // Gọi API để lấy danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/category/all"
        ); // URL API
        setCategories(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };

    fetchCategories();
  }, []); // Chỉ gọi API một lần khi component được mount

  return (
    <section className="category">
      <h2>Danh Mục</h2>
      <Row>
        <Col span={24}>
          <div className="category__list">
            {categories.map((item) => {
              const path = toSlug(item.name);
              return (
                <div
                  key={item._id}
                  className="category__item"
                  onClick={() => navigate(`/product/${path}`)}
                >
                  <div className="category__item-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </section>
  );
};
