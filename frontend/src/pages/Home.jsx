import React from 'react'
import { Header } from '../components/Header/Header'
import { Slide } from '../components/Slide/Slide'
import { Category } from '../components/Category/Category'
import { TopSearchProduct } from '../components/TopSearchProduct/TopSearchProduct'
import { ShopMall } from '../components/ShopMall/ShopMall'
import { Banner } from '../components/Banner/Banner'
import { Footer } from '../components/Footer/Footer'
import { Product } from '../components/Product/Product'


export const Home = () => {

  return (
    <>
      <Slide />
      <Category />
      <ShopMall />
      <TopSearchProduct />
      <Product />
    
    </>
  )
}