import { TextField } from "@mui/material";

export const MUIFormikTextField = ({
	form,
	name,
	label,
	component,
	...props
}) => {
	const Comp = component || TextField;

	return (
		<Comp
			label={label}
			name={name}
			value={form.values[name]}
			onChange={form.handleChange}
			error={form.touched[name] && Boolean(form.errors[name])}
			helperText={form.touched[name] && form.errors[name]}
			{...props}
		/>
	);
};
