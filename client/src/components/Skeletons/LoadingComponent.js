import { CircularProgress, styled } from '@mui/material'
import React from 'react'
import { Bars } from 'react-loader-spinner'


const StyledLoader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
}));


const LoadingComponent = ({ heigth }) => {
    return (
        <div>
            <StyledLoader >
                {/* <Bars height={height ? height : 100} width={width ? width : 100} /> */}
                <CircularProgress color="primary" size={100} thickness={4}/>
            </StyledLoader>

        </div>
    )
}

export default LoadingComponent
