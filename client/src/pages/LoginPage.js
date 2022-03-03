import React from 'react'
import { Box } from '@mui/material'
import LoginForm from '../components/LoginForm'


const LoginPage = () => {
    return (
        <>
            <Box sx={{
                background: 'rgb(39, 64, 70)',
                background: 'radial-gradient(circle, rgba(39, 64, 70, 1) 0%, rgba(10, 25, 41, 1) 46%)', height: '100vh',
                display: 'flex'
            }}>
                <LoginForm />
            </Box>
        </>
    )
}

export default LoginPage
