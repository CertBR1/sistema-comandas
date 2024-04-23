import { IsNumber, IsNumberString } from "class-validator";

class Produto {
    id: number;
    quantidade: number;
}

export class VendaDto {
    @IsNumberString({ no_symbols: true }, { message: 'Comanda inválida' })
    comanda: number;
    @IsNumber()
    usuarioId: number;
    produtos?: Produto[]
}