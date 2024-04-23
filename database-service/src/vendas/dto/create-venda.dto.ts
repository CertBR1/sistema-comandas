class Produto {
    id: number
    quantidade: number
}
export class CreateVendaDto {
    valor_total: number;
    comandaId: number;
    usuarioId: number;
    produtos: Produto[];
}
