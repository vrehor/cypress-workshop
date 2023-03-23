import { list, objectType } from 'nexus';

export const Board = objectType({
  name: 'Board',
  description: `Represents a Board`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('name');
    t.boolean('starred');
    t.nullable.field({
      name: 'lists',
      type: list('BoardList'),
      resolve: ({ id }, _, { services: { BoardListDao } }) => {
        return BoardListDao.find({
          board: {
            id: id,
          },
        });
      },
    });
  },
});
