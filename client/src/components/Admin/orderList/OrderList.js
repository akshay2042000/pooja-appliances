import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { deleteOrderThunk } from "../../../redux/orderSlice";
import LoadingComponent from '../../Skeletons/LoadingComponent';
import moment from 'moment'
import { alpha } from '@mui/material/styles';
import NoComponentFound from '../../NoComponentFound';



export default function OrderList() {
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { orderList, orderListLoading, orderListError } = useSelector(state => state.orderState);
    const orders = orderList.map(order => {
        const obj = {
            id: order._id,
            isBilled: order.isBilled,
            app: order.app,
            orderId: order.orderId,
            date: order.updatedAt,
            name: order.user.name,
            username: order.user.username,
            total: order.items.reduce((prev, curr) => prev + curr.quantity * curr.size.price * curr.unit.pcPerUnit, 0)
        }
        return obj
    })

    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteOrderThunk(id));
    };


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
            field: "total",
            headerName: "Amount",
            flex: 1,

            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.total} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{new Intl.NumberFormat('en-IN').format(params.row.total)}
                    </Typography>
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
        {
            field: "action",
            flex: 0.3,
            headerName: "",
            minWidth: 80,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
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
                orderListLoading ?
                    (
                        <Box sx={{ height: 'calc(100vh - 80px)', p: 2, m: 'auto' }} >
                            <LoadingComponent />
                        </Box>

                    )
                    : orderListError ?
                        <NoComponentFound error={orderListError} />
                        :
                        (

                            <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', padding: { md: 5, xs: 2 } }} >
                                < DataGrid
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
                                            sortModel: [{ field: 'orderId', sort: 'desc' }],
                                        },
                                    }}
                                    getRowClassName={(params) => `super-app-theme--${params.row.isBilled}`}
                                />
                            </Box >
                        )
            }

        </>
    );
}
