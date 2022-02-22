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


const OrderCartList = ({ values, setFieldValue }) => {

    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { singleOrder, singleOrderLoading, singleOrderError } = useSelector(state => state.orderState);
    var [items, setItems] = useState(singleOrder.items.map(item => {
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
    }))
    useEffect(() => {
        setFieldValue('items', items)
    }, [])

    useEffect(() => {
        setItems(items.map(item => {
            const obj = {
                ...item,
                taxableValue: Math.floor(item.total - (item.total / 100 * values.discount))
            }
            obj.cgst = Math.floor(obj.taxableValue * obj.cgstPercentage / 100)
            obj.sgst = Math.floor(obj.taxableValue * obj.sgstPercentage / 100)
            obj.igst = Math.floor(obj.taxableValue * obj.igstPercentage / 100)
            obj.subtotal = obj.taxableValue + obj.cgst + obj.sgst + obj.igst
            return obj
        }))
    }, [values.discount])


    const handleChange = ((params) => {
        const itemIndex = items.findIndex((item) => item.id === params.id);

        const array = items.map(item => {
            if (item.id === params.id) {
                return {
                    ...item, [params.field]: params.value
                };
            } else {
                return { ...item };
            }
        })
        if (params.field === 'rate' || params.field === 'quantity') {
            array[itemIndex].total = Math.floor(array[itemIndex].quantity * array[itemIndex].rate);
            array[itemIndex].taxableValue = Math.floor(array[itemIndex].total - (array[itemIndex].total / 100 * values.discount));
            array[itemIndex].cgst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].cgstPercentage / 100);
            array[itemIndex].sgst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].sgstPercentage / 100);
            array[itemIndex].igst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].igstPercentage / 100);
            array[itemIndex].subtotal = array[itemIndex].taxableValue + array[itemIndex].cgst + array[itemIndex].sgst + array[itemIndex].igst;
        }
        //  change if gst percentages changes
        if (params.field === 'cgstPercentage' || params.field === 'sgstPercentage' || params.field === 'igstPercentage') {
            array[itemIndex].cgst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].cgstPercentage / 100);
            array[itemIndex].sgst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].sgstPercentage / 100);
            array[itemIndex].igst = Math.floor(array[itemIndex].taxableValue * array[itemIndex].igstPercentage / 100);
            array[itemIndex].subtotal = array[itemIndex].taxableValue + array[itemIndex].cgst + array[itemIndex].sgst + array[itemIndex].igst;
        }
        setFieldValue('items', array);
        setItems(array);
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
            field: "hsn", headerName: "HSN",
            flex: 0.3,
            type: 'number',
            editable: true,
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
            field: "cgstPercentage", headerName: "CGST",
            flex: 0.3,
            type: 'number',
            editable: true,
            minWidth: 80,
            renderCell: (params) => {

                return (
                    <Typography title={params.row.cgstPercentage} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.cgstPercentage}%
                    </Typography>
                );
            },
        },
        {
            field: "sgstPercentage", headerName: "SGST",
            flex: 0.3,
            type: 'number',
            editable: true,
            minWidth: 80,
            renderCell: (params) => {

                return (
                    <Typography title={params.row.sgstPercentage} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.sgstPercentage}%
                    </Typography>
                );
            },
        },
        {
            field: "igstPercentage", headerName: "IGST",
            flex: 0.3,
            type: 'number',
            editable: true,
            minWidth: 80,
            renderCell: (params) => {

                return (
                    <Typography title={params.row.igstPercentage} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.igstPercentage}%
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
                        ₹{params.row.rate}
                    </Typography>
                );
            },
        },
        {
            field: "total",
            headerName: "Total",
            type: 'number',
            editable: true,
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.total} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.total}
                    </Typography>
                );
            },
        },
        {
            field: "taxableValue",
            headerName: "Taxable Value",
            type: 'number',
            flex: 1,
            editable: true,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.taxableValue} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.taxableValue} <Typography variant='caption'>{`(${values.discount}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "cgst",
            headerName: "CGST Amount",
            type: 'number',
            flex: 1,
            editable: true,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.cgst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.cgst} <Typography variant='caption'>{`(${params.row.cgstPercentage}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "sgst",
            headerName: "SGST Amount",
            type: 'number',
            editable: true,
            flex: 1,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.sgst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.sgst} <Typography variant='caption' >{`(${params.row.sgstPercentage}%)`}</Typography>
                    </Typography>
                );
            },
        },
        {
            field: "igst",
            headerName: "IGST Amount",
            type: 'number',
            flex: 1,
            editable: true,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.igst} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.igst} < Typography variant='caption' >{`(${params.row.igstPercentage}%)`}</Typography>
                    </Typography >
                );

            },
        },

        {
            field: "subtotal",
            flex: 1,
            headerName: "Subtotal",
            type: 'number',
            editable: true,
            minWidth: 130,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.subtotal} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        ₹{params.row.subtotal}
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
                                    onCellEditCommit={handleChange}

                                />
                            </Box >
                        )
            }
        </>
    )
}

export default OrderCartList
