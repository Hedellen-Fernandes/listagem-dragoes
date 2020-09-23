import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import MongoDbStrategy from '@mongoDbStrategies/mongoDbStrategy';
import UserSchema from '@mongoDbSchemas/UserSchema';

const userSchema = new MongoDbStrategy(UserSchema);

class AuthController {
	async authenticate(req: Request, res: Response) {
		await userSchema.connect();

		const { email, password } = req.body;
		const [user] = await userSchema.read({ email });

		if (!user)
			return res.sendStatus(401);

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword)
			return res.sendStatus(401);

		const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

		user.password = undefined;

		userSchema.disconnect();
		return res.json({
			user,
			token,
		});
	}
}

export default new AuthController();
