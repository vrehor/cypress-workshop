import {list, nonNull, queryField, stringArg} from 'nexus';

export const cards = queryField('cards', {
  type: list(nonNull('Card')),
  args: {listId: nonNull(stringArg())},
  resolve: async (_, {listId}, {services: {CardDao}}) => {
    return await CardDao.find(
      {
        list: {
          id: listId
        }
      })
  },
});
