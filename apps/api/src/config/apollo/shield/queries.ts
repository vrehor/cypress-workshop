import { allow } from 'graphql-shield';

export const queries = {
  users: allow,
  user: allow,
  boards: allow,
  board: allow,
};
