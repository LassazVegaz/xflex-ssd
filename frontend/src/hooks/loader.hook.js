import { useDispatch } from "react-redux";
import { screenLoaderActions } from "../redux/slices/screen-loader.slice";

export const useScreenLoader = () => {
	const dispatch = useDispatch();

	const show = () => dispatch(screenLoaderActions.show());
	const hide = () => dispatch(screenLoaderActions.hide());

	return { show, hide };
};
