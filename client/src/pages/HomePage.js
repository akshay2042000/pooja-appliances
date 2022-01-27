import React from 'react'
import Typography from '@mui/material/Typography'
import CarouselComp from '../components/CarouselComp'
import CategoriesHome from '../components/CategoriesHome'
import { Container, Paper, Grid } from '@mui/material'
import HomeCard from '../components/HomeCard'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

var items = [
    {
        name: "Random Name #1",
        description: "Probably the most random thing you have ever seen!",
        image: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
    },
    {
        name: "Random Name #2",
        description: "Hello World!",
        image: "https://images.unsplash.com/photo-1567306301408-9b74779a11af"

    }, {
        name: "Random Name #3",
        description: "Hello World!",
        image: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c"

    }
]

const HomePage = () => {
    
    return (
        <div>
            <CarouselComp items={items} isHome={true} />
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
