import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
	items: [
		{
			__id: 0,
			code: "",
			amount: "",
		},
	],
};

const validationSchema = Yup.object().shape({
	items: Yup.array().of(
		Yup.object().shape({
			code: Yup.string().required("Required"),
			amount: Yup.number()
				.required("Required")
				.positive("Amount must be positive")
				.integer("Amount must be a number")
				.typeError("Amount must be a number"),
		})
	),
});

const useForm = ({ onSubmit }) => {
	const form = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	});

	return form;
};

export default useForm;
