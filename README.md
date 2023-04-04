# Cypress workshop
This project is based on Filip Hric https://github.com/filiphric/cypress-core-workshop.git.
Unlike his project, this one uses Graphql, React, typescript and should serve for OAK'S LAB (uses OAK'S LAB technologies) internal workshop.

!Project is still under construction

## How to run project

1. Clone repo: ``git clone git@github.com:vrehor/cypress-workshop.git``
2. Install dependencies: ``npm install``
3. Init DB: ``npm run prisma:migrate``
4. Run app: ``npm run serve:all``
5. Open URL address in the browser http://localhost:3002

## How to use this project
Purpose for this project is to provide application in specific technologies to learn cypress basics.

This is done through 12 sections that consists of notes, challenge and challenge solution.

Everyone can pick section he/she is interested in, read notes, cypress documentation and test new knowledge in the challenge.

It is highly recommended to go section by section because later sections builds on knowledge from the previous one.


## Project description
Project uses monorepo (specifically NX).

### Used Tech
- FE
  - react
  - antd
  - styled components
  - codegen
  - storybook
  - zustand
- API
  - prisma
  - graphql
    - apollo
    - nexus
  - express.js rest api

### Project folder structure
- apps
  - api ... API application
  - api-e2e ... API cypress tests
  - app ... FE application
  - app-e2e ... cypress workshop tests
- libs
  - common-ui ... library for UI stuffs that can be shared accross different apps (components, stores, config, ...)
  - data-access ... library with generated hooks for calling Graphql API (generated via codegen)



### How to run APP
The whole project can be run with this command ``npm run serve:all``.
It will start API and APP.

- APP url: http://localhost:3002
- REST API url: http://localhost:3333/api
- GraphQL API url: http://localhost:3333/graphql

### How to run Cypress
Cypress test are split by application (API and APP).

- Run API cypress: ``npm run e2e:api:watch``
- Run APP cypress: ``npm run e2e:app:watch``

Keep in mind, cypress needs running application.
Command for headless mode can be found in package.json


### How to run Storybook
Storybooks can be run, but there is no component yet

``npm run serve:storybook``

## API project

### Database
Database is done via Prisma. As for now, you don't need to have any DB installed, it uses in memory **sqllite** variant.

Schema can be found in here _apps/api/prisma/schema.prisma_.

