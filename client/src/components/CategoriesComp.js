import { MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { StyledPaper } from '../styles/navbarStyles';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../api/index'


const CategoriesComp = () => {
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
        <StyledPaper square elevation={5} >
            {categories.map((category, i) => (
                <Link key={category._id} to={`/${appliances}/products?cat=${category._id}`}>
                    <MenuItem >
                        <Typography variant='body1' textAlign="center" color='secondary.dark' >{category.name}</Typography>
                    </MenuItem>
                </Link>
            ))}
        </StyledPaper>

    )
}

export default CategoriesComp
