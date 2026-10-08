# Golden Table

A responsive restaurant site built with React, TypeScript, and Tailwind CSS, with a PHP/MySQL API for table reservation requests.

## Requirements

- Node.js 20 or newer
- PHP 8.1 or newer with the MySQLi extension
- MySQL with the existing `booking` database and its `booking` table

The booking table is expected to have `name`, `email`, `phone`, `time`, `hours`, `people`, and `messages` columns, matching the original project schema. Configure the PHP connection with `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` environment variables; the defaults are intended only for a local development database.

## Run locally

```sh
npm install
npm run dev
```

In a second terminal, start PHP with the project directory as its document root. Vite proxies API requests to this server:

```sh
php -S localhost:8000 -t .
```

Visit the Vite URL printed in the first terminal for frontend development. To create and serve the production app:

```sh
npm run build
php -S localhost:8000 -t .
```

Open `http://localhost:8000`. The PHP entry point serves the built React app, and reservation requests are handled by `api/booking.php`. Deploy the project root together with the generated `dist` directory and configure the database environment variables in the PHP hosting environment.
