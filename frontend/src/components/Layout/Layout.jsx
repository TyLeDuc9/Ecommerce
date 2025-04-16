import React from 'react'
import { Header } from '../Header/Header'
import Routers from '../../router/Routers'
import { Footer } from '../Footer/Footer'
export const Layout = () => {
    return (
        <>
            <Header />
            <Routers />
            <Footer />
        </>
    )
}
