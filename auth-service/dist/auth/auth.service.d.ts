import { CreateAuthDto } from './dto/create-auth.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly databaseService;
    private readonly jwtService;
    constructor(databaseService: ClientProxy, jwtService: JwtService);
    login(data: CreateAuthDto): Promise<{
        access_token: string;
    }>;
    decodeToken(data: string): Promise<any>;
}
