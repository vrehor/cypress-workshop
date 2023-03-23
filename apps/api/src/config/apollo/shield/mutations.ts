import { allow } from 'graphql-shield';

export const mutations = {
  reset: allow,
  login: allow,
  signup: allow,
  createBoard: allow,
  updateBoard: allow,
  deleteBoard: allow,
  createBoardList: allow,
  updateBoardList: allow,
  deleteBoardList: allow,
  createCard: allow,
  updateCard: allow,
  deleteCard: allow,
};
