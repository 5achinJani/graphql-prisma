
import aws from "aws-sdk";

const bucket_name = "app-docs";
const s3 = new aws.S3({
  params: { Bucket: bucket_name },
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY
});

export const processUpload = async (upload, id) => {
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
