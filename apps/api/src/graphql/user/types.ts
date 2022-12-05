import { objectType } from 'nexus';

export const UserId = objectType({
  name: 'UserId',
  description: `Represents an User object with id`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
  },
});

export const User = objectType({
  name: 'User',
  description: `Represents an User`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('id');
    t.string('email');
  },
});

export const LoginData = objectType({
  name: 'LoginData',
  description: `Represents a Login data`,
  nonNullDefaults: { output: false },
  definition(t) {
    t.string('token');
  },
});
