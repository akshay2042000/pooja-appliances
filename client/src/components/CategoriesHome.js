import React, { useState, useEffect } from 'react'
import { Container, Grid, Paper } from '@mui/material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import SingleCategory from './SingleCategory.js';
import Api from '../api/index'


const categories = ["CAtegory 1", "CAtegory 2", "CAtegory 3", "CAtegory 4", "CAtegory 5", "CAtegory 6", "CAtegory 7"]

const CategoriesHome = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await Api.getCategories(appliances);
                const categories = data.data;
                setcategories(categories);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCategories();
    }, [appliances])


    return (
        <Paper id="categories" elevation={0} sx={{ borderRadius: 1, mt: 6 }}>
            <Container disableGutters={true} fixed>
                <Grid container spacing={3} padding={2}>
                    {categories.map((category, index) => {
                        return (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <Link to={`products?cat=${category._id}`} >
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
