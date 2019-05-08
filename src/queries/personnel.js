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
  },
  getPersonnelUsers: (root, args, context) => {
    console.log({ args });

    const { data: { filters = {}, pagination = {} } = {} } = args;
    console.log({ filters });

    const {
      tier_level = undefined,
      doc_type = undefined,
      search = undefined
    } = filters;

    let user_or = {},
      documents_or = {},
      tier_level_or = {};
    if (search) {
      user_or = {
        user: {
          OR: [
            { city_contains: search },
            { address_contains: search },
            { zip_contains: search }
          ]
        }
      };
    }

    if (doc_type) {
      documents_or = { documents_some: { doc_type } };
    }

    if (tier_level) {
      tier_level_or = { tier_level };
    }

    return context.prisma.personnelMetas({
      where: {
        AND: [
          {
            OR: [
              {
                ...user_or
              },
              { ...documents_or },
              { ...tier_level_or }
            ]
          },
          { status: personnel_application_status.HIRED.id }
        ]
      },
      ...pagination
    });
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
