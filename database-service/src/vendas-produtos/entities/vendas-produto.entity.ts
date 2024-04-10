// VendaProduto.entity.ts
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";
import { Venda } from "src/vendas/entities/venda.entity";

@Entity({ name: "vendas_produtos" })
export class VendaProduto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantidade: number;

    @ManyToOne(() => Produto, produto => produto.vendaProdutos)
    @JoinColumn({ name: "id_produto" })
    produto: Produto;

    @ManyToOne(() => Venda, venda => venda.vendaProdutos)
    @JoinColumn({ name: "id_venda" })
    venda: Venda;
}