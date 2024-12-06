"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "mariadb.api.svc.cluster.local",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Post_1.Post, Category_1.Category],
    migrations: [],
    subscribers: [],
});
console.log("Entities carregadas:", exports.AppDataSource.options.entities);
