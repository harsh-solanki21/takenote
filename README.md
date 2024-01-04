# About takenote App

-   Takenote is a secure and scalable application that allows users to create, read, update, and delete notes. The application is also allow users to share their notes with other users and search for notes based on keywords.

-   Technical Implementations:
    -   Implemented a RESTful API using NodeJS and ExpressJS.
    -   Used MongoDB database to store data.
    -   Implemented secure authentication with JWT and cookies and also integrated Rate limiting and request throttling to handle high traffic.
    -   Included search functionality to enable users to search for notes based on keywords. (userd text indexing for high performance)
    -   Wrote Unit tests and Integration tests for API endpoints using a testing frameworks like Jest and Supertest.

<br />

## Run this app locally

-   Make sure you have `nodejs v20` and `pnpm v8` package manager is installed

-   Download or clone this repo into your computer.
-   In the takenote directory,\
    Run `pnpm i` to install all the necessary dependencies.

-   Run app by `pnpm dev` command. It will transpile (translate) the TypeScript code into JavaScript code on-the-fly (Just-In-Time or JIT).\
    OR\
    `pnpm start` command will compile TypeScript code into JavaScript code, making it executable in Node.js and runs the JavaScript code.

-   Runs the app in the development mode. Open below links to view logs.
    -   [http://localhost:5000](http://localhost:5000)
