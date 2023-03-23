import { intArg, mutationField, nonNull } from 'nexus';

import { addTypeName, union } from '../../helpers/nexus';

export const createBoard = mutationField('createBoard', {
  type: nonNull(union('ValidationError', 'Board')),
  args: {
    input: nonNull('BoardInput'),
  },
  async resolve(
    _,
    { input: { name } },
    { services: { BoardDao, CurrentUser } }
  ) {
    // Validation
    if (!name) {
      return addTypeName(
        {
          code: 400,
          fields: ['name'],
          messages: ['Board name cannot be empty'],
        },
        'ValidationError'
      );
    }

    const board = await BoardDao.create({
      name,
      user: CurrentUser?.tokenData?.user_id
        ? {
            connect: {
              id: CurrentUser?.tokenData?.user_id,
            },
          }
        : undefined,
    });

    return addTypeName(board, 'Board');
  },
});

export const updateBoard = mutationField('updateBoard', {
  type: nonNull(union('NotFoundError', 'Board')),
  args: {
    boardId: nonNull(intArg()),
    input: nonNull('BoardUpdateInput'),
  },
  async resolve(
    _,
    { input: { name, starred }, boardId },
    { services: { BoardDao } }
  ) {
    let board = await BoardDao.findById(boardId);

    if (!board) {
      return addTypeName(
        {
          message: `Board with id=${boardId} doesn't exist`,
        },
        'NotFoundError'
      );
    }

    board = await BoardDao.update(
      {
        ...(name ? { name: name } : {}),
        ...(starred !== null ? { starred: starred } : {}),
      },
      {
        id: boardId,
      }
    );

    return addTypeName(board, 'Board');
  },
});

export const deleteBoard = mutationField('deleteBoard', {
  type: nonNull(union('NotFoundError', 'Board')),
  args: {
    boardId: nonNull(intArg()),
  },
  async resolve(_, { boardId }, { services: { BoardDao } }) {
    let board = await BoardDao.findById(boardId);

    if (!board) {
      return addTypeName(
        {
          message: `Board with id=${boardId} doesn't exist`,
        },
        'NotFoundError'
      );
    }

    board = await BoardDao.delete(boardId);

    return addTypeName(board, 'Board');
  },
});
