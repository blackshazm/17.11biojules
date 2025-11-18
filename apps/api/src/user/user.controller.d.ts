import { CreateUserUseCase } from 'core-users/application/create-user.use-case';
import { CreateUserDto } from './create-user.dto';
export declare class UserController {
    private readonly createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    register(createUserDto: CreateUserDto): Promise<{
        id: any;
        name: any;
        email: any;
        cpf: any;
        commissionRate: any;
        accountStatus: any;
    }>;
}
