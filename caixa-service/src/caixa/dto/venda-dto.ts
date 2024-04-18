class Produto {
    id: number;
    quantidade: number;
}

export class VendaDto {
    id: number;
    comanda: number;
    valor_total: number;
    produtos?: Produto[]
}