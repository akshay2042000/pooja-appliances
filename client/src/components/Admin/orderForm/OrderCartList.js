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


const OrderCartList = ({ values }) => {

    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { singleOrder, singleOrderLoading, singleOrderError } = useSelector(state => state.orderState);
    const items = singleOrder.items.map(item => {
        const obj = {
            id: item._id,
            itemName: item.product.name + ', ' + item.color.name + ' (' + item.size.val + ')',
            hsn: item.product.hsnCode.hsnNumber,
            quantity: item.quantity,
            unit: item.unit,
            rate: item.size.price,
            cgstPercentage: item.product.hsnCode.CGST,
            sgstPercentage: item.product.hsnCode.SGST,
            igstPercentage: item.product.hsnCode.IGST,
            color: item.color.name,
            size: item.size.val,
        }
        obj.total = obj.quantity * obj.rate;
        obj.taxableValue = Math.floor(obj.total - (obj.total / 100 * values.discount))
        obj.cgst = Math.floor(obj.taxableValue * obj.cgstPercentage / 100)
        obj.sgst = Math.floor(obj.taxableValue * obj.sgstPercentage / 100)
        obj.igst = Math.floor(obj.taxableValue * obj.igstPercentage / 100)
        obj.subtotal = obj.taxableValue + obj.cgst + obj.sgst + obj.igst
        return obj
    })

    const columns = [
        {
            field: "itemName", headerName: "Item Name",
            minWidth: 180,
            flex: 1,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.itemName} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.itemName}
                    </Typography>
                );
            },
        },
        {
            field: "color", headerName: "Color",
            minWidth: 100,
            flex: 0.6,
            editable: true,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.color} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.color}
                    </Typography>
                );
            },
        },
        {
            field: "size", headerName: "Size",
            minWidth: 100,
            flex: 0.6,
            editable: true,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.size} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.size}
                    </Typography>
                );
            },
        },
        {
            field: "hsn", headerName: "HSN",
            flex: 0.3,
            type: 'number',
            minWidth: 100,
            renderCell: (params) => {

                return (
                    <Typography title={params.row.hsn} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.hsn}
                    </Typography>
                );
            },
        },
        {
            field: 'quantity',
            headerName: "Quantity",
            type: 'number',
            flex: 0.3,
            editable: true,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Typography title={params.row.quantity} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {params.row.quantity}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "unit",
            headerName: "Unit",
            flex: 0.3,
            editable: true,
            minWidth: 80,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.unit} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', textTransform: 'capitalize' }}>
                        {params.row.unit}
                    </Typography>
                );
            },
        },
        {
            field: "rate",
            flex: 1,
            type: 'number',
            editable: true,
            headerName: "Rate",
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.rate} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.rate}
                    </Typography>
                );
            },
        },
        {
            field: "total",
            headerName: "Total",
            type: 'number',
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.total} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.total}
                    </Typography>
                );
            },
        },
        {
            field: "taxableValue",
            headerName: "Taxable Value",
            type: 'number',
            flex: 1,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.taxableValue} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.taxableValue} <Typography variant='caption'>{`(${values.discount}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "cgst",
            headerName: "CGST",
            type: 'number',
            flex: 1,
            minWidth: 110,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.cgst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.cgst} <Typography variant='caption'>{`(${params.row.cgstPercentage}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "SGST",
            headerName: "SGST",
            type: 'number',
            flex: 1,
            minWidth: 110,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.sgst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.sgst} <Typography variant='caption' >{`(${params.row.sgstPercentage}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "IGST",
            headerName: "IGST",
            type: 'number',
            flex: 1,
            minWidth: 110,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.igst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.igst} < Typography variant='caption' >{`(${params.row.igstPercentage}%)`}</Typography>
                    </Typography >
                );

            },
        },

        {
            field: "subtotal",
            flex: 1,
            headerName: "Subtotal",
            type: 'number',
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.subtotal} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹ {params.row.subtotal}
                    </Typography>
                );
            },
        },
    ];

    return (
        <>
            {
                singleOrderLoading ?
                    (
                        <Box sx={{ height: 'calc(100vh - 80px)', p: 2, m: 'auto' }} >
                            <LoadingComponent />
                        </Box>

                    )
                    : singleOrderError ?
                        <NoComponentFound error={singleOrderError} />
                        :
                        (
                            <Box sx={{ display: 'flex', paddingY: 5 }} >
                                <DataGrid
                                    autoHeight
                                    rows={items}
                                    sx={{
                                        '& .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                        '& .editable-cell': {
                                            cursor: 'pointer',
                                        }
                                    }}
                                    disableSelectionOnClick
                                    columns={columns}
                                    pageSize={pageSize}
                                    editMode="row"
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                    density='comfortable'
                                    getRowId={(row) => row.id}
                                    getCellClassName={(params) => {
                                        if (params.colDef.editable) {
                                            return 'editable-cell';
                                        }
                                    }}
                                />
                            </Box >
                        )
            }

        </>
    )
}

export default OrderCartList
