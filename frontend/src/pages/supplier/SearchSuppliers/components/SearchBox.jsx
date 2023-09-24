import { Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";

export const SearchBox = ({ text, onChange }) => {
	return (
		<Box className="search-box">
			<OutlinedInput
				placeholder="Search"
				value={text}
				onChange={onChange}
				fullWidth
				startAdornment={
					<InputAdornment position="start">
						<SearchIcon />
					</InputAdornment>
				}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={() => onChange({ target: { value: "" } })}
						>
							<CloseIcon />
						</IconButton>
					</InputAdornment>
				}
				sx={{
					borderRadius: 50,
					"& legend": { display: "none" },
					"& fieldset": { top: 0 },
				}}
			/>
		</Box>
	);
};
