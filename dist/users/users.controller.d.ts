import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
        userId: Promise<string>;
    }>;
    getUser(id: string): Promise<import("./aggregates/user.aggregate").User>;
    findByEmail(email: string): Promise<import("./aggregates/user.aggregate").User>;
}
