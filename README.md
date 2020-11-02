# nimbella-node-project

An example project showcased to show some of the working components on deploying a node project on Nimbella

## Enviornment

Create a `.env` file at the root of this directory. With the following variables

NODE_ENV=development
API_BASE_URL=https://apigcp.nimbella.io/api/v1/web/your-namespace // `nim auth current` shows your namespace
DB_HOST=<mysql db>
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=nimbus
DEPLOYER_LOGIN_TOKEN=your namespace login token // Can be fetched with `nim auth export --non-expiring`. Only for CI/CD purpose
JWT_SECRET=<any-random-string>
