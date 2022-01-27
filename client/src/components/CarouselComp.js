import React, { useRef } from 'react'
import { Paper, Button, Typography, Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};



const CarouselComp = ({ items, isHome }) => {
    const slider = useRef(null);
    const theme = useTheme();
    return (
        <>
            <Slider ref={slider} {...settings}>
                {
                    items.map((item, i) => {
                        return (
                            <div key={i}>
                                <Paper sx={{
                                    height: '60vh', backgroundImage: `url(${item.image})`, backgroundSize: 'cover',
                                    backgroundPosition: 'center', display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <IconButton aria-label="prev" size="large" sx={{
                                        backgroundColor: `${theme.palette.secondary.main}`,
                                        position: 'absolute',
                                        left: '5px',
                                    }} onClick={() => slider.current.slickPrev()}>
                                        <ArrowBackIosNewIcon />
                                    </IconButton>
                                    <IconButton aria-label="next" size="large" sx={{
                                        backgroundColor: `${theme.palette.secondary.main}`,
                                        position: 'absolute',
                                        right: '5px',
                                    }} onClick={() => slider.current.slickNext()}>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                    {
                                        isHome && <Box sx={{
                                            position: 'absolute', bottom: 20, backdropFilter: 'blur(10px)', backgroundColor: 'primary.main', borderRadius: 2, padding: 2, width: 'fit-content', textAlign: 'center',
                                            background: 'linear-gradient(125.56deg, rgba(0,25,41, 0.75) 16.45%, rgba(0,25,41, 0.7) 70.19%)'
                                        }}>

                                            <Typography variant="h4" color="common.white">Name</Typography>
                                            <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}> {item.name} </Button>
                                        </Box>
                                    }

                                </Paper>
                            </div>
                        )
                    })
                }
            </Slider>
        </ >
    )
}

export default CarouselComp
