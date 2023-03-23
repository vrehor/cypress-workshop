import { inputObjectType } from 'nexus';

export const BoardInput = inputObjectType({
  name: 'BoardInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.string('name');
  },
});

export const BoardUpdateInput = inputObjectType({
  name: 'BoardUpdateInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.nullable.string('name');
    t.nullable.boolean('starred');
  },
});
