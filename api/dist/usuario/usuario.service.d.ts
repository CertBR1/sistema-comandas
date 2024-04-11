import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from './dto/login-dto';
export declare class UsuarioService {
    private readonly databaseService;
    private readonly authService;
    constructor(databaseService: ClientProxy, authService: ClientProxy);
    login(credenciais: LoginDto): Promise<any>;
    create(createUsuarioDto: CreateUsuarioDto): Promise<any>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUsuarioDto: UpdateUsuarioDto): string;
    remove(id: number): string;
}
