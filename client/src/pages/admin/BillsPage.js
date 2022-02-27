import { Typography } from '@mui/material'
import React from 'react'
import BillList from '../../components/Admin/billList/BillList'
import ListForm from '../../components/Admin/ListForm'

const BillsPage = () => {
    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: 'center', p:3 }} >
                Bills
            </Typography>
            <ListForm page='bills' />
            <BillList />
        </div>
    )
}

export default BillsPage
