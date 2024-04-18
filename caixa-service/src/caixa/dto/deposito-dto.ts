import { IsNumber, IsPositive } from "class-validator"

export class DepositoDto {

    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O valor deve ser positivo' })
    valor: number

    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O PIN deve ser positivo' })
    PIN: string

    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsPositive({ message: 'O ID do usuário deve ser valido' })
    idUsuario: number
}