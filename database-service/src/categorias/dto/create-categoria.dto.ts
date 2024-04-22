import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {
    @IsString({ message: 'Descrição inválida.' })
    @IsNotEmpty({ message: 'Descrição inválida.' })
    descricao: string
}
