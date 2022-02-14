import { Box, styled } from '@mui/material'
import React from 'react'
import CircularProgress, {
    circularProgressClasses,
} from '@mui/material/CircularProgress';


const StyledLoader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 40,
}));


const LoadingComponent = ({ heigth }) => {
    return (
        <StyledLoader >
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: (theme) =>
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={60}
                    thickness={4}
                    value={100}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: 'primary.main',
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={60}
                    thickness={4}
                />
            </Box>
        </StyledLoader>

    )
}

export default LoadingComponent
