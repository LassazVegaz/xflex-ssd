import { DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { Box, IconButton, styled, TextField } from "@mui/material";
import { useContext } from "react";
import { DialogContext } from "./DialogContext";

const getFieldProps = (form, index, field) => ({
	name: `items[${index}].${field}`,
	value: form.values.items[index][field],
	error: form.errors.items && form.errors.items[index]?.[field],
	touched: form.touched.items && form.touched.items[index]?.[field],
});

const MyTextFieldStyled = styled(TextField)(() => ({
	"& legend": { display: "none" },
	"& fieldset": { top: 0 },
}));

const MyTextField = ({ form, index, field }) => {
	const props = getFieldProps(form, index, field);

	return (
		<MyTextFieldStyled
			size="small"
			name={props.name}
			value={props.value}
			onChange={form.handleChange}
			error={props.touched && Boolean(props.error)}
			helperText={props.touched && props.error}
		/>
	);
};

const ItemRow = ({ form, index, disableDelete = false }) => {
	const { removeItem } = useContext(DialogContext);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				columnGap: 3,
			}}
		>
			<MyTextField form={form} index={index} field="code" />

			<MyTextField form={form} index={index} field="amount" />

			<IconButton
				onClick={() => removeItem(form.values.items[index].__id)}
				disabled={disableDelete}
			>
				<DeleteIcon color={disableDelete ? "disabled" : "secondary"} />
			</IconButton>
		</Box>
	);
};

export default ItemRow;
