import { inputObjectType } from 'nexus';

export const BoardListInput = inputObjectType({
  name: 'BoardListInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.string('name');
    t.int('order');
  },
});

export const BoardListUpdateInput = inputObjectType({
  name: 'BoardListUpdateInput',
  nonNullDefaults: { input: false },
  definition(t) {
    t.string('name');
    t.int('order');
  },
});
