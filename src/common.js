import { env } from "./env";
import { verify } from "jsonwebtoken";

export const getUserId = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const verifiedToken = verify(token, env.APP_SECRET);
    return verifiedToken && verifiedToken.id;
  }
};
