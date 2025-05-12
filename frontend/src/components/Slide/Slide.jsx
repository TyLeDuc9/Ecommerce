import React from 'react';
import Slider from 'react-slick';
import { Col, Row } from 'antd';
import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';
import slider4 from '../../assets/images/slider4.jpg';
import slider5 from '../../assets/images/slider5.jpg';
import slider7 from '../../assets/images/slider7.jpg';
import './slide.css'
export const Slide = () => {
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
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    const slideImages = [slider1, slider2, slider3, slider4];
    const slideImageRight = [slider5, slider7];
    return (
        <section className='slide__box'>
            <Row className='slide__box-lists'>
                <Col span={16} className='slide__box-list'>
                    <div className='slide__left'>
                        <Slider {...settings}>
                            {slideImages.map((img, index) => (
                                <img src={img} alt={`Slide${index}`} key={index} />
                            ))}
                        </Slider>
                    </div>
                </Col>

                <Col span={8} className='slide__box-list'>
                <div className='slide__right'>
                 {slideImageRight.map((item, index) => (
                     <img src={item} key={index} alt={`Slide${index}`} />
                 ))}
             </div>
                </Col>
            </Row>
        </section>


















        // <section className='slide__box d-flex justify-content-between'>
        //     <div className='slide__left'>
        //         <Slider {...settings}>
        //             {slideImages.map((img, index) => (
        //                 <img src={img} alt={`Slide${index}`} key={index} />
        //             ))}
        //         </Slider>
        //     </div>
        //     <div className='slide__right'>
        //         {slideImageRight.map((item, index) => (
        //             <img src={item} key={index} alt={`Slide${index}`} />
        //         ))}
        //     </div>
        // </section>
    );
};
