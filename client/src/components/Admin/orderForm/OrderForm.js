import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import TextFieldWrapper from "../../Formik/TextFieldWrapper";
import ButtonWrapper from "../../Formik/ButtonWrapper";
import DateTimeWrapper from "../../Formik/DateTimeWrapper";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import inLocale from "date-fns/locale/en-IN";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AsyncSelect from "react-select/async";
import { useTheme } from "@mui/material/styles";
import {
	Box,
	Container,
	Grid,
	InputAdornment,
	Paper,
	Typography,
	CircularProgress
} from "@mui/material";
import OrderCartList from "./OrderCartList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";
import OrderSuccess from "./OrderSuccess";
import { getLastBillThunk, submitBillThunk } from "../../../redux/billSlice";

const OrderForm = () => {
	const dispatch = useDispatch();
	const { singleOrder } = useSelector((state) => state.orderState);
	const { isBillSubmitting, lastBill } = useSelector(
		(state) => state.billState
	);
	const theme = useTheme();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getLastBillThunk(singleOrder?.app));
	}, []);

	const INITIAL_FORM_STATE = {
		invoiceNumber: singleOrder.isBilled
			? singleOrder.billingId.invoiceNumber
			: lastBill
			? lastBill.invoiceNumber + 1
			: 1,
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
		placeOfSupply: "Gurgaon",
		transportation: "Tempo",
		vehicleNumber: "NA",
		reverseChanges: "NA",
		insurance: 0,
		packaging: 0,
		items: singleOrder.items.map((item) => {
			const obj = {
				id: item._id,
				itemName:
					item.product.name +
					", " +
					item.color.name +
					" (" +
					item.size.val +
					")",
				hsn: item.product.hsnCode.hsnNumber,
				quantity: item.quantity,
				unit: item.unit.name,
				rate: item.size.price * item.unit.pcPerUnit,
				cgstPercentage: item.product.hsnCode.CGST,
				sgstPercentage: item.product.hsnCode.SGST,
				igstPercentage: item.product.hsnCode.IGST,
				color: item.color.name,
				size: item.size.val
			};
			obj.total = parseFloat(obj.quantity * obj.rate).toFixed(2);
			obj.taxableValue = parseFloat(obj.total - (obj.total / 100) * 0).toFixed(
				2
			);
			obj.cgst = parseFloat(
				(obj.taxableValue * obj.cgstPercentage) / 100
			).toFixed(2);
			obj.sgst = parseFloat(
				(obj.taxableValue * obj.sgstPercentage) / 100
			).toFixed(2);
			obj.igst = parseFloat(
				(obj.taxableValue * obj.igstPercentage) / 100
			).toFixed(2);
			obj.subtotal = parseFloat(
				parseFloat(obj.taxableValue) +
					parseFloat(obj.cgst) +
					parseFloat(obj.sgst) +
					parseFloat(obj.igst)
			).toFixed(2);
			return obj;
		})
	};

	const [open, setOpen] = useState(false);

	const FORM_VALIDATION = Yup.object().shape({
		invoiceNumber: Yup.number()
			.required("Invoice Number is required")
			.typeError("you must specify a number")
			.min(0, "Min value 0."),
		date: Yup.date().required("Date is required"),
		billingUser: Yup.object().shape({
			username: Yup.string().required("username required"),
			name: Yup.string().required("name required"),
			address: Yup.string().required("address required"),
			gst: Yup.string().required("gst required"),
			state: Yup.string().required("state required"),
			stateCode: Yup.number().required("stateCode required")
		}),
		shippingUser: Yup.object().shape({
			username: Yup.string().required("username required"),
			name: Yup.string().required("name required"),
			address: Yup.string().required("address required"),
			gst: Yup.string().required("gst required"),
			state: Yup.string().required("state required"),
			stateCode: Yup.string().required("stateCode required")
		}),
		discount: Yup.number()
			.required("This field is required")
			.typeError("you must specify a number")
			.min(0, "Min value 0.")
			.max(100, "Max value 100."),
		insurance: Yup.number()
			.required("This field is required")
			.typeError("you must specify a number")
			.min(0, "Min value 0."),
		packaging: Yup.number()
			.required("This field is required")
			.typeError("you must specify a number")
			.min(0, "Min value 0."),
		placeOfSupply: Yup.string().required("This field is required"),
		transportation: Yup.string().required("This field is required"),
		vehicleNumber: Yup.string().required("This field is required"),
		reverseChanges: Yup.string().required("This field is required")
	});

	const loadOptions = async (inputValue, callback) => {
		const requestResults = [];
		const { data } = await Api.getSearchedUsers(inputValue);
		const users = data.data;
		users.map((user) => {
			requestResults.push({
				value: user,
				label: user.username
			});
		});
		callback(requestResults);
	};
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			borderRadius: theme.shape.borderRadius,
			"&:hover": {
				border: "1px solid #ced4da",
				cursor: "pointer"
			},
			fontFamily: theme.typography.body2.fontFamily,
			fontWeight: theme.typography.body2.fontWeight,
			fontSize: theme.typography.body2.fontSize
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
			fontSize: theme.typography.body2.fontSize
		}),
		option: (styles, { isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isSelected && theme.palette.primary.main,
				cursor: isFocused && "pointer"
			};
		}
	};

	const handleUserChange = (value, e, setFieldValue) => {
		const user = value.value;
		setFieldValue(e.name, {
			username: user.username,
			name: user.name,
			address: user.address,
			gst: user.gstNumber,
			state: user.state.name,
			stateCode: user.state.code
		});
	};

	const postInvoice = async (values) => {
		if (singleOrder.isBilled) {
			const date = new Date(singleOrder.billingId.updatedAt);
			const fileName =
				singleOrder.billingId.app +
				"_" +
				singleOrder.billingId.invoiceNumber +
				"_" +
				date.getDate() +
				"_" +
				(date.getMonth() + 1) +
				"_" +
				date.getUTCFullYear();
			const { data } = await Api.deleteBill(
				singleOrder.billingId._id,
				fileName,
				singleOrder._id
			);
		}
		const name =
			singleOrder.app +
			"_" +
			values.invoiceNumber +
			"_" +
			values.date.getDate() +
			"_" +
			(values.date.getMonth() + 1) +
			"_" +
			values.date.getUTCFullYear();
		const invoiceData = {
			app: singleOrder.app,
			invoiceNumber: values.invoiceNumber,
			date: values.date,
			billingUser: {
				username: values.billingUser.username,
				name: values.billingUser.name,
				address: values.billingUser.address,
				gst: values.billingUser.gst,
				state: values.billingUser.state,
				stateCode: values.billingUser.stateCode
			},
			shippingUser: {
				username: values.shippingUser.username,
				name: values.shippingUser.name,
				address: values.shippingUser.address,
				gst: values.shippingUser.gst,
				state: values.shippingUser.state,
				stateCode: values.shippingUser.stateCode
			},
			discount: values.discount,
			placeOfSupply: values.placeOfSupply,
			transportation: values.transportation,
			insurance: values.insurance,
			packaging: values.packaging,
			vehicleNumber: values.vehicleNumber,
			reverseChanges: values.reverseChanges,
			items: values.items
		};

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
		};
		await dispatch(submitBillThunk(billData, name, invoiceData));

		setOpen(true);
	};

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
					}}
				>
					{({ values, setFieldValue }) => (
						<>
							<Form>
								<Typography
									variant="h4"
									color="inherit"
									sx={{
										textTransform: "capitalize",
										textAlign: "center",
										mb: 8
									}}
								>
									{`${singleOrder.app} appliances invoice`}
								</Typography>

								<Grid
									spacing={2}
									container
									sx={{ alignItems: "center", mb: 6 }}
								>
									<Grid item xs={6}>
										<TextFieldWrapper
											name="invoiceNumber"
											label="Invoice Number"
											variant="outlined"
											InputProps={{
												inputProps: { min: 0 }
											}}
										/>
									</Grid>
									<Grid item xs={6} sx={{ textAlign: "end" }}>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											locale={inLocale}
										>
											<DateTimeWrapper name="date" label="Date" />
										</LocalizationProvider>
									</Grid>
								</Grid>
								<Grid container spacing={2} sx={{ mb: 4 }}>
									<Grid item xs={12} sm={6}>
										<Paper elevation={2} sx={{ p: 2 }}>
											<Typography
												variant="body1"
												color="initial"
												sx={{ textAlign: "center", mb: 2 }}
											>
												Billing Address
											</Typography>
											{/* a search bar for user */}
											<Box sx={{ mb: 4 }}>
												<AsyncSelect
													styles={customStyles}
													name="billingUser"
													loadOptions={loadOptions}
													cacheOptions
													placeholder="Select any other user"
													defaultValue={{
														label: singleOrder.user.username,
														value: singleOrder.user
													}}
													onChange={(e, value) => {
														handleUserChange(e, value, setFieldValue);
													}}
												/>
											</Box>
											<Grid spacing={2} container>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="billingUser.name"
														label="Name"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="billingUser.address"
														label="Address"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="billingUser.gst"
														label="GST Number"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={6}>
													<TextFieldWrapper
														name="billingUser.state"
														label="State"
														variant="outlined"
														size="small"
													/>
												</Grid>
												<Grid item xs={6}>
													<TextFieldWrapper
														name="billingUser.stateCode"
														label="State Code"
														variant="outlined"
														size="small"
													/>
												</Grid>
											</Grid>
										</Paper>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Paper elevation={2} sx={{ p: 2 }}>
											<Typography
												variant="body1"
												color="initial"
												sx={{ textAlign: "center", mb: 2 }}
											>
												Shipping Address
											</Typography>
											{/* a search bar for user */}
											<Box sx={{ mb: 4 }}>
												<AsyncSelect
													name="shippingUser"
													styles={customStyles}
													loadOptions={loadOptions}
													cacheOptions
													placeholder="Select any other user"
													defaultValue={{
														label: singleOrder.user.username,
														value: singleOrder.user
													}}
													onChange={(value, e) => {
														handleUserChange(value, e, setFieldValue);
													}}
												/>
											</Box>
											<Grid spacing={2} container>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="shippingUser.name"
														label="Name"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="shippingUser.address"
														label="Address"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={12}>
													<TextFieldWrapper
														name="shippingUser.gst"
														label="GST Number"
														variant="outlined"
														size="small"
														fullWidth
													/>
												</Grid>
												<Grid item xs={6}>
													<TextFieldWrapper
														name="shippingUser.state"
														label="State"
														variant="outlined"
														size="small"
													/>
												</Grid>
												<Grid item xs={6}>
													<TextFieldWrapper
														name="shippingUser.stateCode"
														label="State Code"
														variant="outlined"
														size="small"
													/>
												</Grid>
											</Grid>
										</Paper>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="discount"
											label="Discount"
											variant="outlined"
											type="number"
											InputProps={{
												inputProps: { min: 0 },
												endAdornment: (
													<InputAdornment position="end">%</InputAdornment>
												)
											}}
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="placeOfSupply"
											label="Place of Supply"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="transportation"
											label="Transportation"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="vehicleNumber"
											label="Vehicle Number"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="reverseChanges"
											label="Reverse Changes"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="insurance"
											label="Freight & Insurance"
											variant="outlined"
										/>
									</Grid>
									<Grid item xs={6} lg={3} sm={4}>
										<TextFieldWrapper
											name="packaging"
											label="Packaging & Forwarding"
											variant="outlined"
										/>
									</Grid>
								</Grid>
							</Form>
							<OrderCartList values={values} setFieldValue={setFieldValue} />
							<Grid container direction="row-reverse">
								<Grid item xs={12} md={12} lg={8}>
									{!singleOrder.isBilled ? (
										<ButtonWrapper
											variant="contained"
											color="primary"
											type="submit"
											sx={{ p: 2 }}
											disabled={isBillSubmitting}
										>
											{isBillSubmitting ? (
												<CircularProgress color="primary" size="30px" />
											) : (
												"Generate Bill"
											)}
										</ButtonWrapper>
									) : (
										<Grid container spacing={2}>
											<Grid item xs={12} sm={6}>
												<ButtonWrapper
													variant="contained"
													color="primary"
													sx={{ p: 2 }}
													//  go to bill page on click
													onClick={() => {
														navigate(
															`/admin/bills/${singleOrder.billingId._id}`
														);
													}}
												>
													View Bill
												</ButtonWrapper>
											</Grid>
											<Grid item xs={12} sm={6}>
												<ButtonWrapper
													variant="contained"
													color="primary"
													type="submit"
													sx={{ p: 2 }}
													disabled={isBillSubmitting}
												>
													{isBillSubmitting ? (
														<CircularProgress color="primary" size="30px" />
													) : (
														"Delete and make new bill"
													)}
												</ButtonWrapper>
											</Grid>
										</Grid>
									)}
								</Grid>
							</Grid>

							<OrderSuccess open={open} setOpen={setOpen} values={values} />
						</>
					)}
				</Formik>
			</Container>
		</>
	);
};

export default OrderForm;
