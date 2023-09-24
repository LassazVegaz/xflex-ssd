import { Avatar, experimental_sx, styled } from "@mui/material";

const IMG_SIDE = 120;

const MyAvatar = styled(Avatar)(({ theme }) =>
	experimental_sx({
		width: IMG_SIDE,
		height: IMG_SIDE,
		position: "absolute",
		top: -60,
		left: "50%",
		transform: "translateX(-50%)",
		border: `1px solid ${theme.palette.primary.main}`,
	})
);

export const ProfilePic = ({ picture, onPicChnage }) => {
	const onClick = () => {
		const fileSelector = document.getElementById("profile-pic-selector");
		fileSelector.click();
	};

	const onFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const reader = new FileReader();

		reader.onload = (e) => {
			onPicChnage(e.target.result);
		};

		reader.readAsDataURL(file);
	};

	return (
		<>
			<MyAvatar onClick={onClick} src={picture} />

			<input
				type="file"
				hidden
				id="profile-pic-selector"
				accept="image/*"
				onChange={onFileChange}
			/>
		</>
	);
};
