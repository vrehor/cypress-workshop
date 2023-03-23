import { objectType } from 'nexus';

export const Card = objectType({
  name: 'Card',
  description: `Represents a Card`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('name');
    t.nullable.string('description');
    t.int('order');
    t.nullable.dateTime('deadline');
    t.nullable.field('user', { type: 'UserId' });
    t.boolean('done');
  },
});
