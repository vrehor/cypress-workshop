import { mutationField, nonNull } from 'nexus';

import { addTypeName, union } from '../../helpers/nexus';

export const login = mutationField('login', {
  type: nonNull(union('AuthorizationError', 'ValidationError', 'LoginData')),
  args: {
    input: nonNull('LoginInput'),
  },
  async resolve(
    _,
    { input: { email, password } },
    { services: { UserDao, HashService, TokenService } }
  ) {
    // Validation
    if (!email) {
      return addTypeName(
        {
          code: 400,
          fields: ['email'],
          messages: ['Email cannot be empty'],
        },
        'ValidationError'
      );
    }

    if (!password) {
      return addTypeName(
        {
          code: 400,
          fields: ['password'],
          messages: ['Password cannot be empty'],
        },
        'ValidationError'
      );
    }

    const user = await UserDao.findByEmail(email, {
      id: true,
      password: true,
      token: true,
    });

    if (user && (await HashService.compareString(password, user.password))) {
      user.token = TokenService.create({ user_id: user.id });
      return addTypeName(
        await UserDao.update(user, { id: user.id }),
        'LoginData'
      );
    }

    return addTypeName(
      {
        message:
          'User is not authorizes. Check combination of email and password',
      },
      'AuthorizationError'
    );
  },
});

export const signup = mutationField('signup', {
  type: nonNull(union('ValidationError', 'LoginData')),
  args: {
    input: nonNull('LoginInput'),
  },
  async resolve(
    _,
    { input: { email, password } },
    { services: { UserDao, TokenService, HashService } }
  ) {
    // Validation
    if (!email) {
      return addTypeName(
        {
          code: 400,
          fields: ['email'],
          messages: ['Email cannot be empty'],
        },
        'ValidationError'
      );
    }

    if (!password) {
      return addTypeName(
        {
          code: 400,
          fields: ['password'],
          messages: ['Password cannot be empty'],
        },
        'ValidationError'
      );
    }

    let user = await UserDao.findByEmail(email);
    if (user) {
      return addTypeName(
        {
          code: 400,
          fields: ['email'],
          messages: ['User with email already exists'],
        },
        'ValidationError'
      );
    }

    const encryptedPassword = await HashService.hashString(password);

    user = await UserDao.create({
      email,
      password: encryptedPassword,
    });

    const token = TokenService.create({ user_id: user.id });

    user = await UserDao.update(
      {
        token,
      },
      {
        id: user.id,
      }
    );

    return addTypeName(user, 'LoginData');
  },
});
