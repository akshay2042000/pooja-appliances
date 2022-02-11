import { Box, Button, CircularProgress, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginThunk } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const LoginForm = () => {
    const { app } = useParams()
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, error, currentUser } = useSelector((state) => state.userState);

    const Ball = styled(Box)(({ theme }) => ({
        height: '200px',
        width: '200px',
        position: 'absolute',
        borderRadius: '50%',
        background: 'linear-gradient(50.08deg, #269FF7 29.06%, #269FF7 29.06%, #74BEF3 80.1%)',
    }));

    const login = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        dispatch(loginThunk(username, password));
    }

    useEffect(() => {
        if (currentUser) {
            navigate(`/${app}`)
        }
    }, [currentUser])

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
                width: ['80%', '400px'],
                margin: 'auto',
                height: '70vh',
                padding: 4, background: 'linear-gradient(125.56deg, rgba(255, 255, 255, 0.35) 16.45%, rgba(255, 255, 255, 0.1) 70.19%)', borderRadius: 3, backdropFilter: 'blur(10px)', boxShadow: '0px 4px 24px -1px rgba(0, 0, 0, 0.2)',
                backgroundImage: 'linear-gradient(125.56deg, rgba(24, 26, 27, 0.45) 16.45%, rgba(24, 26, 27, 0.3) 70.19%)',
                border: '1px solid rgba(255, 255, 255, 0.125)'
            }}>
                <Box component="form" sx={{
                    '& .MuiTextField-root': { m: 1 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    height: '100%'
                }}>
                    <Typography variant="h3" textAlign='center' color="common.white">Sign In</Typography>

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
                        type={passwordShown ? 'text' : 'password'}
                        color="white"
                        id='password'
                        sx={{ input: { color: 'common.white', m: 1 } }}
                        required
                        focused
                        label="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton color='white' onClick={() => setPasswordShown(!passwordShown)}>
                                        {passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),

                        }}
                    />
                    {error &&
                        (
                            <Box>
                                <Typography variant="body1" color="error.main" textAlign='center'>
                                    Invalid username or password
                                </Typography>
                            </Box>

                        )
                    }
                    <Button onClick={(e) => login(e)} variant="contained" color="secondary" disabled={isFetching} sx={{ width: '150px', mx: 'auto', mt: 4, py: 2, height: '60px' }}>
                        {isFetching ? (
                            <CircularProgress color="secondary" />
                        ) : 'Sign In'}
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default LoginForm
