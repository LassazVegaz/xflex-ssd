import * as Yup from "yup";

export const formHelpers = {
	suppliers: {
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			company: "",
			picture: "",
		},
		validationSchema: Yup.object().shape({
			firstName: Yup.string().required("First name is required"),
			lastName: Yup.string().required("Last name is required"),
			email: Yup.string()
				.email("Email address is invalid")
				.required("Email address is required"),
			phone: Yup.string().required("Phone number is required"),
			company: Yup.string().required("Company name is required"),
		}),
	},
};
