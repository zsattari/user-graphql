import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const createTypeormConnection = (reCreation: boolean, log: boolean = false) => {
    const DB_USER = process.env.DB_USER;
    const DB_PASS = process.env.DB_PASS;
    const DB_NAME = process.env.DB_NAME;
    const DB = process.env.DB;
    const DB_PORT = process.env.DB_PORT;
    const NODE_ENV = process.env.NODE_ENV;

    if (NODE_ENV !== "production") {
        console.log(
            `\nDB: ${DB},\nDB_PORT: ${DB_PORT},\nDB_USER: ${DB_USER},\nDB_PASS: ${DB_PASS},\nDB_NAME: ${DB_NAME},\nNODE_ENV: ${NODE_ENV}\n`
        );
    }

    const config: PostgresConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: Number(DB_PORT),
        username: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        synchronize: NODE_ENV !== "production",
        logging: log,
        dropSchema: reCreation,
        entities: ["src/entity/*.*"],
        migrations: ["src/migration/*.ts"],
        subscribers: ["src/subscribers/*.subscriber.ts"],
        cli: {
            migrationsDir: "src/migration"
        }
    };

    return createConnection(config);
};
