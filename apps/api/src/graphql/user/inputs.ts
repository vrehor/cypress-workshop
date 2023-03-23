import { inputObjectType } from 'nexus';

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  nonNullDefaults: { input: true },
  definition(t) {
    t.string('email');
    t.string('password');
  },
});
