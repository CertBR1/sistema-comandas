import { VendaProduto } from "src/vendas-produtos/entities/vendas-produto.entity";
import { Venda } from "src/vendas/entities/venda.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "produtos" })
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    descricao: string;
    @Column({ nullable: false })
    valor: number;
    @OneToMany(() => VendaProduto, vendaProduto => vendaProduto.produto)
    vendaProdutos: VendaProduto[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
