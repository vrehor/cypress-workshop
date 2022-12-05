import { getBySel } from './commands/getBySel';
import { getBySelLike } from './commands/getBySelLike';

Cypress.Commands.add('getBySel', getBySel);
Cypress.Commands.add('getBySelLike', getBySelLike);
