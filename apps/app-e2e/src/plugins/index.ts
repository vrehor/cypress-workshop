import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default (on, config) => {
  Object.keys(process.env)
    .filter(key => key.startsWith('NX_'))
    .forEach(key => (config.env[key] = process.env[key]));
  return config;
};
