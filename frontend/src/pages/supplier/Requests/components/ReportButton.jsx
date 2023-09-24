import { useParams } from "react-router-dom";
import { MyButton } from "../../../../components/MyButton/MyButton";

const ReportButton = () => {
	const { id } = useParams();

	const url = `${process.env.REACT_APP_API}/suppliers/${id}/report`;

	return (
		<MyButton
			href={url}
			target="_blank"
			variant="outlined"
			sx={{
				position: "absolute",
				top: 0,
				right: 0,
				py: 0,
				boxShadow: 2,
				textAlign: "center",
			}}
		>
			Generate Report
		</MyButton>
	);
};

export default ReportButton;
