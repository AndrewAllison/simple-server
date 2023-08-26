## Overview
For data access the descion was made to use PrismaJs. Prisma sis a modern ORM that allows for full database management and client access from a schema file including migrations, client access. It's ideal for REST and GraphQL based services.

### Local Development
As described in the [ReadMe.md](./ReadMe.md) file. The project has a `docker-compose.yml` file in the root of the project which can be used in conjunction with the `docker-compuse up -d` command to spin up a local version of the database. The file references details in the `.env.postgress` file which determines the database and user settings that will be configured when the docker instance of postgres is launced. The details here then need to be used to access the database with Prisma. This is done by updating the `.encv` file `DATABASE_URL` key.

### Migrations
The project uses prisma migrations to control the creation and modification of teh database and it's tables. The prisma documentation contains information on how to use and create migrations. These are used both locally and also in production. The CLI provides the appropriate commands needed depending on dev and deploy/production instances.

### Development Cycle
A good way to test out changes to the schema is to use the `npx prisma db push` command which will allow for the changes to be added and reverted once the changes are ready you can use a migrations command along with a description to place the changes into a migrations file, ready to be used in pieplines and by others.

### Seeding
TBC Idealy we will have a seed file that would populate data need to get the database up and running. 

## References
[PrismaJs](https://prisma.io)
