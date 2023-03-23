import { makeSchema } from 'nexus';
import * as path from 'path';

import * as allTypes from '../../graphql';

const developDir = path.join(process.cwd(), 'apps/api');

export const schema = makeSchema({
  plugins: [],
  outputs: {
    schema: path.join(developDir, 'generated/schema.graphql'),
    typegen: path.join(developDir, 'generated/graphql.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), 'apps/api/src/config/apollo/context.ts'),
    export: 'Ctx',
  },
  shouldGenerateArtifacts: process.env['NODE' + '_ENV'] === 'development',
  types: [allTypes],
});
