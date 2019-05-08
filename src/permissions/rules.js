import { rule } from "graphql-shield";
import { UserType } from "../constants";

export const rules = {
  isAuthenticated: rule()((parent, args, context) => {
    const {
      app: {
        user: { id }
      }
    } = context;
    return Boolean(id);
  }),
  isAdmin: rule()(async (parent, args, context) => {
    const {
      app: {
        user: { id }
      }
    } = context;

    const user = await context.prisma.user({ id });
    if (user.type == UserType.ADMIN) {
      return true;
    }
    return false;
  })
};
