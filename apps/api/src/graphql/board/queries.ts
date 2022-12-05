import { intArg, list, nonNull, queryField } from 'nexus';

import { addTypeName, union } from '../../helpers/nexus';

export const boards = queryField('boards', {
  type: list(nonNull('Board')),
  resolve: async (_, __, { services: { BoardDao } }) => {
    return await BoardDao.findAll();
  },
});

export const board = queryField('board', {
  type: nonNull(union('Board', 'NotFoundError')),
  args: { boardId: nonNull(intArg()) },
  resolve: async (_, { boardId }, { services: { BoardDao } }) => {
    const board = await BoardDao.findById(boardId);

    if (!board) {
      return addTypeName(
        {
          message: `Board with id ${boardId} wasn't found`,
        },
        'NotFoundError'
      );
    }

    return addTypeName(board, 'Board');
  },
});
