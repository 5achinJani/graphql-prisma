import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserType } from "../constants";

export const getHashedPassword = async ({ password }) => {
  const hashed_password = await bcrypt.hash(password, 10);
  return { password: hashed_password };
};

export const jwtSign = ({ id }) => {
  const token = jwt.sign({ userId: id }, process.env.APP_SECRET);
  return { token };
};

export const personnelSignUp = async (parent, args, context) => {
  const {
    data: { email, password: args_password }
  } = args;

  const { password } = await getHashedPassword({ password: args_password });

  const personnelUser = await context.prisma.createPersonnelMeta({
    user: { create: { email, password, type: UserType.PERSONNEL } }
  });

  const { token } = jwtSign({ id: personnelUser.id });
  return {
    token,
    data: personnelUser
  };
};

export const personnelLogin = async (parent, args, context) => {
  const {
    data: { email, password }
  } = args;
  const user = await context.prisma.user({ email });
  if (!user) {
    throw new Error(`No user found for email: ${email}`);
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid password");
  }
  const [personnelUser] = await context.prisma.personnelMetas({
    where: { user: { id: user.id } }
  });

  const { token } = jwtSign({ id: personnelUser.id });

  return {
    token,
    data: personnelUser
  };
};
