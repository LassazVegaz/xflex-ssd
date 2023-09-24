import { Box, experimental_sx as sx, styled, TextField } from "@mui/material";
import { MyButton } from "../MyButton/MyButton";
import { MUIFormikTextField } from "./MUIFormikTextField";
import { ProfilePic } from "./ProfilePic";

export const MyBox = styled(Box)(() =>
	sx({
		mt: 15,
		mb: 9,
		pt: 14,
		pb: 6,
		px: 6,
		borderColor: "primary.main",
		border: 1,
		boxShadow: 5,
		borderRadius: 10,
		display: "flex",
		flexDirection: "column",
		rowGap: 5,
		position: "relative",
		width: "750px",
	})
);

const SmallTextField = styled(TextField)(() =>
	sx({
		width: "32%",
	})
);

const ButtonsLayer = ({ onReset, showDelete, onDelete, primaryButtonText }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<MyButton variant="outlined" type="reset" onClick={onReset}>
				Reset
			</MyButton>
			<MyButton variant="contained" type="submit">
				{primaryButtonText}
			</MyButton>
			{showDelete && (
				<MyButton
					variant="outlined"
					color="secondary"
					type="reset"
					onClick={onDelete}
				>
					Delete
				</MyButton>
			)}
		</Box>
	);
};

export const SupplierForm = ({
	form,
	onReset,
	showDelete,
	onDelete,
	primaryButtonText,
	sx,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<MyBox component="form" onSubmit={form.handleSubmit} sx={sx}>
				<ProfilePic
					picture={form.values.picture}
					onPicChnage={(pic) => form.setFieldValue("picture", pic)}
				/>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<MUIFormikTextField
						form={form}
						name="firstName"
						label="First Name"
						component={SmallTextField}
					/>
					<MUIFormikTextField
						form={form}
						name="lastName"
						label="Last Name"
						component={SmallTextField}
					/>
				</Box>

				<MUIFormikTextField
					form={form}
					name="email"
					label="Email"
					type="email"
				/>
				<MUIFormikTextField
					form={form}
					name="phone"
					label="Phone Number"
					type="tel"
				/>
				<MUIFormikTextField
					form={form}
					name="company"
					label="Company Name"
				/>

				<Box pt={5}></Box>

				<ButtonsLayer
					onReset={onReset}
					showDelete={showDelete}
					onDelete={onDelete}
					primaryButtonText={primaryButtonText}
				/>
			</MyBox>
		</Box>
	);
};
