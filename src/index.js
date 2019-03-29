
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";
import typeDefs from "./schema.graphql";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma
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
