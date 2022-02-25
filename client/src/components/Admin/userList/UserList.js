import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { getUserListThunk, deleteUserThunk } from "../../../redux/userSlice";
import LoadingComponent from '../../Skeletons/LoadingComponent';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Link, useNavigate } from "react-router-dom";
import NoComponentFound from '../../NoComponentFound';


function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            textTransform: 'uppercase'
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1] ? name.split(" ")[1][0] : ""}`
    };
}

export default function UserList() {
    const [pageSize, setPageSize] = useState(10);
    const dispatch = useDispatch();
    const { userList, userListLoading, userListError } = useSelector(state => state.userState);


    const handleDelete = (id) => {
        dispatch(deleteUserThunk(id));
    };

    useEffect(() => {
        dispatch(getUserListThunk());
    }, [dispatch]);

    const columns = [
        {
            field: "gstNumber", headerName: "GST",
            flex: 1,
            minWidth: 160,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.gstNumber} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.gstNumber}
                    </Typography>
                );
            },
        },
        {
            field: "username", headerName: "Username",
            flex: 1,
            minWidth: 120,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.username} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.username}
                    </Typography>

                );
            },
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                        <Box sx={{ mr: 1 }}>
                            <Avatar {...stringAvatar(params.row.name)} />
                        </Box>
                        <Typography title={params.row.name} variant='body2' sx={{ textTransform: 'capitalize', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            {params.row.name}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: "address",
            headerName: "Address",

            flex: 1,
            minWidth: 180,
            renderCell: (params) => {
                return (
                    <Typography title={params.row.address} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.address}
                    </Typography>
                );
            },
        },
        {
            field: "state.name",
            headerName: "State",
            width: 100,

            renderCell: (params) => {
                return (
                    <Typography title={params.row.state.name} variant='body2' sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {params.row.state.name}
                    </Typography>
                );
            },
        },
        {
            field: "isAdmin",
            headerName: "Is Admin",
            width: 100,

            renderCell: (params) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        {params.row.isAdmin ? (
                            <DoneIcon color='disabled' />
                        ) : (
                            <CloseIcon color='disabled' />
                        )}
                    </Box>
                );
            },
        },
        {
            field: "action",
            headerName: "",
            width: 180,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={params.row._id}>
                            <Button variant='contained' color='secondary'>Edit</Button>
                        </Link>

                        <IconButton sx={{ ml: 1 }} color='error' onClick={() => handleDelete(params.row._id)}>
                            <DeleteOutline />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    return (
        <>
            {
                userListLoading ?
                    (
                        <Box sx={{ height: 'calc(100vh - 80px)', p: 2, m: 'auto' }} >
                            <LoadingComponent />
                        </Box>

                    )
                    :
                    userListError ?
                        <NoComponentFound error={userListError} />
                        :
                        (

                            <Box sx={{ display: 'flex', height: 'calc(100vh - 80px)', padding: { md: 5, xs: 2 } }} >
                                < DataGrid
                                    sx={{
                                        '& .MuiDataGrid-cell:focus': {
                                            outline: 'none',
                                        },
                                        '& .MuiDataGrid-row': {
                                            '&:hover': {
                                                boxShadow: 25,
                                                bgcolor: (theme) =>
                                                    theme.palette.common.white,
                                            },
                                        },
                                    }}
                                    rows={userList}
                                    // rows={data}
                                    disableSelectionOnClick
                                    columns={columns}
                                    pageSize={pageSize}
                                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                                    rowsPerPageOptions={[5, 10, 20]}
                                    pagination
                                    density='comfortable'
                                    getRowId={(row) => row._id}
                                    initialState={{
                                        sorting: {
                                            sortModel: [{ field: 'name', sort: 'asc' }],
                                        },
                                    }}
                                />
                            </Box >
                        )
            }

        </>
    );
}
