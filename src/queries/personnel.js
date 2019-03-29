export const Query = {
  users: (root, args, context) => {
    return context.prisma.users();
  },
  personnelUser: async (root, args, context) => {
    const { id } = args;
    return context.prisma.personnelMeta({ id });
  },
  personnelUsers: (root, args, context) => {
    return context.prisma.personnelMetas();
  }
};

export const PersonnelUser = {
  user: async (parent, args, context, info) => {
    const { id } = parent;
    return context.prisma.personnelMeta({ id }).user();
  },
  documents: async (parent, args, context, info) => {
    const { id } = parent;
    return context.prisma.personnelMeta({ id }).documents();
  },
  references: async (parent, args, context, info) => {
    const { id } = parent;
    return context.prisma.personnelMeta({ id }).references();
  }
};
