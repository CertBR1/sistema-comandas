import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: 'Descrição deve ser uma string' })
    @IsNotEmpty({ message: 'Descrição não pode ser vazio' })
    descricao: string;
}