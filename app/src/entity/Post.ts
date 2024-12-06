import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @ManyToMany(() => Category, (category) => category.posts)
  @JoinTable()
  categories!: Category[]; // Certifique-se de não inicializar como `= []`
}