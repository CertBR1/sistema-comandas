import { Comanda } from "src/comandas/entities/comanda.entity";
import { Produto } from "src/produtos/entities/produto.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { VendaProduto } from "src/vendas-produtos/entities/vendas-produto.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "vendas" })
export class Venda {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Comanda, comanda => comanda.vendas)
    comanda: Comanda;
    @Column({ nullable: false })
    valor_total: number;
    @OneToMany(() => VendaProduto, vendaProduto => vendaProduto.venda)
    vendaProdutos: VendaProduto[];
    @ManyToOne(() => Usuario)
    @JoinColumn()
    usuario: Usuario;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
