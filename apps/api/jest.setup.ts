require('ts-node').register({
  transpileOnly: true,
});

import testSeeds from './prisma/seeds/dev';

export default async () => {
  await testSeeds();
};
