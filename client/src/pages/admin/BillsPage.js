import React from 'react'
import BillList from '../../components/Admin/billList/BillList'
import ListForm from '../../components/Admin/ListForm'

const BillsPage = () => {
    return (
        <div>

            <ListForm page='bills' />
            <BillList />
        </div>
    )
}

export default BillsPage
