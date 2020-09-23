import InterfaceDb from '@interfaces/IDb';
import IdbContextStrategy from '@interfaces/IDbContextStrategy';
class ContextStrategy extends InterfaceDb {
  dataBase: IdbContextStrategy;

  constructor(database: IdbContextStrategy) {
    super();
    this.dataBase = database;
  }

  create(item: Object) {
    this.dataBase.create();
  }
  read(item: Object) {
    this.dataBase.read();
  }
  update(item: Object) {
    this.dataBase.update();
  }
  delete(item: Object) {
    this.dataBase.delete();
  }
}

export default ContextStrategy;
