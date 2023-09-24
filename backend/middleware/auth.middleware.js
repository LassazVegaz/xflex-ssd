import authService from "../services/auth.service";

const authenticate = async (req, res, next) => {
	try {
		const token = req.headers["authorization"]?.split(" ")[1];
		if (token) {
			const data = await authService.verifyToken(token);
			req.user = data;
			next();
		} else {
			res.status(403).json({
				message: "No token provided",
			});
		}
	} catch (error) {
		next(error);
	}
};

export default authenticate;
