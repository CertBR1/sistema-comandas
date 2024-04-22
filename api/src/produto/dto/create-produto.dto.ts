import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
    @IsNotEmpty({ message: 'O campo descrição é obrigatório' })
    @IsString({ message: 'O campo descrição deve ser uma string' })
    descricao: string;

    @IsNotEmpty({ message: 'O campo valor é obrigatório' })
    @IsPositive({ message: 'O campo valor deve ser um número positivo' })
    valor: number;

    @IsNotEmpty({ message: 'O campo categoria é obrigatório' })
    @IsString({ message: 'O campo categoria deve ser uma string' })
    categoria: string;
}
