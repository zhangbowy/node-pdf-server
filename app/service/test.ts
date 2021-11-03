import { Service } from 'egg';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default class TestService extends Service {
    public getList() {
        return prisma.role.findMany({});
    }
}
