import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderListThunk, deleteOrderThunk } from "../../../redux/orderSlice";
import LoadingComponent from '../../Skeletons/LoadingComponent';
import moment from 'moment'
import { alpha } from '@mui/material/styles';
import NoComponentFound from '../../NoComponentFound';
import { deleteBillThunk } from '../../../redux/billSlice';



export default function BillList() {
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { billList, billListLoading, billListError } = useSelector(state => state.billState);

    const bills = billList.map(bill => {
        const obj = {
            id: bill._id,
            app: bill.app,
            invoiceNumber: bill.invoiceNumber,
            date: bill.invoiceData.date,
            totalTaxable: bill.invoiceData.items.reduce((previous, current) => previous + current.taxableValue, 0),
            totalGst: bill.invoiceData.items.reduce((previous, current) => previous + current.cgst + current.sgst + current.igst, 0),
            invoiceTotal: bill.invoiceData.items.reduce((previous, current) => previous + current.subtotal, 0),
            order: bill.order,
            downloadLink: bill.invoiceBill.path,
            viewLink : bill.invoiceViewBill.path,
            username: bill.invoiceData.billingUser.username,
            name: bill.invoiceData.billingUser.name,
        }
        return obj
    })


    const navigate = useNavigate();


    const handleDelete = (id) => {
        const bill = bills.find(bill => bill.id === id)
        dispatch(deleteBillThunk(id, bill));
    };

    const download = async (downloadLink) => {
        var link = document.createElement("a");
        link.href = downloadLink;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }


    const columns = [
        {
            field: "invoiceNumber", headerName: "Invoice No.",
            minWidth: 130,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.invoiceNumber} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.invoiceNumber}
                    </Typography>
                );
            },
        },
        {
            field: "date", headerName: "Date",
            flex: 1,
            type: 'dateTime',
            minWidth: 120,
            renderCell: (params) => {

                return (
                    <Typography title={moment(params.row.date).format('MMM Do YY, h:mm a')} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {moment(params.row.date).format('MMM Do YY, h:mm a')}
                    </Typography>
                );
            },
        },
        {
            field: 'username',
            headerName: "Username",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Typography title={params.row.username} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {params.row.username}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'name',
            headerName: "Name",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Typography title={params.row.name} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {params.row.name}
                        </Typography>
                    </Box>
                );
            },
        },

        {
            field: "app",
            flex: 1,
            headerName: "Appliance",
            minWidth: 110,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.app} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'capitalize' }}>
                        {params.row.app}
                    </Typography>
                );
            },
        },
        {
            field: "order",
            flex: 0.3,
            headerName: "Order ID",
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.order.orderId} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.order.orderId}
                    </Typography>
                );
            },
        },
        {
            field: "totalTaxable",
            headerName: "Total Taxable",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.totalTaxable} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{new Intl.NumberFormat('en-IN').format(params.row.totalTaxable)}
                    </Typography>
                );
            },
        },
        {
            field: "totalGst",
            headerName: "Total GST",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.totalGst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{new Intl.NumberFormat('en-IN').format(params.row.totalGst)}
                    </Typography>
                );
            },
        },
        {
            field: "invoiceTotal",
            headerName: "Total Invoice",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.invoiceTotal} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{new Intl.NumberFormat('en-IN').format(params.row.invoiceTotal)}
                    </Typography>
                );
            },
        },
        {
            field: "action",
            flex: 1,
            headerName: "",
            minWidth: 180,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                        <Button variant='contained' color='secondary' onClick={(e) => download(params.row.downloadLink)}>Download</Button>
                        <IconButton sx={{ ml: 1 }} color='error' onClick={() => handleDelete(params.row.id)}>
                            <DeleteOutline />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];



    return (
        <>
            {
                billListLoading ?
                    (
                        <Box sx={{ height: 'calc(100vh - 80px)', p: 2, m: 'auto' }} >
                            <LoadingComponent />
                        </Box>

                    )
                    : billListError ?
                        <NoComponentFound error={billListError} />
                        :
                        (

                            <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', padding: { md: 5, xs: 2 } }} >
                                < DataGrid
                                    rows={bills}
                                    sx={{
                                        '& .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                        '& .MuiDataGrid-row': {
                                            cursor: 'pointer',
                                            '&:hover': {
                                                boxShadow: 25,
                                                bgcolor: (theme) =>
                                                    theme.palette.common.white,
                                            },
                                        },
                                    }}
                                    disableSelectionOnClick
                                    columns={columns}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                    density='comfortable'
                                    getRowId={(row) => row.id}
                                    onRowClick={(row, e) => {
                                        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.type !== 'button') {
                                            navigate(`${row.id}`)
                                        }
                                    }}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'invoiceNumber', sort: 'desc' }],
                                        },
                                    }}
                                />
                            </Box >
                        )
            }

        </>
    );
}
