import { IsNumber, IsNumberString, IsPositive } from "class-validator";

export class CreateDepositoDto {

    @IsPositive({ message: 'O valor precisa ser positivo' })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'O valor precisa ser um número' })
    valor: number;

    @IsNumberString({ no_symbols: true }, { message: 'O id da comanda precisa ser um número' })
    @IsPositive({ message: 'O id da comanda precisa ser valido' })
    comandaId: number;

    @IsNumberString({ no_symbols: true }, { message: 'O id do usuário precisa ser um número' })
    @IsPositive({ message: 'O id do usuário precisa ser valido' })
    usuarioId: number;
}
