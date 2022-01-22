import { Box, Button, styled, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const Ball = styled(Box)(({ theme }) => ({
        height: '200px',
        width: '200px',
        position: 'absolute',
        borderRadius: '50%',
        background: 'linear-gradient(50.08deg, #269FF7 29.06%, #269FF7 29.06%, #74BEF3 80.1%)',
    }));

    return (
        <>
            <Ball sx={{
                left: '30%',
                top: '20%'
            }} />
            <Ball sx={{
                right: '30%',
                bottom: '20%'
            }} />
            <Box sx={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                width: ['80%', '400px'],    
                margin: 'auto',
                padding: 4, background: 'linear-gradient(125.56deg, rgba(255, 255, 255, 0.35) 16.45%, rgba(255, 255, 255, 0.1) 70.19%)', borderRadius: 3, backdropFilter: 'blur(10px)', boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)',
                borderImageSource: 'linear-gradient(119.63deg, #FFFFFF 17.47%, rgba(81, 143, 205, 0) 42.78%, rgba(81, 143, 205, 0) 68.49%, rgba(81, 143, 205, 0.49) 92.25%)'
            }}>

                <Typography variant="h3" textAlign='center' color="common.white">Sign In</Typography>

                <Box component="form" sx={{
                    '& .MuiTextField-root': { m: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '400px',
                }}>

                    <TextField

                        id='username'
                        color="white"
                        sx={{ input: { color: 'common.white', m: 1 } }}
                        required
                        focused
                        label="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <TextField
                        type="Password"
                        color="white"
                        id='password'
                        sx={{ input: { color: 'common.white', m: 1 } }}
                        required
                        focused
                        label="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <Button variant="contained" color="secondary" sx={{ width: '150px', mx: 'auto', mt: 4, py: 2 }}>Login</Button>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm
