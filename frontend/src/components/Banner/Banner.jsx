import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Row } from 'antd';
import './banner.css'
export const Banner = ({ images = [] }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="banner">
                <Slider {...settings}>
                    {images.map((src, index) => (
                        <div key={index}>
                            <img
                                src={src}
                                alt={`banner-${index}`}
                            />
                        </div>
                    ))}
                </Slider>
        </section>
    );
};
