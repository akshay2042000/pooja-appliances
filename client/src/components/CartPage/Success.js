import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { clearCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';

const Success = ({ open, setOpen, order }) => {
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        dispatch(clearCart());
    };


    return (
        <>
            <Dialog open={open} fullWidth={true} onClose={handleClose} sx={{
                backdropFilter: "blur(5px)",
                backgroundColor: 'rgba(111, 126, 140, 0.1)',
            }}>
                <DialogTitle >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}>
                        <Typography variant="h5" color='primary.main'>
                            Order Placed!!
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent >
                    <Typography sx={{ paddingX: 2 }} variant="h6" color='primary.main'>
                        Order ID : {order?.orderId}
                    </Typography>
                    {
                        order?.items?.map((item, i) => (
                            <Box key={i} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                p: 2,
                                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                        <Avatar sx={{ display: ['none', 'block'], mr: 2 }} src={item.product.images[0].path} />
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                            <Typography variant="body1" color="initial">{item.product.name}</Typography>
                                            <Typography variant="caption" color="initial" >{item.color.name}, {item.size.val}</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        paddingX: 1
                                    }}>
                                        <Typography variant="body1" color="initial" >₹{item.size.price}</Typography>
                                        <Typography variant="body1" color="initial" >{item.quantity}
                                            <Typography variant="caption" color="initial" >{item.unit}</Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))
                    }


                </DialogContent>

                <DialogActions>
                    <Button variant='outlined' color='error' autoFocus onClick={handleClose} >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Success
