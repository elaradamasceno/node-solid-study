# App

GymPass style app.

## About the project
This Node.js study project simulates a 'GymPass' system using the Solid principles. It integrates Prisma ORM, implements Refresh Token authentication, applies design patterns, and includes both unit and end-to-end (E2E) tests. The project also incorporates CI pipeline integration for automated testing.

## Technologies
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Fastify**: A fast and low-overhead web framework for Node.js.
- **ZOD**: A TypeScript-first schema declaration and validation library.
- **JWT**: JSON Web Token, a standard for securely transmitting information between parties as a JSON object.
- **Vitest**: A blazing fast unit test framework powered by Vite.
- **Prisma ORM**: An open-source database toolkit for TypeScript and Node.js that aims to make app development faster and more reliable.
- **Docker**: A platform for developing, shipping, and running applications inside lightweight, portable containers.

## Commands

To run and test the project, use the following commands:
```sh
  docker compose up -d    # Start the Docker containers
  npm run start:dev       # Start the development server
  npm run test            # Run all tests
  npm run test:e2e        # Run end-to-end tests
  npm run test:coverage   # Generate test coverage report
 ``` 


## Setup:
```sh
  npx prisma studio        # Open Prisma Studio to visualize and manage data
  npx prisma migrate dev   # Apply database migrations in development environment
  npx prisma generate      # Generate Prisma Client based on the data model
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

