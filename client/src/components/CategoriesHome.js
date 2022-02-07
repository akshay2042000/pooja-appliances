import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SingleCategory from './SingleCategory.js';
import Api from '../api/index'
import LoadingComponent from './Skeletons/LoadingComponent.js';


const CategoriesHome = () => {
    const categoryState = useSelector(state => state.categoryState);
    const categories = categoryState.categories;

    return (
        <Paper id="categories" elevation={0} sx={{ borderRadius: 1, mt: 6 }}>
            <Container disableGutters={true} fixed>
                {
                    categoryState.loading? (
                        <LoadingComponent/>
                    ) : (
                        <Grid container spacing={3} padding={2}>
                            {
                                categories.map((category, index) => {
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
