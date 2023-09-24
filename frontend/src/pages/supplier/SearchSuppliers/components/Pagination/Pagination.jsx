import "./Pagination.scss";
import { Box } from "@mui/material";
import ReactPaginate from "react-paginate";

export const Pagination = ({ onPageChange, totalPages }) => {
	return (
		<Box className="pagination">
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={(i) => onPageChange(i.selected + 1)}
				pageRangeDisplayed={4}
				pageCount={totalPages}
				previousLabel="<"
				renderOnZeroPageCount={null}
			/>
		</Box>
	);
};
