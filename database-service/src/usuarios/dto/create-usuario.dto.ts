import { IsEnum, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { NivelAcesso } from "src/common/enums/roles-enum";

class Credenciais {
    @IsNotEmpty({ message: 'Nome de usuário obrigatório' })
    @IsString({ message: 'Nome de usuário deve ser uma string' })
    username: string;

    @IsNotEmpty({ message: 'Senha obrigatória' })
    @IsString({ message: 'Senha deve ser uma string' })
    senha: string;

    @IsEnum(NivelAcesso, { message: 'Nível de acesso inválido' })
    nivel_acesso: NivelAcesso;
}
export class CreateUsuarioDto {
    @IsNotEmpty({ message: 'Nome obrigatório' })
    @IsString({ message: 'Nome deve ser uma string' })
    nome: string;

    @IsNotEmpty({ message: 'Sobrenome obrigatório' })
    @IsString({ message: 'Sobrenome deve ser uma string' })
    sobrenome: string;

    @ValidateNested()
    credenciais: Credenciais;
}
