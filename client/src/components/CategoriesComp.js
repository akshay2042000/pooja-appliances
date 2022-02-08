import { MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { StyledPaper } from '../styles/navbarStyles';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../api/index'
import CategoriesCompSkeleton from './Skeletons/CategoriesCompSkeleton';


const CategoriesComp = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const categoryState = useSelector(state => state.categoryState);
    const categories = categoryState.categories;

    return (
        <StyledPaper square sx={{ color: 'common.white', backgroundColor: 'primary.dark' }} elevation={5}  >
            {
                categoryState.loading? (
                    <CategoriesCompSkeleton />
                ) : (
                    categories.map((category, i) => (
                        <Link key={category._id} to={`/${appliances}/products?cat=${category._id}`}>
                            <MenuItem >
                                <Typography variant='body1' textAlign="center" sx={{ textTransform: 'capitalize' }} >{category.name}</Typography>
                            </MenuItem>
                        </Link>
                    ))
                )
            }


        </StyledPaper>

    )
}

export default CategoriesComp
