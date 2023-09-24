import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import useForm from "./form";
import { supplierRequestApi } from "../../../../../utils/supplier-requests.api";
import { useScreenLoader } from "../../../../../hooks/loader.hook";

let lastId = 0;

const DialogContext = React.createContext();

const DialogContextProvider = ({ children, open, onClose }) => {
	const { id } = useParams();
	const loader = useScreenLoader();

	const form = useForm({
		onSubmit: async (values) => {
			try {
				loader.show();
				await supplierRequestApi.createRequest(id, values.items);
				NotificationManager.success("Request sent successfully");
				closeDialog(true);
			} catch (error) {
				NotificationManager.error("Error sending request");
				console.error(error);
			} finally {
				loader.hide();
			}
		},
	});

	useEffect(() => {
		lastId = 0;
	}, []);

	const addItem = () => {
		const item = {
			__id: ++lastId,
			code: "",
			amount: "",
		};
		form.setFieldValue("items", [...form.values.items, item]);
	};

	const removeItem = (id) => {
		const items = form.values.items.filter((item) => item.__id !== id);
		form.setFieldValue("items", items);
	};

	const closeDialog = (created = false) => {
		form.resetForm();
		onClose(created);
	};

	return (
		<DialogContext.Provider
			value={{
				form,
				addItem,
				removeItem,
				open,
				closeDialog,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};

export { DialogContext, DialogContextProvider };
