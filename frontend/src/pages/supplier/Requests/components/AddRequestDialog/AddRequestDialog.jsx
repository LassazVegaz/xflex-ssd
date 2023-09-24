import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useContext } from "react";
import { MyButton } from "../../../../../components/MyButton/MyButton";
import { DialogContext, DialogContextProvider } from "./DialogContext";
import MiddleLayer from "./MiddleLayer";

const ActualDialog = () => {
	const { form, open, closeDialog } = useContext(DialogContext);

	return (
		<Dialog
			open={open}
			onClose={closeDialog}
			sx={{
				"& .MuiDialog-paper": {
					borderRadius: 5,
				},
			}}
		>
			<Box component="form" onSubmit={form.handleSubmit}>
				<DialogTitle
					sx={{
						textAlign: "center",
					}}
				>
					Send a Request to the Supplier
				</DialogTitle>

				<DialogContent>
					<Box pt={3} />

					<MiddleLayer />
				</DialogContent>

				<DialogActions
					sx={{
						justifyContent: "space-between",
						py: 2,
						px: 3,
					}}
				>
					<MyButton
						variant="outlined"
						onClick={closeDialog}
						color="secondary"
					>
						Cancel
					</MyButton>

					<MyButton variant="contained" type="submit">
						Send
					</MyButton>
				</DialogActions>
			</Box>
		</Dialog>
	);
};

const AddRequestDialog = ({ open, onClose }) => {
	return (
		<DialogContextProvider open={open} onClose={onClose}>
			<ActualDialog />
		</DialogContextProvider>
	);
};

export default AddRequestDialog;
