import React from 'react'
import Typography from '@mui/material/Typography'
import { Outlet, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import CategoriesComp from './CategoriesComp'
import Footer from './Footer'



const Layout = () => {

    const {app}=useParams()
    return (
        <div>
            <NavBar app={app}/>
            <CategoriesComp/>
            <div className="content">
                <Outlet />
            </div>
            <Footer app={app}/>
        </div>
    )
}

export default Layout
