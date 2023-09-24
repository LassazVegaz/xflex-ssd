import { Helmet } from "react-helmet";
import { PageContainer } from "../../../components/PageContainer/PageContainer";
import { PageHeading } from "../../../components/PageHeading/PageHeading";
import { SupplierForm } from "../../../components/SupplierForm/SupplierForm";
import { useForm } from "./form.hook";

export const CreateSupplierPage = () => {
	const form = useForm();

	const onReset = () => {
		form.resetForm();
	};

	return (
		<PageContainer>
			<Helmet>
				<title>Create a Supplier</title>
			</Helmet>

			<PageHeading text="Create a Supplier" />

			<SupplierForm
				form={form}
				onReset={onReset}
				primaryButtonText="Create"
			/>
		</PageContainer>
	);
};
