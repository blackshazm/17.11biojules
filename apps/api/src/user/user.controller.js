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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_use_case_1 = require("core-users/application/create-user.use-case");
const create_user_dto_1 = require("./create-user.dto");
let UserController = class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async register(createUserDto) {
        try {
            const user = await this.createUserUseCase.execute(createUserDto);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                commissionRate: user.commissionRate,
                accountStatus: user.accountStatus,
            };
        }
        catch (error) {
            if (error.message.includes('already exists')) {
                throw new common_1.ConflictException(error.message);
            }
            throw error;
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_user_use_case_1.CreateUserUseCase !== "undefined" && create_user_use_case_1.CreateUserUseCase) === "function" ? _a : Object])
], UserController);
//# sourceMappingURL=user.controller.js.map