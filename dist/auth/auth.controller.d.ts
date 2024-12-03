import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: {
        email: string;
        password: string;
    }): Promise<{
        access_token: {
            access_token: string;
        };
    }>;
    getTasksByProject(token: string): Promise<import("../users/aggregates/user.aggregate").User>;
}
