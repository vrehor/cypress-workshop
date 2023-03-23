import { intArg, list, nonNull, queryField } from 'nexus';

export const boardLists = queryField('boardLists', {
  type: list(nonNull('BoardList')),
  args: { boardId: nonNull(intArg()) },
  resolve: async (_, { boardId }, { services: { BoardListDao } }) => {
    return await BoardListDao.find({
      board: {
        id: boardId,
      },
    });
  },
});
