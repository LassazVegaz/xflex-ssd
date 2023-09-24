import { Container, experimental_sx, styled } from "@mui/material";

export const MyContainer = styled(Container)(() =>
	experimental_sx({
		my: 4,
	})
);

export const PageContainer = (props) => {
	const { children, ...rest } = props;

	return (
		<MyContainer {...rest} maxWidth="lg">
			{children}
		</MyContainer>
	);
};
