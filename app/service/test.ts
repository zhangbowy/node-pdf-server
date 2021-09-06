import { Service } from 'egg';

export default class TestService extends Service {
    public getList() {
        return this.app.model.Role.getList();
    }
}
