import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "mariadb.api.svc.cluster.local",
  port: 3306,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true, // Somente em desenvolvimento
  logging: false,
  entities: [Post, Category], // Certifique-se de incluir todas as entidades
  migrations: [],
  subscribers: [],
});

console.log("Entities carregadas:", AppDataSource.options.entities);
