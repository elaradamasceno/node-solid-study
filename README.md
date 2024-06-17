# App

GymPass style app.

## About the project

My Node.js study project with Solid simulates a 'GymPass' system, integrating Prisma ORM, Refresh Token authentication, applying design patterns, and implementing both unit and E2E tests.

## Commands
```sh
  npm run start:dev
  npm run test
  npm run test:e2e
  npm run test:coverage
 ``` 

## Setup:
```sh
  docker compose up -d

  npx prisma studio
  npx migrate dev
  npx prisma generate
```

## RFs (Functional Requirements)
- [x] Must be poissible to register;
- [x] Must be possible to authenticate;
- [x] Must be possible to retrieve the profile of a logged-in user;
- [x] Must be possible to retrieve the number of check-ins performed by the logged-in user;
- [x] Must be possible for the user to retrieve their check-in history;
- [x] Must be possible for the user to search for nearby gyms (up to 10km);
- [x] Must be possible for the user to search for gyms by name;
- [x] Must be possible for the user to check-in at a gym;
- [x] Must be possible to validate a user's check-in;
- [x] Must be possible to register a gym;

## RNs (Business Rules)
- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot perform 2 check-ins on the same day;;
- [x] The user cannot check-in if not near (100m) the gym;
- [x] The check-in can only be validated up to 20 minutes after creation;
- [ ] The check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## RNFs (Non-Functional Requirements)
- [x] The user password must be encrypted;
- [x] Application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (Json Web Token);

<!-- 
  docker-compose up -d
  docker compose down (deleta o container)
  docker compose stop 
-->

<!-- docker start solid-node-study-api-solid  -->