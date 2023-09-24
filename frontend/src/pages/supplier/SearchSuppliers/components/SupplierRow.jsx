import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";

const CompanyImage = ({ src }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Box
				component="img"
				src={src}
				sx={{
					width: 130,
					boxShadow: 3,
					borderRadius: 5,
				}}
			/>
		</Box>
	);
};

const DetailsPart = ({ supplierDetails }) => {
	return (
		<Box>
			<Typography variant="h5" fontWeight={700} mb={1}>
				{supplierDetails.company}
			</Typography>
			<Typography>
				{supplierDetails.firstName} {supplierDetails.lastName}
			</Typography>
			<Typography>{supplierDetails.email}</Typography>
			<Typography>{supplierDetails.phone}</Typography>
		</Box>
	);
};

export const SupplierRow = ({ supplier }) => {
	const navigate = useNavigate();
	const { picture, ...supplierDetails } = supplier;

	return (
		<Box
			onClick={() => navigate(`/suppliers/${supplier._id}`)}
			sx={{
				display: "grid",
				gridTemplateColumns: "2fr 4fr",
				alignItems: "center",
				boxShadow: 5,
				borderColor: "primary.main",
				border: 1,
				py: 1.7,
				cursor: "pointer",
			}}
		>
			<CompanyImage src={picture} />

			<DetailsPart supplierDetails={supplierDetails} />
		</Box>
	);
};
