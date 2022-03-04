import { Box, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getLatestBillsThunk } from '../../../redux/billSlice'
import NoComponentFound from '../../NoComponentFound'
import LoadingComponent from '../../Skeletons/LoadingComponent'
import { useNavigate } from 'react-router-dom'

const LatestBills = () => {

    const { latestBills, latestBillsLoading, latestBillsError } = useSelector(state => state.billState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getLatestBillsThunk());
    }, [])

    const bills = latestBills.map(bill => {
        const obj = {
            id: bill._id,
            app: bill.app,
            invoiceNumber: bill.invoiceNumber,
            date: bill.invoiceData.date,
            orderId: bill.order.orderId,
            name: bill.invoiceData.billingUser.name,
        }
        return obj
    })

    const columns = [
        {
            field: "invoiceNumber", headerName: "Invoice No.",
            minWidth: 110,
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
            valueGetter: (params) => {
                return params.row.orderId;
            },

            headerName: "Order ID",
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.orderId} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.orderId}
                    </Typography>
                );
            },
        },

    ];

    return (
        <Paper elevation={4} sx={{ width: '100%', padding: 3, minHeight: { lg: '480px' } }}>
            <Box sx={{ width: '100%', mb: 4 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>Latest Bills</Typography>
            </Box>
            {
                latestBillsLoading ?
                    (
                        <LoadingComponent />
                    ) :
                    latestBillsError ?
                        (
                            <NoComponentFound error={latestBillsError} />
                        ) :
                        (
                            <Box sx={{ display: 'flex', width: '100%' }} >
                                <DataGrid
                                    autoHeight
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
                                    hideFooter
                                    columns={columns}
                                    pageSize={5}
                                    pagination
                                    density='comfortable'
                                    getRowId={(row) => row.id}
                                    onRowClick={(row, e) => {
                                        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.type !== 'button') {
                                            navigate(`bills/${row.id}`)
                                        }
                                    }}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'date', sort: 'desc' }],
                                        },
                                    }}
                                />
                            </Box >
                        )
            }
        </Paper>
    )

}

export default LatestBills
