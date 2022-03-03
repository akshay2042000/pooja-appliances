import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CategoriesComp from './CategoriesComp'
import Footer from './Footer'



const Layout = () => {

    return (
        <div>
            <NavBar />
            <CategoriesComp/>
            <div className="content">
                <Outlet />
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
