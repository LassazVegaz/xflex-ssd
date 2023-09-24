import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { formHelpers } from "../../../utils/form.helpers";
import { NotificationManager } from "react-notifications";
import { useScreenLoader } from "../../../hooks/loader.hook";
import { supplierApi } from "../../../utils/supplier.api";

export const useForm = () => {
	const loader = useScreenLoader();
	const navigate = useNavigate();

	const form = useFormik({
		initialValues: formHelpers.suppliers.initialValues,
		validationSchema: formHelpers.suppliers.validationSchema,
		onSubmit: () => {
			createSupplier();
		},
	});

	const createSupplier = async () => {
		loader.show();
		try {
			await _createSupplier();
		} catch (error) {
			NotificationManager.error("Error creating supplier");
			console.error(error);
		}
		loader.hide();
	};

	const _createSupplier = async () => {
		if (await supplierApi.checkEmail(form.values.email)) {
			form.setFieldError(
				"email",
				"This email address already has an account"
			);
		} else if (await supplierApi.checkPhone(form.values.phone)) {
			form.setFieldError(
				"phone",
				"This phone number already has an account"
			);
		} else {
			const _sup = await supplierApi.createSupplier(form.values);
			NotificationManager.success("Supplier created successfully");
			navigate(`/suppliers/${_sup._id}`);
		}
	};

	return form;
};
