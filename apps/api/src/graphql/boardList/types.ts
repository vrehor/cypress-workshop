import { list, objectType } from 'nexus';

export const BoardList = objectType({
  name: 'BoardList',
  description: `Represents a Board list`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('name');
    t.int('order');
    t.nullable.field('user', { type: 'UserId' });
    t.nullable.field({
      name: 'cards',
      type: list('Card'),
      resolve: ({ id }, _, { services: { CardDao } }) => {
        return CardDao.find({
          list: {
            id: id,
          },
        });
      },
    });
  },
});
