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
            <Container disableGutters={true}>
                <Paper sx={{ backgroundColor: 'primary.main', borderRadius: 3, my: 6, padding: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap:'wrap', px:5 }}>
                        <Link to='/'>
                            <HomeCard heading={'Products'} />
                        </Link>
                        
                        <HashLink smooth to="#categories">
                            <HomeCard heading={'Categories'} />
                        </HashLink>
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

export default HomePage
