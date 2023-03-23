import { objectType } from 'nexus';

const resolveWithCode = (code = 400) => ({ resolve: () => code });

export const NotFoundError = objectType({
  name: 'NotFoundError',
  description: `Represents a requested resource that doesn't exist`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('code', resolveWithCode(404));
    t.string('message');
  },
});

export const AuthorizationError = objectType({
  name: 'AuthorizationError',
  description: `Represents an action that is not permitted for actor`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('code', resolveWithCode(403));
    t.string('message');
  },
});

export const ValidationError = objectType({
  name: 'ValidationError',
  description: `Represents an invocation with unexpected parameter values`,
  nonNullDefaults: { output: true },
  definition(t) {
    t.int('code', resolveWithCode());
    t.list.string('fields');
    t.list.string('messages');
  },
});
