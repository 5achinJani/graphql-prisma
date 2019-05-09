"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Post",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "UserType",
    embedded: false
  },
  {
    name: "PersonnelDocumentTypes",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "PersonnelMeta",
    embedded: false
  },
  {
    name: "PersonnelDocuments",
    embedded: false
  },
  {
    name: "PersonnelPhotos",
    embedded: false
  },
  {
    name: "PersonnelReferences",
    embedded: false
  },
  {
    name: "PersonnelInterview",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
