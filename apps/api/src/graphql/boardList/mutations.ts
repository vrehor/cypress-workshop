import {mutationField, nonNull, stringArg} from "nexus";

import {addTypeName, union} from "../../helpers/nexus";

export const createBoardList = mutationField('createBoardList', {
  type: nonNull(union('ValidationError', 'NotFoundError', 'BoardList')),
  args: {
    boardId: nonNull(stringArg()),
    input: nonNull('BoardListInput'),
  },
  async resolve(
    _,
    {input, boardId},
    {services: {BoardDao, BoardListDao}}
  ) {

    // Validation
    if (!input?.name) {
      return addTypeName({
        code: 400,
        fields: ["name"],
        messages: ["Board name cannot be empty"]
      }, 'ValidationError')
    }

    const board = await BoardDao.find({
      id: boardId
    })

    if(!board) {
      return addTypeName({
        message: `Board with id=${boardId} doesn't exist`
      }, 'NotFoundError')
    }

    const list = await BoardListDao.create({
      ...input,
      board: {
        connect: {
          id: boardId
        }
      }
    })

    return addTypeName(list, 'BoardList')
  }
});

export const updateBoardList = mutationField('updateBoardList', {
  type: nonNull(union('NotFoundError', 'BoardList')),
  args: {
    listId: nonNull(stringArg()),
    input: nonNull('BoardListUpdateInput'),
  },
  async resolve(
    _,
    {input, listId},
    {services: {BoardListDao}}
  ) {
    const boardList = await BoardListDao.findById(listId)

    if (!boardList) {
      return addTypeName({
        message: `Board with id=${listId} doesn't exist`
      }, 'NotFoundError')
    }

    const list = await BoardListDao.update({
      ...input?.name ? {name: input.name} : {},
      ...input?.order ? {order: input.order} : {},
    }, {
      id: listId
    })

    return addTypeName(list, 'BoardList')
  }
});

export const deleteBoardList = mutationField('deleteBoardList', {
  type: nonNull(union('NotFoundError', 'BoardList')),
  args: {
    listId: nonNull(stringArg())
  },
  async resolve(
    _,
    {listId},
    {services: {BoardListDao}}
  ) {
    const boardList = await BoardListDao.findById(listId)

    if (!boardList) {
      return addTypeName({
        message: `Board with id=${listId} doesn't exist`
      }, 'NotFoundError')
    }

    const list = await BoardListDao.delete(listId)

    return addTypeName(list, 'BoardList')
  }
});
