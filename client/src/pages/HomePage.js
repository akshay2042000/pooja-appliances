import React from 'react'
import Typography from '@mui/material/Typography'
import CarouselComp from '../components/CarouselComp'
import CategoriesHome from '../components/CategoriesHome'
import { Container, Paper, Grid } from '@mui/material'
import HomeCard from '../components/HomeCard'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

const HomePage = () => {
    return (
        <div>
            <CarouselComp />
            <CategoriesHome />
            <Paper elevation={12} sx={{ backgroundColor: 'primary.main', borderRadius: 3, my: 6, padding: 4 }}>
                <Container>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Link to='/'>
                            <HomeCard heading={'All Products'} />
                        </Link>
                        <HashLink smooth to="#categories">
                            <HomeCard heading={'All Categories'} />
                        </HashLink>
                    </Box>

                </Container>


            </Paper>
        </div>
    )
}

export default HomePage
