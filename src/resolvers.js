import { personnelSignUp, personnelLogin } from "./mutations/auth";
import {
  updatePersonnelUserProfile,
  singleUploadPersonnelDoc,
  createPersonnelReferences,
  updatePersonnelReferences
} from "./mutations/personnel";
import { Query as personnelQueries, PersonnelUser } from "./queries/personnel";

export const resolvers = {
  Query: {
    ...personnelQueries
  },
  Mutation: {
    singleUploadPersonnelDoc,
    personnelSignUp,
    personnelLogin,
    updatePersonnelUserProfile,
    createPersonnelReferences,
    updatePersonnelReferences
  },
  PersonnelUser
};
