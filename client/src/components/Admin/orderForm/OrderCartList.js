import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useSelector } from "react-redux";
import LoadingComponent from "../../Skeletons/LoadingComponent";
import NoComponentFound from "../../NoComponentFound";

const OrderCartList = ({ values, setFieldValue }) => {
	const [pageSize, setPageSize] = useState(10);
	const { singleOrderLoading, singleOrderError } = useSelector(
		(state) => state.orderState
	);

	const [items, setItems] = useState(values.items);

	useEffect(() => {
		const array = items.map((item) => {
			const obj = {
				...item,
				taxableValue: parseFloat(
					item.total - (item.total / 100) * values.discount
				).toFixed(2)
			};
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
		});
		setFieldValue("items", array);
		setItems(array);
	}, [values.discount]);

	const handleChange = (params) => {
		const itemIndex = items.findIndex((item) => item.id === params.id);

		const array = items.map((item) => {
			if (item.id === params.id) {
				return {
					...item,
					[params.field]: params.value
				};
			} else {
				return { ...item };
			}
		});
		if (params.field === "quantity") {
			//  remove the item if quantity is 0
			if (params.value === 0) {
				array.splice(itemIndex, 1);
			}
		}

		if (params.field === "rate" || params.field === "quantity") {
			array[itemIndex].total = parseFloat(
				array[itemIndex].quantity * array[itemIndex].rate
			).toFixed(2);
			array[itemIndex].taxableValue = parseFloat(
				array[itemIndex].total -
					(array[itemIndex].total / 100) * values.discount
			).toFixed(2);
			array[itemIndex].cgst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].cgstPercentage) / 100
			).toFixed(2);
			array[itemIndex].sgst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].sgstPercentage) / 100
			).toFixed(2);
			array[itemIndex].igst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].igstPercentage) / 100
			).toFixed(2);
			array[itemIndex].subtotal =
				parseFloat(array[itemIndex].taxableValue) +
				parseFloat(array[itemIndex].cgst) +
				parseFloat(array[itemIndex].sgst) +
				parseFloat(array[itemIndex].igst);
		}
		//  change if gst percentages changes
		if (
			params.field === "cgstPercentage" ||
			params.field === "sgstPercentage" ||
			params.field === "igstPercentage"
		) {
			array[itemIndex].cgst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].cgstPercentage) / 100
			).toFixed(2);
			array[itemIndex].sgst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].sgstPercentage) / 100
			).toFixed(2);
			array[itemIndex].igst = parseFloat(
				(array[itemIndex].taxableValue * array[itemIndex].igstPercentage) / 100
			).toFixed(2);
			array[itemIndex].subtotal =
				parseFloat(array[itemIndex].taxableValue) +
				parseFloat(array[itemIndex].cgst) +
				parseFloat(array[itemIndex].sgst) +
				parseFloat(array[itemIndex].igst);
		}
		setFieldValue("items", array);
		setItems(array);
	};

	const handleDelete = (id) => {
		const array = items.filter((item) => item.id !== id);
		setFieldValue("items", array);
		setItems(array);
	};

	const columns = [
		{
			field: "action",
			flex: 0.3,
			headerName: "",
			minWidth: 80,
			renderCell: (params) => {
				return (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-around",
							width: "100%"
						}}
					>
						<IconButton
							sx={{ ml: 1 }}
							color="error"
							onClick={() => handleDelete(params.row.id)}
						>
							<DeleteOutline />
						</IconButton>
					</Box>
				);
			}
		},
		{
			field: "itemName",
			headerName: "Item Name",
			minWidth: 250,
			flex: 2,
			editable: true,
			renderCell: (params) => {
				return (
					<Box>
						<Typography
							title={params.row.itemName}
							variant="body2"
							sx={{
								textTransform: "capitalize",
								textOverflow: "ellipsis",
								overflow: "hidden"
							}}
						>
							{params.row.itemName}
						</Typography>
						<Typography
							variant="caption"
							sx={{
								textTransform: "capitalize",
								textOverflow: "ellipsis",
								overflow: "hidden"
							}}
						>
							{params.row.quantity + " " + params.row.unit}
						</Typography>
					</Box>
				);
			}
		},
		{
			field: "hsn",
			headerName: "HSN",
			flex: 0.3,
			type: "number",
			editable: true,
			minWidth: 100,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.hsn}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						{params.row.hsn}
					</Typography>
				);
			}
		},
		{
			field: "cgstPercentage",
			headerName: "CGST",
			flex: 0.3,
			type: "number",
			editable: true,
			minWidth: 80,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.cgstPercentage}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						{params.row.cgstPercentage}%
					</Typography>
				);
			}
		},
		{
			field: "sgstPercentage",
			headerName: "SGST",
			flex: 0.3,
			type: "number",
			editable: true,
			minWidth: 80,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.sgstPercentage}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						{params.row.sgstPercentage}%
					</Typography>
				);
			}
		},
		{
			field: "igstPercentage",
			headerName: "IGST",
			flex: 0.3,
			type: "number",
			editable: true,
			minWidth: 80,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.igstPercentage}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						{params.row.igstPercentage}%
					</Typography>
				);
			}
		},
		{
			field: "quantity",
			headerName: "Quantity",
			type: "number",
			flex: 0.3,
			editable: true,
			minWidth: 100,
			renderCell: (params) => {
				return (
					<Box
						sx={{ display: "flex", alignItems: "center", overflow: "hidden" }}
					>
						<Typography
							title={params.row.quantity}
							variant="body2"
							sx={{
								textTransform: "capitalize",
								textOverflow: "ellipsis",
								overflow: "hidden"
							}}
						>
							{params.row.quantity}
						</Typography>
					</Box>
				);
			}
		},
		{
			field: "unit",
			headerName: "Unit",
			flex: 0.3,
			editable: true,
			minWidth: 80,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.unit}
						variant="body2"
						sx={{
							textOverflow: "ellipsis",
							overflow: "hidden",
							textTransform: "capitalize"
						}}
					>
						{params.row.unit}
					</Typography>
				);
			}
		},
		{
			field: "rate",
			flex: 1,
			type: "number",
			editable: true,
			headerName: "Rate",
			minWidth: 100,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.rate}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.rate)}
					</Typography>
				);
			}
		},
		{
			field: "total",
			headerName: "Total",
			type: "number",
			editable: true,
			flex: 1,
			minWidth: 100,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.total}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.total)}
					</Typography>
				);
			}
		},
		{
			field: "taxableValue",
			headerName: "Taxable Value",
			type: "number",
			flex: 1,
			editable: true,
			minWidth: 130,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.taxableValue}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.taxableValue)}{" "}
						<Typography variant="caption">{`(${values.discount}%)`}</Typography>
					</Typography>
				);
			}
		},
		{
			field: "cgst",
			headerName: "CGST Amount",
			type: "number",
			flex: 1,
			editable: true,
			minWidth: 130,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.cgst}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.cgst)}{" "}
						<Typography variant="caption">{`(${params.row.cgstPercentage}%)`}</Typography>
					</Typography>
				);
			}
		},
		{
			field: "sgst",
			headerName: "SGST Amount",
			type: "number",
			editable: true,
			flex: 1,
			minWidth: 130,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.sgst}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.sgst)}{" "}
						<Typography variant="caption">{`(${params.row.sgstPercentage}%)`}</Typography>
					</Typography>
				);
			}
		},
		{
			field: "igst",
			headerName: "IGST Amount",
			type: "number",
			flex: 1,
			editable: true,
			minWidth: 130,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.igst}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.igst)}{" "}
						<Typography variant="caption">{`(${params.row.igstPercentage}%)`}</Typography>
					</Typography>
				);
			}
		},

		{
			field: "subtotal",
			flex: 1,
			headerName: "Subtotal",
			type: "number",
			editable: true,
			minWidth: 130,
			renderCell: (params) => {
				return (
					<Typography
						title={params.row.subtotal}
						variant="body2"
						sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
					>
						₹{new Intl.NumberFormat("en-IN").format(params.row.subtotal)}
					</Typography>
				);
			}
		}
	];

	return (
		<>
			{singleOrderLoading ? (
				<Box sx={{ height: "calc(100vh - 80px)", p: 2, m: "auto" }}>
					<LoadingComponent />
				</Box>
			) : singleOrderError ? (
				<NoComponentFound error={singleOrderError} />
			) : (
				<>
					<Box sx={{ display: "flex", paddingY: 5 }}>
						<DataGrid
							autoHeight
							rows={items}
							sx={{
								"& .MuiDataGrid-cell:focus": {
									outline: "none"
								},
								"& .editable-cell": {
									cursor: "pointer"
								}
							}}
							disableSelectionOnClick
							columns={columns}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							rowsPerPageOptions={[5, 10, 20]}
							pagination
							hideFooter
							density="comfortable"
							getRowId={(row) => row.id}
							getCellClassName={(params) => {
								if (params.colDef.editable) {
									return "editable-cell";
								}
							}}
							onCellEditCommit={handleChange}
						/>
					</Box>
					<Grid container sx={{ mb: 6 }}>
						<Grid item xs={12} sm={6}>
							<Typography
								variant="body1"
								color="initial"
								sx={{ textTransform: "capitalize", fontWeight: "bold" }}
							>
								total taxable amount :{" "}
								<Typography
									variant="h6"
									sx={{ fontWeight: "normal" }}
									component="span"
								>
									₹
									{new Intl.NumberFormat("en-IN").format(
										items.reduce((acc, item) => {
											return parseFloat(
												parseFloat(acc) + parseFloat(item.taxableValue)
											).toFixed(2);
										}, 0)
									)}
								</Typography>
							</Typography>
							<Typography
								variant="body1"
								color="initial"
								sx={{ textTransform: "capitalize", fontWeight: "bold" }}
							>
								total gst :{" "}
								<Typography
									variant="h6"
									sx={{ fontWeight: "normal" }}
									component="span"
								>
									₹
									{new Intl.NumberFormat("en-IN").format(
										items.reduce((acc, item) => {
											return parseFloat(
												parseFloat(acc) +
													parseFloat(item.cgst) +
													parseFloat(item.sgst) +
													parseFloat(item.igst)
											).toFixed(2);
										}, 0)
									)}
								</Typography>
							</Typography>
							<Typography
								variant="body1"
								color="initial"
								sx={{ textTransform: "capitalize", fontWeight: "bold" }}
							>
								Invoice total :{" "}
								<Typography
									variant="h6"
									sx={{ fontWeight: "normal" }}
									component="span"
								>
									₹
									{new Intl.NumberFormat("en-IN").format(
										items.reduce((acc, item) => {
											return parseFloat(
												parseFloat(acc) + parseFloat(item.subtotal)
											).toFixed(2);
										}, 0)
									)}
								</Typography>
							</Typography>
						</Grid>
						<Grid item xs={12} sm={6} />
					</Grid>
				</>
			)}
		</>
	);
};

export default OrderCartList;
