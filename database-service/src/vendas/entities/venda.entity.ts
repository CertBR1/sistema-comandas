import { Comanda } from "src/comandas/entities/comanda.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { VendaProduto } from "src/vendas-produtos/entities/vendas-produto.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "vendas" })
export class Venda {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToOne(() => Comanda)
    comanda: Comanda;
    @Column({ nullable: false })
    valor_total: number;
    @OneToMany(() => VendaProduto, vendaProduto => vendaProduto.venda)
    vendaProdutos: VendaProduto[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
