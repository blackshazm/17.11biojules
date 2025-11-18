"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const user_entity_1 = require("../../../packages/core-users/src/domain/user.entity");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            return null;
        return new user_entity_1.User(user);
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user)
            return null;
        return new user_entity_1.User(user);
    }
    async findByCpf(cpf) {
        const user = await this.prisma.user.findUnique({ where: { cpf } });
        if (!user)
            return null;
        return new user_entity_1.User(user);
    }
    async save(user) {
        await this.prisma.user.upsert({
            where: { id: user.id },
            update: { ...user },
            create: { ...user },
        });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map