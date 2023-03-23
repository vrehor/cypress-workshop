import { createBoard } from './commands/createBoard';
import { createBoardList } from './commands/createBoardList';
import { createCard } from './commands/createCard';
import { deleteBoard } from './commands/deleteBoard';
import { deleteBoardList } from './commands/deleteBoardList';
import { deleteCard } from './commands/deleteCard';
import { getBoard } from './commands/getBoard';
import { getBoards } from './commands/getBoards';
import { graphqlQuery } from './commands/graphqlQuery';
import { login } from './commands/login';
import { resetMutation } from './commands/resetMutation';
import { signup } from './commands/signup';
import { updateBoard } from './commands/updateBoard';
import { updateBoardList } from './commands/updateBoardList';
import { updateCard } from './commands/updateCard';

Cypress.Commands.add('graphqlQuery', graphqlQuery);

Cypress.Commands.add('login', login);
Cypress.Commands.add('signup', signup);

Cypress.Commands.add('getBoards', getBoards);
Cypress.Commands.add('getBoard', getBoard);
Cypress.Commands.add('createBoard', createBoard);
Cypress.Commands.add('updateBoard', updateBoard);
Cypress.Commands.add('deleteBoard', deleteBoard);

Cypress.Commands.add('createBoardList', createBoardList);
Cypress.Commands.add('updateBoardList', updateBoardList);
Cypress.Commands.add('deleteBoardList', deleteBoardList);

Cypress.Commands.add('createCard', createCard);
Cypress.Commands.add('updateCard', updateCard);
Cypress.Commands.add('deleteCard', deleteCard);

Cypress.Commands.add('resetMutation', resetMutation);
