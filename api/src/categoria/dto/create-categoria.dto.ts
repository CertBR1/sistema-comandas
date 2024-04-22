import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsNotEmpty({ message: 'Descrição não pode ser vazio.' })
    @IsString({ message: 'Descrição deve ser uma string.' })
    descricao: string
}
