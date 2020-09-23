import MongoDbStrategy from '../mongoDbStrategy';
import UserSchema from '../schemas/UserSchema';
import ConnectionStateEnum from '../enums/ConnectionState';
import { User } from '../../../../types/types';

const mongoDbContext = new MongoDbStrategy(UserSchema);

let mockUser: User = generateNewUser();
let mockUserId: String;

function generateNewUser(): User {
	return {
		email: `${new Date().getTime()}@gmail.com`,
		firstName: `${new Date().getTime()}`,
		lastName: `${new Date().getFullYear()}`,
		password: '123456'
	}
}

function returnUser(res: User): User {
	return {
		email: res.email,
		firstName: res.firstName,
		lastName: res.lastName,
		password: res.password
	}
}

describe('MongoDb Tests Suite', () => {

	beforeAll(async () => {
		await mongoDbContext.connect();
		mockUserId = await mongoDbContext.create(mockUser).then(res => res._id);
	});

	afterAll(async () => {
		await mongoDbContext.disconnect();
	});

	describe('Connection Tests', () => {
		test('Should return status connection', async () => {
			const isConnected = await mongoDbContext.isConnect();

			expect(isConnected).toEqual(ConnectionStateEnum.Connected);
		});
	});

	describe('CRUD Tests', () => {
		test('Should create and return new User', async () => {
			const newUserMock = generateNewUser();
			let insertedUser = await mongoDbContext.create(newUserMock).then(res => returnUser(res));

			expect(insertedUser).toEqual(newUserMock);
		});

		test('Should read all users', async () => {
			let usersFound = await mongoDbContext.read({});

			expect(usersFound).toHaveLength;
		});

		test('Should read specif user', async () => {
			let userFound = await mongoDbContext.read({ _id: mockUserId }).then(res => returnUser(res.shift()));

			expect(userFound).toEqual(mockUser);
		});

		test('Should update and return user updated', async () => {
			let result = await mongoDbContext.update(mockUserId, { email: `${new Date().getTime()}@gmail.com` });
			expect(result.nModified).toEqual(1);
		});

		test('Should delete and return new User', async () => {
			let result = await mongoDbContext.delete(mockUserId);

			expect(result.deletedCount).toEqual(1)

		});
	});
})
