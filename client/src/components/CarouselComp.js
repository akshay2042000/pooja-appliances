import React, { useRef } from 'react'
import { Paper, Button, Typography, Box, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom'
import CarouselSkeleton from './Skeletons/CarouselSkeleton';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
};



const CarouselComp = ({ items, isHome, isLoading, h }) => {
    const slider = useRef(null);
    const theme = useTheme();
    return (
        <>
            {
                isLoading ? <CarouselSkeleton  h={'60vh'} />
                    :
                    <Slider ref={slider} {...settings}  >
                        {
                            items.map((item, i) => {
                                return (
                                    <div key={i}>
                                        <Paper sx={{
                                            height: h, backgroundImage: isHome ? `url(${item.coverImage.path})` : `url(${item.path})`, backgroundSize: 'cover',
                                            backgroundPosition: 'center', display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative',
                                            '&:before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(0,0,0,0.5)',
                                            },
                                        }}>
                                            <IconButton aria-label="prev" size="large" sx={{
                                                backgroundColor: `${theme.palette.secondary.main}`,
                                                '&:hover': {
                                                    backgroundColor: `${theme.palette.secondary.dark}`
                                                },
                                                position: 'absolute',
                                                left: '5px',
                                            }} onClick={() => slider.current.slickPrev()}>
                                                <ArrowBackIosNewIcon />
                                            </IconButton>
                                            <IconButton aria-label="next" size="large" sx={{
                                                backgroundColor: `${theme.palette.secondary.main}`,
                                                '&:hover': {
                                                    backgroundColor: `${theme.palette.secondary.dark}`
                                                },
                                                position: 'absolute',
                                                right: '5px',
                                            }} onClick={() => slider.current.slickNext()}>
                                                <ArrowForwardIosIcon />
                                            </IconButton>
                                            {
                                                isHome &&
                                                <Box sx={{
                                                    position: 'absolute', bottom: 30, backdropFilter: 'blur(10px)', backgroundColor: 'primary.main', borderRadius: 2, padding: 2, width: 'fit-content', textAlign: 'center',
                                                    background: 'linear-gradient(125.56deg, rgba(0,25,41, 0.75) 16.45%, rgba(0,25,41, 0.7) 70.19%)'
                                                }}>

                                                    <Typography variant="h4" sx={{ textTransform: 'uppercase' }} color="common.white">{item.name}</Typography>
                                                    <Link to={`products?comp=${item._id}`}>
                                                        <Button variant="contained" color="secondary" sx={{ marginTop: 2 }}> view collection </Button>
                                                    </Link>
                                                </Box>
                                            }

                                        </Paper>
                                    </div>
                                )
                            })
                        }
                    </Slider>
            }


        </ >
    )
}

export default CarouselComp
