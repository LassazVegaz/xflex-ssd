import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { PageContainer } from "../../../components/PageContainer/PageContainer";
import { PageHeading } from "../../../components/PageHeading/PageHeading";
import { MyButton } from "../../../components/MyButton/MyButton";
import { SupplierForm } from "../../../components/SupplierForm/SupplierForm";
import { useViewSupplier } from "./view-supplier.hook";
import { Box } from "@mui/material";

const RequestsButton = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<MyButton
				variant="outlined"
				onClick={() => navigate(`/suppliers/${id}/requests`)}
				sx={{
					width: "auto",
				}}
			>
				View Requests
			</MyButton>
		</Box>
	);
};

export const ViewSupplierPage = () => {
	const { id } = useParams();
	const { form, reset, deleteSupplier } = useViewSupplier(id);

	return (
		<PageContainer>
			<Helmet>
				<title>
					Supplier: {form.values.firstName} {form.values.lastName}
				</title>
			</Helmet>

			<PageHeading text="This is one of your Suppliers" />

			<SupplierForm
				form={form}
				onReset={reset}
				showDelete
				onDelete={deleteSupplier}
				primaryButtonText="Update"
				sx={{
					mb: 6,
				}}
			/>

			<RequestsButton />

			<Box pt={6}></Box>
		</PageContainer>
	);
};
