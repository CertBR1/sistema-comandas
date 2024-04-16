import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(data: CreateAuthDto): Promise<{
        token: string;
    }>;
    decodeToken(data: string): Promise<any>;
}
