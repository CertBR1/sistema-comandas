import { IsArray, IsNumber, IsNumberString, IsPositive } from "class-validator";

class ProdutoQuantidade {
    @IsNumber({ allowNaN: false, allowInfinity: false })
    id: number;
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'Quantidade deve ser maior que zero' })
    quantidade: number;
}

export class CreateVendaDto {
    @IsArray()
    produtos: ProdutoQuantidade[];
    @IsNumberString({ no_symbols: true }, { message: 'Comanda inválida1' })
    comanda: number;
}
