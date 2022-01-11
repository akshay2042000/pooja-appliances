import { styled } from '@mui/material'
import React from 'react'
import { Bars } from 'react-loader-spinner'


const StyledBars = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin:50,
    '& svg':{
       fill: theme.palette.primary.main
    }
    
}));


const Loader = () => {
    return (
        <div>
            <StyledBars >
                <Bars height={100} width={100} />
            </StyledBars>
        </div>
    )
}

export default Loader
