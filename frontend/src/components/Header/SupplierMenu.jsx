import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const supplierOptions = [
	{
		label: "Search",
		path: "/suppliers",
	},
	{
		label: "Add",
		path: "/suppliers/create",
	},
];

export const SupplierMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				variant="primary"
				id="basic-button"
				onClick={handleClick}
				sx={{
					color: "whitesmoke",
					fontWeight: "400",
					fontSize: "15px",
					pb: 1.35,
					fontFamily:
						'-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
				}}
			>
				Suppliers
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{
					"& .MuiMenu-paper": {
						boxShadow: 4,
						color: "white",
						bgcolor: "primary.main",
					},
				}}
			>
				{supplierOptions.map((option) => (
					<MenuItem
						key={option.label}
						onClick={() => {
							navigate(option.path);
							handleClose();
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
