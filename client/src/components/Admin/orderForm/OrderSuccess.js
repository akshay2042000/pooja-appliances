import { Button } from '@mui/material'
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'

const OrderSuccess = ({ open, setOpen }) => {
    const { submittedBill } = useSelector(state => state.billState)

    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        navigate('/admin/orders');
    };

    const getPdf = async () => {
        const downloadLink = submittedBill?.invoiceBill?.path
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
                        <Typography variant="h5" color='primary.main' sx={{ textTransform: 'capitalize' }}>
                            {submittedBill?.app} appliances
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize='large' />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{ paddingX: 2 }}>
                        <Typography variant="h6" >
                            Bill Generated!!
                        </Typography>
                        <Typography variant="body1" >
                            Invoice Number : {submittedBill?.invoiceNumber}
                        </Typography>
                        <Typography variant="body1" >
                            Order Number : {submittedBill?.invoiceData?.orderId}
                        </Typography>
                        <Typography variant="body1" >
                            Invoice Subtotal : ₹{submittedBill?.invoiceData?.items.reduce((previous, current) => previous + current.subtotal, 0)}
                        </Typography>
                    </Box>

                </DialogContent>

                <DialogActions >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 4, paddingBottom: 1, width: '100%' }}>
                        <Button autoFocus variant='contained' color='primary' onClick={(e) => {
                            getPdf()
                        }}>
                            Download Invoice
                        </Button>

                        <Button variant='outlined' color='error' onClick={handleClose} >
                            Close
                        </Button>
                    </Box>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderSuccess
