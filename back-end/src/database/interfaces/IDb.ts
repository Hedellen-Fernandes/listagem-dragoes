import { DocumentQuery, Query } from "mongoose";
import IUser from "../interfaces/IUser";
class NotImplmentedException extends Error {
	constructor() {
		super('Not Implemented Exception');
	}
}

abstract class IDb {
	create(item: Object): Object {
		throw new NotImplmentedException();
	}

	read(item: Object): Query<any> {
		throw new NotImplmentedException();
	}

	update(id: String, item: Object): DocumentQuery<any, IUser> {
		throw new NotImplmentedException();
	}

	delete(id: String): Query<any> {
		throw new NotImplmentedException();
	}

	isConnected(): String {
		throw new NotImplmentedException();
	}

	connect() {
		throw new NotImplmentedException();
	}
}


export default IDb;
