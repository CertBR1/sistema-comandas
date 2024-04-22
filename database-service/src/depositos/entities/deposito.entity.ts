import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comanda } from "../../comandas/entities/comanda.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";

@Entity({ name: "depositos" })
export class Deposito {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Comanda, comanda => comanda.depositos)
    comanda: Comanda;
    @Column({ nullable: false })
    valor: number;
    @ManyToOne(() => Usuario, usuario => usuario.depositos)
    usuario: Usuario
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}