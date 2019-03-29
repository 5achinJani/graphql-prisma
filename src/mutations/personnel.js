import { processUpload } from "../helpers";
import { personnel_document_type } from "../constants";

export const updatePersonnelUserProfile = async (root, args, context, info) => {
  const { data } = args;

  const {
    user = {},
    id,
    driving_licence_id,
    biograhpy,
    experience,
    certification,
    social_security_number
  } = data;

  const personnelUser = await context.prisma.updatePersonnelMeta({
    data: {
      driving_licence_id,
      biograhpy,
      experience,
      certification,
      social_security_number,
      user: { update: { ...user } }
    },
    where: { id }
  });

  return personnelUser;
};

export const uploadPersonnelDocs = async (root, args, context, info) => {
  const { data } = args;
};

export const singleUploadPersonnelDoc = async (root, args, context, info) => {
  const {
    input: { file, doc_type, personnel_id, doc_id = "" }
  } = args;
  console.log({ args });
  console.log({ args_file: file });

  if (!personnel_document_type[doc_type]) {
    // handled by graphql enum by default
    throw new Error("Invalid document type");
  }
  const doc_name = personnel_document_type[doc_type].name;

  if (!doc_id) {
    //check if the doc_type entry already exists for doc_type who have isMultipleAllowed = false
    /* following query returns an object instead of array so using prisma.$graphql instead  */
    /*
    const doesDocExists = context.prisma
      .personnelMeta({ id: personnel_id })
      .documents({ where: { doc_type } });
      */

    const query = `
            query  {
              personnelMeta(where: { id: "${personnel_id}" }) {
                documents(where: { doc_type: ${doc_type} }) {
                  id
                  doc_type
                }
              }
            }`;
    const {
      personnelMeta: { documents }
    } = await context.prisma.$graphql(query);
    console.log({ documents, doc: documents[0] });

    const doesDocExists = documents.length;
    const isMultipleAllowed =
      personnel_document_type[doc_type].isMultipleAllowed;
    console.log({
      doesDocExists,
      isMultipleAllowed
    });
    if (doesDocExists && !isMultipleAllowed) {
      throw new Error(
        `${doc_name} already exist and cannot have mutiple ${doc_name}`
      );
    }
  }

  const response_file = await processUpload(
    file,
    `${personnel_id}-${doc_type}`
  );
  const { filename, encoding, mimetype, url } = response_file;

  const updatedPersonnel = context.prisma.updatePersonnelMeta({
    where: { id: personnel_id },
    data: {
      documents: {
        upsert: {
          update: { doc_type, doc_name, filename, encoding, mimetype, url },
          where: { id: doc_id },
          create: { doc_type, doc_name, filename, encoding, mimetype, url }
        }
      }
    }
  });
  console.log({ updatedPersonnel });
  return updatedPersonnel;
};

export const createPersonnelReferences = async (root, args, context, info) => {
  const { data } = args;

  const { personnel_id, references } = data;

  const personnelUser = await context.prisma.updatePersonnelMeta({
    data: {
      references: {
        create: references
      }
    },
    where: { id: personnel_id }
  });

  return personnelUser;
};

export const updatePersonnelReferences = async (root, args, context, info) => {
  const { data } = args;

  const { personnel_id, references } = data;

  const query = references.map(value => {
    const { id, ...rest } = value;
    return {
      where: { id },
      data: {
        ...rest
      }
    };
  });

  const personnelUser = await context.prisma.updatePersonnelMeta({
    data: {
      references: {
        update: query
      }
    },
    where: { id: personnel_id }
  });

  return personnelUser;
};
