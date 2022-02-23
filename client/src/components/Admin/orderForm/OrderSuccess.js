import { Button } from '@mui/material'
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'



const OrderSuccess = ({ open, setOpen, downloadLink }) => {

    const handleClose = () => {
        setOpen(false);
    };

    const getPdf = async () => {
        var link = document.createElement("a");
        link.href = downloadLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }




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
                        Order ID : 12345
                        Invoice Number : 1002
                    </Typography>

                    <Button variant='contained' color='primary' onClick={(e) => {
                        getPdf()
                    }}>
                        View Invoice
                    </Button>

                </DialogContent>

                <DialogActions>
                    <Button autoFocus variant='contained' onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderSuccess
