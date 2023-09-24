import { Box, styled, Typography } from "@mui/material";
import { useContext } from "react";
import RoundPlusButon from "../../../../../components/RoundPlusIcon/RoundPlusButon";
import { DialogContext } from "./DialogContext";
import ItemRow from "./ItemRow";

const TableHeaderText = styled(Typography)(() => ({
	fontWeight: 500,
	flexGrow: 5,
	textAlign: "center",
}));

const HeaderRow = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-evenly",
				alignItems: "center",
				height: 30,
			}}
		>
			<TableHeaderText>Item Code</TableHeaderText>
			<TableHeaderText>Amount</TableHeaderText>
			<Box flexGrow={2} />
		</Box>
	);
};

const MiddleBox = () => {
	const { form } = useContext(DialogContext);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid",
				p: 2,
				rowGap: 2,
				borderRadius: 5,
			}}
		>
			<HeaderRow />

			{form.values.items.map((item, index) => {
				return (
					<ItemRow
						key={item.__id}
						form={form}
						index={index}
						disableDelete={form.values.items.length === 1}
					/>
				);
			})}
		</Box>
	);
};

const MiddleLayer = () => {
	const { addItem } = useContext(DialogContext);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				columnGap: 3,
			}}
		>
			<MiddleBox />

			<RoundPlusButon sideLength={30} onClick={addItem} />
		</Box>
	);
};

export default MiddleLayer;
