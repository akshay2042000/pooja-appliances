import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Typography, Box } from '@mui/material'
import { useTheme } from '@mui/material/styles';

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



const CarouselComp = () => {
    const theme = useTheme();

    return (
        <>
            <Carousel className='carousel' indicators={false} autoPlay={false} swipe={true} cycleNavigation={true} navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: `${theme.palette.secondary.main}`
                }
            }} fullHeightHover={false} navButtonsAlwaysVisible={true} animation='slide' duration={400} >
                {
                    items.map((item, i) => {
                        return (
                            <Paper key={i} sx={{
                                height: '60vh', backgroundImage: `url(${item.image})`, backgroundSize: 'cover',
                                backgroundPosition: 'center', display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Box sx={{
                                    position: 'absolute', bottom: 20, backdropFilter: 'blur(10px)', backgroundColor: 'primary.main', borderRadius: 2, padding: 2, width: 'fit-content', textAlign: 'center',
                                    background: 'linear-gradient(125.56deg, rgba(0,25,41, 0.75) 16.45%, rgba(0,25,41, 0.7) 70.19%)'
                                }}>
                                    <Typography variant="h4" color="common.white">Name</Typography>
                                    <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}> {item.name} </Button>
                                </Box>
                            </Paper>
                        )

                    })
                }
            </Carousel>
        </ >
    )
}

export default CarouselComp
