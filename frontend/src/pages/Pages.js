import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import DeliveryHome from "./cart/DeliveryHome";
import DeliveryCreate from "./cart/DeliveryCreate";
import DeliveryOffers from "./cart/DeliveryOffers";
import DeliveryCharges from "./cart/DeliveryCharges";
import AdminDeliveryHome from "./admin_delivery/AdminDeliveryHome";
import ShowOrderDetails from "./admin_delivery/ShowOrderDetails";
import CreateOffers from "./admin_delivery/CreateOffers";
import UpdateOffers from "./admin_delivery/UpdateOffers";
import UpdateOffers2 from "./admin_delivery/UpdateOffers2";

import { GlobalState } from "../GlobalState";
import { CreateSupplierPage } from "./supplier/CreateSupplier/CreateSupplierPage";
import { ViewSupplierPage } from "./supplier/ViewSupplier/ViewSupplierPage";
import { SearchSuppliersPage } from "./supplier/SearchSuppliers/SearchSuppliersPage";
import RequestsPage from "./supplier/Requests/RequestsPage";

function Pages() {
	const state = useContext(GlobalState);
	const [isLogged] = state.userAPI.isLogged;
	const [isAdmin] = state.userAPI.isAdmin;

	return (
		<Routes>
			<Route path="/" element={<Products />} />
			<Route path="/detail/:id" element={<DetailProduct />} />

			{!isLogged && (
				<>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</>
			)}

			{isAdmin && (
				<>
					<Route path="/category" element={<Categories />} />
					<Route path="/create_product" element={<CreateProduct />} />
					<Route
						path="/edit_product/:id"
						element={<CreateProduct />}
					/>
				</>
			)}

			{isLogged && (
				<>
					<Route path="/history" element={<OrderHistory />} />
					<Route path="/history/:id" element={<OrderDetails />} />
				</>
			)}

			<Route path="/AdminDeliveryHome" element={<AdminDeliveryHome />} />
			<Route path="/ShowOrderDetails" element={<ShowOrderDetails />} />
			<Route path="/CreateOffers" element={<CreateOffers />} />
			<Route path="/UpdateOffers" element={<UpdateOffers />} />
			<Route path="/UpdateOffers2/:id" element={<UpdateOffers2 />} />

			<Route path="/cart" element={<Cart />} />
			<Route path="/DeliveryHome" element={<DeliveryHome />} />
			<Route path="/DeliveryCreate" element={<DeliveryCreate />} />
			<Route path="/DeliveryCharges" element={<DeliveryCharges />} />
			<Route path="/DeliveryOffers" element={<DeliveryOffers />} />

			<Route path="/suppliers/create" element={<CreateSupplierPage />} />
			<Route path="/suppliers" element={<SearchSuppliersPage />} />
			<Route path="/suppliers/:id" element={<ViewSupplierPage />} />

			<Route path="/suppliers/:id/requests" element={<RequestsPage />} />

			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default Pages;
