import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
	async generateToken(email, password) {
		const user = await this.validateUser(email, password);
		if (user) {
			const token = jwt.sign(
				{ email: user.email, role: user.role },
				process.env.JWT_SECRET
			);
			return token;
		}
		return null;
	}

	async validateUser(email, password) {
		const user = await User.findOne({ email });
		if (user) {
			const isPasswordValid = bcrypt.compareSync(password, user.password);
			if (isPasswordValid) {
				return user;
			}
		}
		return null;
	}

	async verifyToken(token) {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({ email: decoded.email }).select(
			"-password"
		);
		return user;
	}
}

// create singleton
const authService = new AuthService();

// singleton
export default authService;
