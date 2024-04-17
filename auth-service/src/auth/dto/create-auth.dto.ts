import { IsNotEmpty, IsString } from "class-validator";

class Credenciais {
    username: string;
    senha: string;
}
export class CreateAuthDto {
    @IsNotEmpty({ message: 'Nenhuma das credenciais pode ser vazia' })
    credenciaisDigitadas: Credenciais;
    @IsNotEmpty({ message: 'Nenhuma das credenciais pode ser vazia' })
    credenciaisBancoDeDados: Credenciais;
}
