import aws from "aws-sdk";
const bucket_name = "aws-bucket-name";
export const aws_config = aws.config.update({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY
});

export const s3 = new aws.S3({
  params: { Bucket: bucket_name },
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY
});

export { aws };
