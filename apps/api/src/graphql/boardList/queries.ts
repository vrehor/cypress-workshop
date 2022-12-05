import {list, nonNull, queryField, stringArg} from 'nexus';

export const boardLists = queryField('boardLists', {
  type: list(nonNull('BoardList')),
  args: {boardId: nonNull(stringArg())},
  resolve: async (_, {boardId}, {services: {BoardListDao}}) => {
    return await BoardListDao.find(
      {
        board: {
          id: boardId
        }
      })
  },
});
