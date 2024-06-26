import { VendaProduto } from "src/vendas-produtos/entities/vendas-produto.entity";
import { Venda } from "src/vendas/entities/venda.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Categoria } from "./categoria.entity";

@Entity({ name: "produtos" })
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false, unique: true })
    descricao: string;
    @Column({ nullable: false })
    valor: number;
    @OneToMany(() => VendaProduto, vendaProduto => vendaProduto.produto)
    vendaProdutos: VendaProduto[];
    @OneToOne(() => Categoria)
    @JoinColumn()
    categoria: Categoria;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
