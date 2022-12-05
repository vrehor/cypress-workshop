require('ts-node').register({ transpileOnly: true });

import { teardown } from './prisma/seeds/dev';

export default async () => {
  await teardown();
};
