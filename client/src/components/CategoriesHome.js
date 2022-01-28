import React from 'react'
import { Container, Grid, Paper } from '@mui/material';
import { Link } from "react-router-dom";

import SingleCategory from './SingleCategory.js';

const categories = ["CAtegory 1", "CAtegory 2", "CAtegory 3", "CAtegory 4", "CAtegory 5", "CAtegory 6", "CAtegory 7"]

const CategoriesHome = () => {
    return (
        <Paper id="categories" elevation={0} sx={{ borderRadius: 1, mt: 6 }}>
            <Container disableGutters={true} fixed>
                <Grid container spacing={3} padding={2}>
                    {categories.map((category, index) => {
                        return (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Link to={`products?cat=${category}`} >
                                    <SingleCategory category={category} />
                                </Link>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </Paper >
    )
}

export default CategoriesHome
