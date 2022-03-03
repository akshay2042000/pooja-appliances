import React from 'react'
import CarouselComp from '../components/CarouselComp'
import CategoriesHome from '../components/CategoriesHome'
import { Container } from '@mui/material'
import HomeCard from '../components/HomeCard'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux'
import FeaturedProducts from '../components/FeaturedProducts'

const HomePage = () => {

    const companyState = useSelector(state => state.companyState)

    return (
        <>
            <CarouselComp h={'60vh'} items={companyState.companies} isLoading={companyState.loading} isHome={true} />
            <CategoriesHome />

            <FeaturedProducts />


            <Container disableGutters={true} sx={{ padding: 4, paddingTop: 0, mb: 6 }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <Link to='products' style={{ width: '100%', height: '100%' }}>
                        <HomeCard heading={'All Products'} />
                    </Link>
                    <HashLink smooth to="#categories" style={{ width: '100%' }}>
                        <HomeCard heading={'Categories'} />
                    </HashLink>
                </Box>
            </Container>
        </>
    )
}

export default HomePage
