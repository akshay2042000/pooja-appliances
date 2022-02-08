import React, { useState, useEffect } from 'react'
import CarouselComp from '../components/CarouselComp'
import CategoriesHome from '../components/CategoriesHome'
import { Container, Paper } from '@mui/material'
import HomeCard from '../components/HomeCard'
import { Box } from '@mui/system'
import { Link, useParams } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux'

const HomePage = () => {

    const companyState = useSelector(state => state.companyState)

    return (
        <>

            <CarouselComp h={'60vh'} items={companyState.companies} isLoading={companyState.loading} isHome={true} />
            <CategoriesHome />
            <Container disableGutters={true}>
                <Paper sx={{ backgroundColor: 'primary.main', my: 6, padding: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap', px: 5 }}>
                        <Link to='products'>
                            <HomeCard heading={'Products'} />
                        </Link>
                        <HashLink smooth to="#categories">
                            <HomeCard heading={'Categories'} />
                        </HashLink>
                    </Box>
                </Paper>
            </Container>
        </>
    )
}

export default HomePage
