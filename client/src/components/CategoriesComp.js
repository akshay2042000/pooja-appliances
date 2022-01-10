import { MenuItem, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { StyledPaper } from '../styles/navbarStyles';

const pages = ['Products', 'Pricing', 'Blog'];

const CategoriesComp = () => {
    return (
        <StyledPaper square='true' elevation='5' >
            {pages.map((page) => (
                <Link to="/">
                    <MenuItem key={page} >
                        <Typography variant='h6' textAlign="center" color='white'>{page}</Typography>
                    </MenuItem>
                </Link>

            ))}

        </StyledPaper>

    )
}

export default CategoriesComp
