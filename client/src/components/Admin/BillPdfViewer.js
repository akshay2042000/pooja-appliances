import { Box, Button, Container } from '@mui/material';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


const BillPdfViewer = () => {

    const { singleBill } = useSelector(state => state.billState);

    return (
        <>

            {/* button to download the pdf */}
            <Box sx={{ padding: { md: 4, xs: 2 } }}>
                <Button variant="contained" color="primary" href={singleBill.invoiceBill.path} download>
                    Download Bill
                </Button>
            </Box>

            <div style={{
                // backgroundColor: '#e4e4e4',
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                // height: '800px',
                // overflowY: 'auto',
                // marginBottom: '10px'
            }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                    <Viewer fileUrl={singleBill.invoiceViewBill.path}
                    ></Viewer>
                </Worker>
            </div>
        </>
    )
}

export default BillPdfViewer
