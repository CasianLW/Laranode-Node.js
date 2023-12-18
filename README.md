# LaraNode - Node.js User Management API

_A Node.js CRUD API for user management without any framework_

## Overview

LaraNode is a Node.js project for building a RESTful API to manage user data. This API is developed without using any external frameworks and strictly adheres to REST API conventions.

## Setup

1. **Environment**: Configure `.env` with PostgreSQL database credentials.
2. **Database**: Set up a PostgreSQL database with a `users` table.

## Project Structure

```
laranode/
├── app/
│   ├── Controllers/
│   │   └── UserController.js
│   ├── Models/
│   │   └── User.js
│   ├── Repository/
│   │   └── UserRepository.js
│   ├── Validator/
│   │   └── UserValidator.js
|   └── Utils/
│       └── BodyParser.js
├── bootstrap/
│   ├── Db.js
│   └── Router.js
├── routes/
│   └── index.js
├── .env
├── index.js
└── package.json
```

## Features

- **CRUD Operations**: Create, Read, Update, Delete user data.
- **Validation**: JSON body validation for POST and PUT requests.
- **Error Handling**: Implements error responses (404, 405, 422, 500).

## How to Run

- Install dependencies: `npm install`
- Start the server: `node index.js`
  _\*make sure you configure .env for it to work_

## Explore and Experiment

Feel free to take the code and play with it however you want

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
