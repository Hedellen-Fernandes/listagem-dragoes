import * as mongoose from 'mongoose';
import IUser from '@interfaces/IUser';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
	},
});

UserSchema.pre('save', function (this: IUser, next) {
	if (this.password)
		this.password = bcrypt.hashSync(this.password, 8);

	next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
