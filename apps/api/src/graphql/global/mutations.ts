import { mutationField, nonNull } from 'nexus';

export const reset = mutationField('reset', {
  type: nonNull('Boolean'),
  resolve: async (_, __, { services: { Prisma } }) => {
    await Prisma.$transaction(async trx => {
      await trx.card.deleteMany();
      await trx.list.deleteMany();
      await trx.board.deleteMany();
      await trx.user.deleteMany();
    });

    return true;
  },
});
