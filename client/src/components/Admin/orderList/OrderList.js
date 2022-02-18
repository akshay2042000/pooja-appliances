import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { getOrderListThunk, deleteOrderThunk } from "../../../redux/orderSlice";
import LoadingComponent from '../../Skeletons/LoadingComponent';
import moment from 'moment'
import { styled, alpha, useTheme } from '@mui/material/styles';



export default function WidgetLg() {
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { orderList, orderListLoading } = useSelector(state => state.orderState);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteOrderThunk(id));
    };

    useEffect(() => {
        if (orderList.length === 0) {
            dispatch(getOrderListThunk());
        }
    }, [dispatch, orderList]);

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
            field: "createdAt", headerName: "Date",
            flex: 1,
            type: 'dateTime',
            minWidth: 120,

            renderCell: (params) => {

                return (
                    <Typography title={moment(params.row.createdAt).format('MMM Do YY, h:mm a')} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {moment(params.row.createdAt).format('MMM Do YY, h:mm a')}
                    </Typography>
                );
            },
        },
        {
            field: "user.name",
            headerName: "User",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Typography title={params.row.user.name} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {params.row.user.name}
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
                    <Typography title={params.row.app} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
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
            flex: 1,
            headerName: "Action",
            minWidth: 180,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                        <Link to={params.row._id}>
                            <Button variant='contained' color='secondary'>Invoice</Button>
                        </Link>


                        <IconButton sx={{ ml: 1 }} color='error' onClick={() => handleDelete(params.row._id)}>
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
                    :
                    (

                        <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', padding: { md: 5, xs: 2 } }} >
                            < DataGrid
                                rows={orderList}
                                sx={{
                                    '& .MuiDataGrid-row': {
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.045)',
                                        },

                                    }
                                   
                                }}
                                disableSelectionOnClick
                                columns={columns}
                                pageSize={pageSize}
                                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                rowsPerPageOptions={[5, 10, 20]}
                                pagination
                                density='comfortable'
                                getRowId={(row) => row._id}
                                onRowClick={(row) => {
                                    navigate(`${row.id}`)
                                }}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'orderId', sort: 'desc' }],
                                    },
                                }}
                            />
                        </Box >
                    )
            }

        </>
    );
}
