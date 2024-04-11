import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'Username é obrigatorio' })
    @IsString({ message: 'Username deve ser uma string' })
    username: string;

    @IsNotEmpty({ message: 'Senha é obrigatorio' })
    @IsString({ message: 'Senha deve ser uma string' })
    senha: string;
}
