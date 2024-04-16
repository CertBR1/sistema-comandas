import { BeforeInsert, Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Deposito } from "../../depositos/entities/deposito.entity";
import { Venda } from "src/vendas/entities/venda.entity";

@Entity({ name: "comandas" })
export class Comanda {
    @PrimaryGeneratedColumn()
    id: number;
    @Index({ unique: true })
    @Column()
    pin: string;
    @Column({ default: false })
    status: boolean;
    @Column({ default: 0 })
    saldo: number;
    @OneToMany(() => Deposito, (deposito) => deposito.comanda)
    depositos: Deposito[];
    @OneToMany(() => Venda, (venda) => venda.comanda)
    vendas: Venda[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @BeforeInsert()
    generatePin() {
        this.pin = Math.floor(1000 + Math.random() * 9000).toString();
    }
}
