import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import { PageContainer } from "../../../components/PageContainer/PageContainer";
import SmallLoader from "../../../components/SmallLoader/SmallLoader";
import { Pagination } from "./components/Pagination/Pagination";
import { SearchBox } from "./components/SearchBox";
import { SupplierRow } from "./components/SupplierRow";
import { useSearchSuppliers } from "./search-suppliers.hook";

const SEARCH_ARE_MIN_HEIGHT = "30vh";

const SearchResults = ({ suppliers }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 4,
				minHeight: SEARCH_ARE_MIN_HEIGHT,
			}}
		>
			{suppliers.map((supplier) => (
				<SupplierRow key={supplier._id} supplier={supplier} />
			))}
		</Box>
	);
};

export const SearchSuppliersPage = () => {
	const search = useSearchSuppliers();

	return (
		<PageContainer>
			<Helmet>
				<title>Search Suppliers</title>
			</Helmet>

			<SearchBox
				text={search.searchText}
				onChange={(e) => search.setSearchText(e.target.value)}
			/>

			<Box pt={8}></Box>

			{search.isLoading ? (
				<SmallLoader minHeight={SEARCH_ARE_MIN_HEIGHT} />
			) : (
				<SearchResults suppliers={search.suppliers} />
			)}

			<Box pt={5}></Box>

			<Pagination
				onPageChange={search.setPageNo}
				totalPages={search.totalPages}
			/>

			<Box pt={3}></Box>
		</PageContainer>
	);
};
