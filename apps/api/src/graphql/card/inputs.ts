import { inputObjectType } from 'nexus';

export const CardInput = inputObjectType({
  name: 'CardInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.string('name');
    t.nullable.string('description');
    t.nullable.int('order');
    t.nullable.dateTime('deadline');
    t.nullable.boolean('done');
  },
});

export const CardUpdateInput = inputObjectType({
  name: 'CardUpdateInput',
  nonNullDefaults: { input: false },
  definition(t) {
    t.nullable.string('name');
    t.nullable.string('description');
    t.nullable.int('order');
    t.nullable.dateTime('deadline');
    t.nullable.boolean('done');
  },
});
