
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";
import { permissions } from "./permissions/index";
import { getUserId } from "./common";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [permissions],
  context: context => {
    return {
      ...context,
      prisma,
      app: {
        user: {
          id: getUserId(context)
        }
      }
    };
  }
});

server.start(() =>
  console.log("Server is running on http://localhost:4000. drumrolls.")
);

const testPrisma = () => {
  //place to write prisma operations to check things by getting intellisense.
  prisma.personnelMeta({ id: "sdf" }).documents({ where: { doc_type: "sdf" } });
};
