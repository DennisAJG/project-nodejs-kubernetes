import "reflect-metadata";
import { DataSource } from "typeorm";
import { Post } from "./entity/Post";
import { Category } from "./entity/Category";
export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Post, Category],
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});
