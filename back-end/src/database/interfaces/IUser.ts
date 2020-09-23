import { Document } from 'mongoose';

export default interface IUser extends Document {
	email: String,
	firstName: String,
	lastName: String,
	password: string,
}
