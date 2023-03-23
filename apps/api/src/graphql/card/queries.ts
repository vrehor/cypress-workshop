import { intArg, list, nonNull, queryField } from 'nexus';

export const cards = queryField('cards', {
  type: list(nonNull('Card')),
  args: { listId: nonNull(intArg()) },
  resolve: async (_, { listId }, { services: { CardDao } }) => {
    return await CardDao.find({
      list: {
        id: listId,
      },
    });
  },
});
