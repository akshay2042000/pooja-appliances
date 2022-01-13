import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, styled, Typography, Box } from '@mui/material'
import { borderTop } from '@mui/system'

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
    return (
        <>
            <Carousel className='carousel' indicators={false} autoPlay={false} swipe={true} cycleNavigation={true} navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                style: {
                    backgroundColor: '#4f78bd',
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
                                <Box sx={{ position: 'absolute', bottom: 20, backgroundColor: 'primary.main', padding: 1, width: 'fit-content', textAlign: 'center' }}>
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
