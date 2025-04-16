import React from 'react'
import categoryData from '../../assets/data/category'
import './category.css'
export const Category = () => {
    return (
        <section className='category__container'>
            <h2>Danh Mục</h2>
            <div className='category__container-list'>
                {
                    categoryData.map((item) => (
                        <div key={item.id} className='category__container-item'>
                            <div className='category__container-img'>
                                <img src={item.img} />
                            </div>
                            <span>{item.name}</span>
                        </div>

                    ))
                }
            </div>
        </section>
    )
}
