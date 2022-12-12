# `api`

This repository powers the backend APIs available to [wreno.io](https://wreno.io) and its relevant applications.

## Running Server

```bash
yarn install
cp .env.sample .env
# terminal 1 starts postgres & firebase
docker-compose up
# terminal 2 starts nodejs process in dev mode
yarn start
# terminal 3 keeps the database schema in sync
yarn migrate
```

Please reach out to your team lead for the Postman account information.

## Setting up Firebase & Postgres

### Local Data / Emulation (Recommended)

We use Docker for managing local dependencies, please be sure to follow this approach for all local development.

1. [Install `docker`](https://docs.docker.com/get-docker/)
2. Run `docker-compose up` to run firebase emulator and postgres server
3. Hit the [/auth/sign-up](./documentation/Auth.md#user-creation) endpoint to create a new user
4. Edit the newly created user's role in the [Firebase Emulator Console](http://localhost:4005) from `PENDING_ACTIVATION` to `ADMIN`. Go to http://127.0.0.1:4005/auth and edit user's custom claims
5. Lastly, run `yarn start` in the [`data-importer` repo](https://github.com/wreno-io/data-importer) to import the latest data into the database.

You should only need to do this once, after you run this, the data is persisted in your filesystem across restarts. Simply run `docker-compose up` to start the server again later.

### Production Data

> 🚨 **Please use local development** instead unless debugging a specific issue in an environment

#### Firebase

You will need to adjust your `.env` file by updating the relevant `FIREBASE_*` variables as well as adding a `GOOGLE_APPLICATION_CREDENTIALS` variable which points to the a service account config generated [from this page](https://console.firebase.google.com/project/wreno-website/settings/serviceaccounts/adminsdk).

#### Postgres

To run the `api` server or debug production database, follow these steps:

1. Gain access to our Google Cloud Platform account by reaching out to your team lead.
2. [Install and authenticate the `gcloud` CLI](https://cloud.google.com/sdk/docs/authorizing)
3. [Setup CloudSQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/connect-instance-auth-proxy)
4. Run the proxy using this command:

   Mac:

   ```bash
   ./cloud_sql_proxy -enable_iam_login  -instances=INSTANCE_CONNECTION_NAME=tcp:5432
   ```

   Windows:

   ```bash
   cloud_sql_proxy_x64.exe -instances=INSTANCE_CONNECTION_NAME=tcp:5432 -enable_iam_login
   ```

5. Test the connection

   If you get errors like `Error: permission denied for table Users` please reach out to your team lead, as your account needs to be provisioned to access the `postgres` user role.

## API Documentation

To see the most up to data API documentation, we are currently using [https://www.postman.com/](https://www.postman.com/). We are also all contributing to this Postman account using a shared account (one day we'll upgrade a paid plan but its **expensive!**).

## Debugging

### Debugging Postgres

You can use any local Postgres client you feel comfortable with. If you don't have any preferred program, we recommend using [DBeaver](https://dbeaver.io/).

### Debugging Firebase

If running locally, you can access your [local Firebase Console](http://localhost:4005).

If running with production data, you can access the from [Firebase Console](https://console.firebase.google.com/)

## Production Deploys

`api` is hosted on Google Cloud Platform.

It leverages [Google Cloud Run](https://cloud.google.com/run) to run the containerized version of this repo in production. This runs this server in a lambda-esque fashion.

We also leverage [Cloud SQL](https://cloud.google.com/sql) for a fully managed Postgres Database.

Some helpful links for how we have Cloud Run connected to Cloud SQL:

- [Official Google Docs](https://cloud.google.com/sql/docs/postgres/connect-run)
- [Unofficial, but helpful, docs](https://dev.to/wpreble1/deploy-a-full-stack-app-on-gcp-with-a-cloud-sql-connection-part-2-14il)

## Key Definitions

These are some definitions that we use in this codebase, they may be helpful in understanding the request lifecycle:

- `config` - Loads and provides the configuration variables required to run the project and its dependencies.
- `controllers` - Main handlers to receive the request and pass the preprocessed data into the service and return the response from the service.
- `services` - Business logic handlers that include all the project logics processing and database connections
- `middlewares` - Middlewares that intercepts the request and puts custom logic
- `models` - Database model definition
- `routes` - ExpressJS routes
- `utils` - Utility methods & shared logic
- `definitions` - All the definitions (Type, Interface, Enum, Constants)
- `migrations` - One-off scripts used for tasks like synchronizing database tables, migrating data, seeding etc.
