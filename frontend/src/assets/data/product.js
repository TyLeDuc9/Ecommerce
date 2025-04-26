import product1 from '../images/product/product1.jpg'
import product2 from '../images/product/product2.jpg'
import product3 from '../images/product/product3.jpg'
import product4 from '../images/product/product4.jpg'
import product5 from '../images/product/product5.jpg'
import producdetails1 from '../images/productDetails/productdetails1.jpg';
import producdetails2 from '../images/productDetails/productdetails2.jpg';
import producdetails3 from '../images/productDetails/productdetails3.jpg';
import producdetails4 from '../images/productDetails/productdetails4.jpg';

const product = [
    {
        id: 1,
        name: "Áo Thun Cotton CATTEEN Nam Nữ chuẩn form - Hình Thêu Cao Cấp trẻ trung",
        original_price: 250000, 
        discounted_price: 199000, 
        discount_percent: 20,
        img: [
            product1, producdetails1, producdetails2, producdetails3, producdetails4
        ],
        category: "Thời trang nam",
        rating: 4,
        stock_quantity: 55,
    },
    {
        id: 2,
        name: "Áo Thun Cotton CATTEEN Nam Nữ chuẩn form - Hình Thêu Cao Cấp trẻ trung",
        original_price: 250000, 
        discounted_price: 199000, 
        discount_percent: 20,
        img: [
            product1, product2, product3, product4, product5
        ],
        category: "Thời trang nam",
        rating: 4,
        stock_quantity: 55,
    },
  
]


export default product;