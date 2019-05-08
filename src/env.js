// Having a wrapper over process.env gives us the control mofify values based on NODE_ENV and 
export const env = {
  APP_SECRET: process.env.APP_SECRET
};
