import { intArg, mutationField, nonNull } from 'nexus';

import { addTypeName, union } from '../../helpers/nexus';

export const createCard = mutationField('createCard', {
  type: nonNull(union('ValidationError', 'NotFoundError', 'Card')),
  args: {
    listId: nonNull(intArg()),
    input: nonNull('CardInput'),
  },
  async resolve(_, { input, listId }, { services: { CardDao, BoardListDao } }) {
    // Validation
    if (!input?.name) {
      return addTypeName(
        {
          code: 400,
          fields: ['name'],
          messages: ['Card name cannot be empty'],
        },
        'ValidationError'
      );
    }

    const list = await BoardListDao.findById(listId, {
      id: true,
      cards: {
        select: {
          id: true,
        },
      },
    });

    if (!list) {
      return addTypeName(
        {
          message: `List with id=${listId} doesn't exist`,
        },
        'NotFoundError'
      );
    }

    const now = new Date();

    const card = await CardDao.create({
      deadline: new Date(now.setDate(now.getDate() + 2)),
      order: (list.cards?.length || 0) + 1,
      name: input.name,
      ...(input?.order ? { order: input.order } : {}),
      ...(input?.description ? { description: input.description } : {}),
      ...(input?.deadline ? { deadline: input.deadline } : {}),
      list: {
        connect: {
          id: listId,
        },
      },
    });

    return addTypeName(card, 'Card');
  },
});

export const updateCard = mutationField('updateCard', {
  type: nonNull(union('NotFoundError', 'Card')),
  args: {
    cardId: nonNull(intArg()),
    input: nonNull('CardUpdateInput'),
  },
  async resolve(_, { input, cardId }, { services: { CardDao } }) {
    let card = await CardDao.findById(cardId);

    if (!card) {
      return addTypeName(
        {
          message: `List with id=${card} doesn't exist`,
        },
        'NotFoundError'
      );
    }

    card = await CardDao.update(
      {
        ...(input?.name ? { name: input.name } : {}),
        ...(input?.order ? { order: input.order } : {}),
        ...(input?.description ? { description: input.description } : {}),
        ...(input?.deadline ? { deadline: input.deadline } : {}),
        ...(input?.done !== null ? { done: input.done } : {}),
      },
      {
        id: cardId,
      }
    );

    return addTypeName(card, 'Card');
  },
});

export const deleteCard = mutationField('deleteCard', {
  type: nonNull(union('NotFoundError', 'Card')),
  args: {
    cardId: nonNull(intArg()),
  },
  async resolve(_, { cardId }, { services: { CardDao } }) {
    let card = await CardDao.findById(cardId);

    if (!card) {
      return addTypeName(
        {
          message: `List with id=${card} doesn't exist`,
        },
        'NotFoundError'
      );
    }

    card = await CardDao.delete({
      id: cardId,
    });

    return addTypeName(card, 'Card');
  },
});
