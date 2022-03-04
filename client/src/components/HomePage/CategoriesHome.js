import React from 'react'
import { Container, Grid, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import {  useSelector } from 'react-redux';
import SingleCategory from './SingleCategory.js';
import SingleCategorySkeleton from '../Skeletons/SingleCategorySkeleton.js';


const CategoriesHome = () => {
    const categoryState = useSelector(state => state.categoryState);
    const categories = categoryState.categories;

    return (
        <Paper id="categories" elevation={0} sx={{ borderRadius: 1, mt: 6 }}>
            <Container disableGutters={true} fixed>
                {
                    categoryState.loading ? (


                        <Grid container spacing={3} padding={2}>
                            {
                                Array(8).fill().map((_, i) => {
                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={i}>
                                            <SingleCategorySkeleton />
                                        </Grid>
                                    )
                                })

                            }
                        </Grid>
                    ) : (
                        <Grid container spacing={3} padding={2}>
                            {
                                categories.filter(category => category.isFeatured).map((category, index) => {
                                    return (
                                        <Grid item xs={6} sm={4} md={3} key={index}>
                                            <Link to={`products?cat=${category._id}`} >
                                                <SingleCategory category={category} />
                                            </Link>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    )
                }
            </Container>
        </Paper >
    )
}

export default CategoriesHome
