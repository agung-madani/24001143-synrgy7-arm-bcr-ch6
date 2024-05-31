# Car Management Dashboard API

This repository provides a comprehensive framework for building robust web applications, framework Express.js and uses Knex.js and Objection.js as an ORM with a PostgreSQL emphasizing proficiency in database management with SQL and CRUD operations, integration of the Service Repository Pattern for efficient project structuring, seamless execution of asynchronous functions, and seamless implementation of Token Based Authentication for secure REST API access. Additionally, it facilitates the creation of clear and concise Open API Documentation for easy API understanding. Developed entirely in TypeScript, This repository ensures both reliability and scalability for your projects.

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/agung-madani/24001143-synrgy7-arm-bcr-ch6.git
```

2. Install the dependencies:

```sh
npm install
```

3. Set up your environment variables in a `.env` file. You'll need:

- `DB_USER`: Your PostgreSQL username
- `DB_PASSWORD`: Your PostgreSQL password
- `DB_PORT`: Your PostgreSQL port (usually 5432)
- `DB_HOST`: Your PostgreSQL host
- `DB_NAME`: The name of your PostgreSQL database
- `JWT_SECRET`: Secret key for JSON Web Token (JWT) encryption

4. Run the migrations:

```sh
npx knex migrate:latest
```

5. Run the seeds:

```sh
npx knex seed:run
```

6. Start the server:

```sh
npm start
```

The server will start on `http://localhost:3000`.

## API Documentation

You can view the API documentation at `http://localhost:3000/api-docs`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
