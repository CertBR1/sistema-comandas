import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsString({ message: 'O campo descrição deve ser uma string' })
    @IsNotEmpty({ message: 'O campo descrição não pode ser vazio' })
    descricao: string;

    @IsNotEmpty({ message: 'O campo valor não pode ser vazio' })
    @IsPositive({ message: 'O campo valor deve ser um número positivo' })
    valor: number;

    @IsNotEmpty({ message: 'O campo categoria não pode ser vazio' })
    @IsPositive({ message: 'O campo categoria deve ser um número positivo' })
    categoria: number;
}
