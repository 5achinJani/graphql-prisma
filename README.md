

## Tools

- **[graphql-yoga](https://github.com/prisma/graphql-yoga):** 🧘 Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience 
- **[Prisma](https://www.prisma.io/):** Database Tools incl. ORM, Migrations and Admin UI (Postgres, MySQL & MongoDB)
- **[Backpack](https://github.com/jaredpalmer/backpack)**: minimalistic build system for Node.js projects. 
- **[Now.sh v2](https://zeit.co/now)**: To host GraphQL server.
- **[graphql-shield](https://github.com/maticzav/graphql-shield)**: 🛡 A GraphQL tool to ease the creation of permission layer.
- **[aws-elasticbeanstalk](https://aws.amazon.com/elasticbeanstalk/)**: Deploy/Host your graphql server on AWS elasticbeanstalk

## Other features
- **[ESLint](https://eslint.org/)**: code linter.
- **[Prettier](https://prettier.io/)**: opinionated code formatter. 
- **[babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining)**: Transform optional chaining operators into a series of nil checks
- **[Dotenv](https://github.com/motdotla/dotenv)**: Loads environment variables from .env for nodejs projects.


## Usage
- create `.development.env` , `.test.env` , and `.production.env` file according to `.development.example.env`
- `yarn` (npm if you want)
- `yarn dev` - To start the development server with debug mode.
-  `yarn dev-deploy` / `yarn test-deploy` /`yarn prod-deploy` - to generate the buld and deploy prisma server and graphql server

## Global CLI installation:
- **[aws-cli](https://github.com/aws/aws-cli)**: Required if you're using S3 to upload files.
- **[aws-elasticbeanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html)**: Required if you're deploying your GraphQL server on aws-elasticbeanstalk.


-Other commands
-  To generate the build
```json
    "dev-build": "NODE_ENV=development yarn build",
    "test-build": "NODE_ENV=test yarn build",
    "prod-build": "NODE_ENV=production yarn build",
```
- To deploy prisma
```json
    "prisma-deploy-dev": "prisma deploy  --env-file .development.env",
    "prisma-deploy-test": "prisma deploy --env-file .test.env",
    "prisma-deploy-prod": "prisma deploy --env-file .production.env",
```





