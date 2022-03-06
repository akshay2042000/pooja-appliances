import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import TextFieldWrapper from '../../Formik/TextFieldWrapper';
import ButtonWrapper from '../../Formik/ButtonWrapper';
import DateTimeWrapper from '../../Formik/DateTimeWrapper';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import inLocale from 'date-fns/locale/en-IN';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import AsyncSelect from 'react-select/async';
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, InputAdornment, Paper, Typography, CircularProgress } from '@mui/material';
import OrderCartList from './OrderCartList';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../../api';
import OrderSuccess from './OrderSuccess';
import { getLastBillThunk, submitBillThunk } from '../../../redux/billSlice';



const OrderForm = () => {
    const dispatch = useDispatch();
    const { singleOrder } = useSelector(state => state.orderState);
    const { isBillSubmitting, lastBill } = useSelector(state => state.billState);
    const theme = useTheme();


    useEffect(() => {
        dispatch(getLastBillThunk(singleOrder?.app));
    }, [])

    const INITIAL_FORM_STATE = {
        invoiceNumber: lastBill ? lastBill.invoiceNumber + 1 : 1,
        date: new Date(),
        billingUser: {
            username: singleOrder.user.username,
            name: singleOrder.user.name,
            address: singleOrder.user.address,
            gst: singleOrder.user.gstNumber,
            state: singleOrder.user.state.name,
            stateCode: singleOrder.user.state.code
        },
        shippingUser: {
            username: singleOrder.user.username,
            name: singleOrder.user.name,
            address: singleOrder.user.address,
            gst: singleOrder.user.gstNumber,
            state: singleOrder.user.state.name,
            stateCode: singleOrder.user.state.code
        },
        discount: 0,
        items: singleOrder.items.map(item => {
            const obj = {
                id: item._id,
                itemName: item.product.name + ', ' + item.color.name + ' (' + item.size.val + ')',
                hsn: item.product.hsnCode.hsnNumber,
                quantity: item.quantity,
                unit: item.unit.name,
                rate: item.size.price * item.unit.pcPerUnit,
                cgstPercentage: item.product.hsnCode.CGST,
                sgstPercentage: item.product.hsnCode.SGST,
                igstPercentage: item.product.hsnCode.IGST,
                color: item.color.name,
                size: item.size.val,
            }
            obj.total = obj.quantity * obj.rate;
            obj.taxableValue = Math.floor(obj.total - (obj.total / 100 * 0))
            obj.cgst = Math.floor(obj.taxableValue * obj.cgstPercentage / 100)
            obj.sgst = Math.floor(obj.taxableValue * obj.sgstPercentage / 100)
            obj.igst = Math.floor(obj.taxableValue * obj.igstPercentage / 100)
            obj.subtotal = obj.taxableValue + obj.cgst + obj.sgst + obj.igst
            return obj
        })
    };

    const [open, setOpen] = useState(false);

    const FORM_VALIDATION = Yup.object().shape({
        invoiceNumber: Yup.number().required('Invoice Number is required').typeError('you must specify a number').min(0, 'Min value 0.'),
        date: Yup.date().required('Date is required'),
        billingUser: Yup.object().shape({
            username: Yup.string().required('username required'),
            name: Yup.string().required('name required'),
            address: Yup.string().required('address required'),
            gst: Yup.string().required('gst required'),
            state: Yup.string().required('state required'),
            stateCode: Yup.number().required('stateCode required'),
        }),
        shippingUser: Yup.object().shape({
            username: Yup.string().required('username required'),
            name: Yup.string().required('name required'),
            address: Yup.string().required('address required'),
            gst: Yup.string().required('gst required'),
            state: Yup.string().required('state required'),
            stateCode: Yup.string().required('stateCode required'),
        }),
        discount: Yup.number().required('This field is required').typeError('you must specify a number').min(0, 'Min value 0.')
    });

    const loadOptions = async (inputValue, callback) => {
        const requestResults = [];
        const { data } = await Api.getSearchedUsers(inputValue)
        const users = data.data
        users.map(user => {
            requestResults.push({
                value: user,
                label: user.username
            })
        })
        callback(requestResults)
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: theme.shape.borderRadius,
            '&:hover': {
                border: '1px solid #ced4da',
                cursor: 'pointer',
            },
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
        }),
        menu: (provided, state) => ({
            ...provided,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
            zIndex: 10
        }),

        input: (provided, state) => ({
            ...provided,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.body2.fontFamily,
            fontWeight: theme.typography.body2.fontWeight,
            fontSize: theme.typography.body2.fontSize,
        }),
        option: (styles, { isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected &&
                    theme.palette.primary.main,
                cursor: isFocused &&
                    'pointer'
            };
        },
    }

    const handleUserChange = (value, e, setFieldValue) => {
        const user = value.value
        setFieldValue(e.name, {
            username: user.username,
            name: user.name,
            address: user.address,
            gst: user.gstNumber,
            state: user.state.name,
            stateCode: user.state.code
        })
    }

    const postInvoice = async (values) => {

        const name = singleOrder.app + '_' + values.invoiceNumber + '_' + values.date.getDate() + "_" + (values.date.getMonth() + 1) + "_" + values.date.getUTCFullYear()

        const invoiceData = {
            first_name: "potato",
            last_name: "patata",
            phone: "0652455478",
            description: "New Website",
        }

        const billData = {
            app: singleOrder.app,
            invoiceNumber: values.invoiceNumber,
            invoiceData: {
                billingUser: values.billingUser,
                shippingUser: values.shippingUser,
                discount: values.discount,
                date: values.date,
                orderId: singleOrder.orderId,
                items: values.items
            },
            order: { ...singleOrder }
        }
        await dispatch(submitBillThunk(billData, name, invoiceData));

        setOpen(true);
    }


    return (
        <>
            <Container sx={{ padding: { md: 4, xs: 2 } }}>
                <Formik
                    validateOnChange={false}
                    validateOnBlure={false}
                    initialValues={{
                        ...INITIAL_FORM_STATE
                    }}
                    validationSchema={FORM_VALIDATION}
                    enableReinitialize={true}
                    onSubmit={(values) => {
                        postInvoice(values);
                    }}>
                    {({ values, setFieldValue }) => (
                        <>
                            <Form>
                                <Typography variant="h4" color='inherit' sx={{ textTransform: 'capitalize', textAlign: 'center', mb: 8 }} >
                                    {`${singleOrder.app} appliances invoice`}
                                </Typography>

                                <Grid spacing={2} container sx={{ alignItems: 'center', mb: 6 }}>
                                    <Grid item xs={6} >
                                        <TextFieldWrapper
                                            name="invoiceNumber"
                                            label="Invoice Number"
                                            variant='outlined'
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sx={{ textAlign: 'end' }}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={inLocale}>
                                            <DateTimeWrapper
                                                name="date"
                                                label="Date"
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ mb: 4 }} >
                                    <Grid item xs={12} sm={6}>
                                        <Paper elevation={2} sx={{ p: 2 }}>
                                            <Typography variant="body1" color="initial" sx={{ textAlign: 'center', mb: 2 }}>
                                                Billing Address
                                            </Typography>
                                            {/* a search bar for user */}
                                            <Box sx={{ mb: 4 }}>
                                                <AsyncSelect
                                                    styles={customStyles}
                                                    name='billingUser'
                                                    loadOptions={loadOptions}
                                                    cacheOptions
                                                    placeholder='Select any other user'
                                                    defaultValue={{ label: singleOrder.user.username, value: singleOrder.user }}
                                                    onChange={(e, value) => {
                                                        handleUserChange(e, value, setFieldValue)
                                                    }}
                                                />
                                            </Box>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="billingUser.name"
                                                        label="Name"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="billingUser.address"
                                                        label="Address"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="billingUser.gst"
                                                        label="GST Number"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextFieldWrapper
                                                        name="billingUser.state"
                                                        label="State"
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextFieldWrapper
                                                        name="billingUser.stateCode"
                                                        label="State Code"
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Paper elevation={2} sx={{ p: 2 }}>
                                            <Typography variant="body1" color="initial" sx={{ textAlign: 'center', mb: 2 }}>
                                                Shipping Address
                                            </Typography>
                                            {/* a search bar for user */}
                                            <Box sx={{ mb: 4 }}>
                                                <AsyncSelect
                                                    name='shippingUser'
                                                    styles={customStyles}
                                                    loadOptions={loadOptions}
                                                    cacheOptions
                                                    placeholder='Select any other user'
                                                    defaultValue={{ label: singleOrder.user.username, value: singleOrder.user }}
                                                    onChange={(value, e) => {
                                                        handleUserChange(value, e, setFieldValue)
                                                    }}

                                                />
                                            </Box>
                                            <Grid spacing={2} container>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="shippingUser.name"
                                                        label="Name"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="shippingUser.address"
                                                        label="Address"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextFieldWrapper
                                                        name="shippingUser.gst"
                                                        label="GST Number"
                                                        variant='outlined'
                                                        size='small'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextFieldWrapper
                                                        name="shippingUser.state"
                                                        label="State"
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextFieldWrapper
                                                        name="shippingUser.stateCode"
                                                        label="State Code"
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} >
                                        <TextFieldWrapper
                                            name="discount"
                                            label="Discount"
                                            variant='outlined'
                                            type='number'
                                            InputProps={{
                                                inputProps: { min: 0 },
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                            <OrderCartList values={values} setFieldValue={setFieldValue} />
                            <Grid container>
                                <Grid item xs={12} sm={6} />
                                <Grid item xs={12} sm={6}>

                                    <ButtonWrapper
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        sx={{ p: 2 }}
                                        disabled={isBillSubmitting}
                                    >
                                        {isBillSubmitting ? (
                                            <CircularProgress color="primary" size='30px' />
                                        ) : 'Generate Bill'}

                                    </ButtonWrapper>


                                </Grid>
                            </Grid>


                            <OrderSuccess open={open} setOpen={setOpen} values={values} />
                        </>
                    )}
                </Formik>
            </Container>
        </>
    )
}

export default OrderForm
