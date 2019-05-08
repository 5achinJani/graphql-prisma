import nodemailer from "nodemailer";
import Email from "email-templates";
import { aws, aws_config } from "./aws";
import path from "path";
import { path as appRootPath } from "app-root-path";

const sendMailDefaults = {
  from: "your.mail@yourmail.com"
};

const emailMessageDefaults = {
  to: "tomail.j@tomail.com"
};

// create Nodemailer SES transporter
const transport = nodemailer.createTransport({
  SES: new aws.SES({
    region: "us-east-1"
  })
});
console.log({
  __dirname,
  env: process.env.NODE_ENV,
  NODE_PATH: process.env.NODE_PATH,
  appRootPath
});
// const root = path.join(__dirname, "emails");
// const root = path.resolve(appRootPath, "src", "services", "emails");
const root = path.resolve(appRootPath, "build", "emails");
console.log({ root });

const email = new Email({
  message: {
    ...sendMailDefaults
  },
  transport,
  views: {
    options: {
      extension: "ejs"
    },
    root
  },
  // send: true
  // textOnly: true
  // uncomment below to send emails in development/test env:
  send: process.env.NODE_ENV == "development" ? false : true
});

export const testMailSend = async () => {
  console.log("testMailSend");

  console.log({ __dirname, env: process.env.NODE_ENV });
  return email
    .send({
      template: "leads",
      message: {
        to: "test.mail@tempmail.com"
      },
      locals: {
        data: {
          name: "John Doe",
          email: "john.doe@tempmail.com",
          phone: "8545214569",
          company: "lorem"
        }
      }
    })
    .then(() => {
      console.log("email sent success");
    })
    .catch(error => {
      console.error("Failed to send email", error);
    });
};
// testMailSend();

export const sendLeadEmail = async ({ data }) => {
  console.log("sendLeadEmail -- ");
  console.log({ __dirname, env: process.env.NODE_ENV });
  return email
    .send({
      template: "leads",
      message: {
        to: emailMessageDefaults.to
      },
      locals: {
        data
      }
    })
    .then(() => {
      console.log("email sent success");
    })
    .catch(error => {
      console.error("Failed to send email", error);
    });
};
