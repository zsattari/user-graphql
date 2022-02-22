import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import Express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import path from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createTypeormConnection } from "./utils/createTypeormConnection";
const PORT = process.env.PORT || 4000;
const ENV = process.env;
const EX = ENV.EX || "ts";
let deleteDB = false;
let log: boolean;
export let deactiveAuthentication = false;
let exit = false;
let isNoSql = false;



async function bootstrap() {
    // await connectMongoDB();
    try {
        if (!isNoSql) {
            const conn = await createTypeormConnection(deleteDB, log);
            await conn.runMigrations();
        }


        /** Building schema here ... */

        const schema = await buildSchema({
            resolvers: [__dirname + `/modules/**/*.resolver.${EX}`]
            // add scalar type for objects
            // scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
            // resolvers: [RegisterResolver, MeResolver],
            // authChecker: customAuthChecker
        });

        /** create the GraphQL server */
        const apolloServer = new ApolloServer({
            schema,
            context: ({ req }) => ({ req }),
            introspection: true,
            uploads: false
        });

        const app = Express();

        const corsOptions = {
            origin: process.env.FRONTEND_URL,
            credentials: true // <-- REQUIRED backend setting
        };
        app.use(cors(corsOptions));

        app.use("/files", Express.static(path.join(__dirname, "/../files")));

        app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

        apolloServer.applyMiddleware({
            app,
            cors: false
        });

        // start the server
        app.listen(PORT);
        console.log(
            `GraphQL Playground available at http://localhost:${PORT}${apolloServer.graphqlPath}`
        );
    } catch (err) {
        console.log("__________", "bootstrapErr", "__________", err);
    }
}

if (exit === false) {
    bootstrap();
} else {
    console.log("please CTRL+C to getting back to commandline");
}
