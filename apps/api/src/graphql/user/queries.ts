import { list, nonNull, queryField } from 'nexus';

import { addTypeName } from '../../helpers/nexus';

export const users = queryField('users', {
  type: list(nonNull('User')),
  resolve: (_, __, { services: { UserDao } }) => {
    return UserDao.findAll();
  },
});

export const user = queryField('user', {
  type: 'User',
  resolve: async (_, __, { services: { UserDao, CurrentUser } }) => {
    if (CurrentUser?.tokenData?.user_id) {
      return addTypeName(
        await UserDao.findById(CurrentUser.tokenData.user_id),
        'User'
      );
    }

    return null;
  },
});
