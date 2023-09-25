import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
	});

	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const registerSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/user/register", { ...user });

			localStorage.setItem("firstLogin", true);

			window.location.href = "/";
		} catch (err) {
			alert(err.response.data.msg);
		}
	};

	return (
		<Box display="grid" px={2} mt={5} gridTemplateColumns="auto 1fr">
			<Box
				component="img"
				height="560px"
				src={"/static/images/login1.jpg"}
				alt="yo yo"
			/>

			<Box component="form" onSubmit={registerSubmit} px={10}>
				<Typography variant="h4" textAlign="center">
					Register Form
				</Typography>

				<Box display="flex" flexDirection="column" gap={2} mt={4}>
					<TextField
						size="small"
						type="name"
						name="name"
						required
						label="Name"
						value={user.name}
						onChange={onChangeInput}
					/>

					<TextField
						size="small"
						type="email"
						name="email"
						required
						autoComplete="on"
						label="Email"
						value={user.email}
						onChange={onChangeInput}
					/>

					<TextField
						size="small"
						type="password"
						name="password"
						required
						autoComplete="on"
						label="Password"
						value={user.password}
						onChange={onChangeInput}
					/>
				</Box>

				<Box
					sx={{
						mt: 5,
						display: "flex",
						flexDirection: "column",
						rowGap: 2,
					}}
				>
					<Button variant="contained" type="submit">
						Sign Up
					</Button>

					<Button
						variant="contained"
						color="secondary"
						onClick={() => navigate("login")}
					>
						Sign In
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default Register;
