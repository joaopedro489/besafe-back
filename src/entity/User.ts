import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BeforeInsert, BeforeUpdate} from "typeorm";
import bcrypt from "bcrypt";
import { Product } from "./Product";
import { Length, IsEmail, IsAlpha } from 'class-validator';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 20, {
         message: "O nome precisa ter entre 2 e 20 caracteres"
    })
    @IsAlpha('pt-BR', {
         message: "Apenas letras são aceitas."
    })
    firstName: string;

    @Column()
    @IsAlpha('pt-BR', {
         message: "Apenas letras são aceitas."
     })
    lastName: string;

    @Column()
    dateOfBirth: Date;

    @Column({ unique: true })
    @IsEmail({ 
         message: "Preencha com um endereço de email"
    })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Product, product => product.user,{ onDelete: 'CASCADE' })
    products: Product[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    @BeforeInsert()
   	async hashPassword(){
        this.password = await bcrypt.hash(this.password, 12);
   	}
}
