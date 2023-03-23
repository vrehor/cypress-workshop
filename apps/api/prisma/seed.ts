import { stat } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const main = async () => {
  const seedFile = process.argv[2];

  if (!seedFile) {
    console.error(new Error('No seed file provided'));
    process.exit(1);
  }

  const pathToSeedFile = resolve(__dirname, 'seeds', `${seedFile}`);

  try {
    await promisify(stat)(pathToSeedFile);
  } catch (e) {
    console.error(new Error(`Seed file "${pathToSeedFile}" doesn't exist`));
    process.exit(1);
  }

  const seeder = (await import(pathToSeedFile)).default;

  if (typeof seeder !== 'function') {
    console.error(
      new Error(
        `Seed file "${pathToSeedFile}" doesn't export a function as default export`
      )
    );
    process.exit(1);
  }

  console.log(`Running a seed from file: ${pathToSeedFile}`);
  await seeder();

  console.log(`Seeding "${seedFile}" completed...`);
  process.exit(0);
};

main();
