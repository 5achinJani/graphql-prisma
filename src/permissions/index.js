import { shield, and, allow, deny } from "graphql-shield";
import { rules } from "./rules";

export const permissions = shield({
  Query: {
    personnelUser: rules.isAuthenticated,
    personnelUsers: rules.isAuthenticated,
    getPersonnelUsers: rules.isAuthenticated,
    users: and(rules.isAuthenticated, rules.isAdmin)
  },
  Mutation: {
    personnelSignUp: allow,
    personnelLogin: allow,
    updatePersonnelUserProfile: rules.isAuthenticated,
    singleUploadPersonnelDoc: rules.isAuthenticated,
    createPersonnelReferences: rules.isAuthenticated,
    updatePersonnelReferences: rules.isAuthenticated,
  }
});
