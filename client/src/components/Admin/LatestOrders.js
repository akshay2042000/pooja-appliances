import { Box, Typography, Chip, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getLatestOrdersThunk } from '../../redux/orderSlice'
import NoComponentFound from '../NoComponentFound'
import { alpha } from '@mui/material/styles';
import LoadingComponent from '../Skeletons/LoadingComponent'


const LatestOrders = () => {
    const { latestOrders, latestOrdersLoading, latestOrdersError } = useSelector(state => state.orderState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getLatestOrdersThunk());
    }, [])

    const orders = latestOrders.map(order => {
        const obj = {
            id: order._id,
            isBilled: order.isBilled,
            app: order.app,
            orderId: order.orderId,
            date: order.updatedAt,
            name: order.user.name,
            username: order.user.username,
        }
        return obj
    })


    const columns = [
        {
            field: "orderId", headerName: "Order ID",
            minWidth: 110,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.orderId} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.orderId}
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
            valueGetter: (params) => {
                return params.row.name;
            },
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
            field: 'username',
            headerName: "Username",
            flex: 1,
            valueGetter: (params) => {
                return params.row.username;
            },

            minWidth: 140,
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
            field: "app",
            flex: 1,
            headerName: "Appliance",
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.app} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'capitalize' }}>
                        {params.row.app}
                    </Typography>
                );
            },
        },
        {
            field: "isBilled",
            headerName: "Status",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <div >
                        {params.row.isBilled ? (
                            <Chip label="Approved" color="success" variant="outlined" sx={{ backgroundColor: 'success.light' }} />
                        ) : (
                            <Chip label="Pending" color="warning" variant="outlined" sx={{ backgroundColor: 'warning.light' }} />
                        )}
                    </div>
                );
            },
        },
    ];


    return (
        <Paper elevation={4} sx={{ width: '100%', padding: 3, minHeight: { lg: '480px' } }}>
            <Box sx={{ width: '100%', mb: 4 }}>
                <Typography variant='h4' sx={{ textAlign: 'center' }}>Latest Orders</Typography>
            </Box>
            {
                latestOrdersLoading ?
                    (
                        <LoadingComponent />
                    ) :
                    latestOrdersError ?
                        (
                            <NoComponentFound error={latestOrdersError} />
                        ) :
                        (
                            <Box sx={{ display: 'flex', width: '100%' }} >
                                <DataGrid
                                    hideFooter
                                    autoHeight
                                    rows={orders}
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
                                        '& .super-app-theme--false': {  // pending
                                            //  white bg
                                            backgroundColor: 'paper',
                                        },
                                        '& .super-app-theme--true': { // approved
                                            // slightly dull bg
                                            bgcolor: (theme) =>
                                                alpha(theme.palette.common.black, 0.04),
                                        },
                                    }}
                                    disableSelectionOnClick
                                    columns={columns}
                                    pageSize={5}
                                    pagination
                                    density='comfortable'
                                    getRowId={(row) => row.id}
                                    onRowClick={(row, e) => {
                                        if (e.target.tagName !== 'svg' && e.target.tagName !== 'path' && e.target.type !== 'button') {
                                            navigate(`orders/${row.id}`)
                                        }
                                    }}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'date', sort: 'desc' }],
                                        },
                                    }}
                                    getRowClassName={(params) => `super-app-theme--${params.row.isBilled}`}
                                />
                            </Box >
                        )
            }
        </Paper>
    )
}

export default LatestOrders
