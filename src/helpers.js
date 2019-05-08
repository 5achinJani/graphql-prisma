import { s3 } from "./services/aws";

export const getUniqueId = () => {
  return Date.now();
};

export const processUpload = async (upload, id = getUniqueId()) => {
  if (!upload) {
    throw new Error(`ERROR: No file received.`);
  }

  const { createReadStream, filename, mimetype, encoding } = await upload;
  const stream = createReadStream();
  const key = `${id}-${filename}`;

  // Upload to S3
  const response = await s3
    .upload({
      Key: key,
      ACL: "public-read",
      Body: stream
    })
    .promise();
  console.log({ response });

  const url = response.Location;

  const file = {
    id,
    filename,
    mimetype,
    encoding,
    url
  };

  console.log({ file });

  return file;
};

export const processMutipleUpload = async files => {
  const result_files = [];

  await Promise.all(
    files.map(async file => {
      const contents = await processUpload(file);
      console.log({ contents });
      result_files.push(contents);
    })
  );
  return result_files;
};

export const removeIdsFromArrObj = ({ array }) => {
  const result = array.map(value => {
    const { id, ...rest } = value;
    return rest;
  });
  return result;
};
