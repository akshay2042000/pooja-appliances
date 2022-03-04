import React from 'react'
import CarouselComp from '../components/CarouselComp'
import CategoriesHome from '../components/HomePage/CategoriesHome'
import { Container, Grid } from '@mui/material'
import HomeCard from '../components/HomePage/HomeCard'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux'
import FeaturedProducts from '../components/HomePage/FeaturedProducts'

const HomePage = () => {

    const companyState = useSelector(state => state.companyState)

    return (
        <>
            <CarouselComp h={'60vh'} items={companyState.companies} isLoading={companyState.loading} isHome={true} />
            <CategoriesHome />

            <FeaturedProducts />


            <Container disableGutters={true} sx={{ padding: 4, paddingTop: 0, mb: 6 }}>
                <Grid container sx={{ width: '100%' }} spacing={2}>

                    <Grid item sx={{ width: '100%', height: '100%' }} md={6} xs={12} >
                        <Link to='products' style={{ width: '100%', height: '100%' }}>
                            <HomeCard heading={'All Products'} />
                        </Link>
                    </Grid >

                    <Grid item sx={{ width: '100%' }} md={6} xs={12} >
                        <HashLink smooth to="#categories" style={{ width: '100%' }}>
                            <HomeCard heading={'Categories'} />
                        </HashLink>
                    </Grid >
                </Grid>
            </Container>
        </>
    )
}

export default HomePage
