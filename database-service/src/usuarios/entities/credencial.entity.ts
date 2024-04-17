import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { NivelAcesso } from "src/common/enums/roles-enum";

@Entity({ name: 'credenciais' })
export class Credencial {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 150, unique: true })
    username: string;
    @Column({ length: 150 })
    senha: string;
    @OneToOne(() => Usuario, (usuario) => usuario.credenciais)
    usuario: Usuario;
    @Column({ type: 'enum', enum: NivelAcesso })
    nivel_acesso: NivelAcesso;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}