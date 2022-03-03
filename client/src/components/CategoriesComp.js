import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { StyledPaper } from '../styles/navbarStyles';
import { useSelector } from 'react-redux';
import CategoriesCompSkeleton from './Skeletons/CategoriesCompSkeleton';


const CategoriesComp = () => {
    const applianceState = useSelector(state => state.applianceState);
    const appliances = applianceState.appliances;
    const categoryState = useSelector(state => state.categoryState);
    const categories = categoryState.categories;

    return (
        <StyledPaper square sx={{
            position: 'relative', color: 'common.white', backgroundColor: 'primary.dark', px: [1, 2, 5], '&::-webkit-scrollbar': {
                height: '6px',
            },
            '&::-webkit-scrollbar-track': {
                borderRadius: '10px',
                backgroundColor: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'secondary.main',
                borderRadius: '10px',
            },
            boxShadow: '-12px -50px 0px 30px #000'

        }} elevation={5}  >
            {
                categoryState.loading ? (
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
