## DNNA -- Docker Nginx NestJS API

-   This is just a collection of random snippets and systems that I have either
    created, extended or found while working with NestJS.

### Development

-   You should have Docker and npm on your system. You need to `npm ci` in the
    `api` directory to to get your intellisense to recognize imports etc.

-   Configure the .env.dev as per the .env.example. The only thing you actually
    need to fill out are the empty and sensitive database values and secrets.

-   If you have npm on your host, run `npm run build:dev`. If you don't, you can
    utilise the command that it runs:

    `docker compose -f docker-compose.d.yml --env-file=env/.env.dev up -d --build`

-   That's about it, you should now have a hot-reload NestJS development
    environment. **Please be aware npm package addition will likely require
    a rebuild. This is because packages between OS's differ and so part of
    the system design sets up the packages in an anonymous volume**

### Production

-   **As of right now the production setup is not fully setup as a migration
    system is not done and pagination is missing**. For a production test build
    you would need to follow the same steps as the above except in this case
    configure a `.env` as per the example, run `npm run generate:crt` and then
    run `npm run build:prd` which will target the final production build stage
    of the Dockerfiles. The api is set to run using 4 instances via pm2 which
    in turn means that your database manipulations should be concurrency-safe
    or explicitly handle concurrency. I may add locking mechanisms in the future
    that would allow easy concurrency-safe database manipulation.

-   If you want to play around in a production environment without setting up
    migrations you can build the dev system first and after the app has synced
    (usually when the NestJS logs have fully printed) you can run the prod build.

    If you're unsure if the sync has gone through in dev, you can call the url
    `localhost/api/post/extended` via browser and the results should tell you
    whether a sync has occurred, if it hasn't you'll see an error 500.

    Database errors are left unhandled on the CRUD level because each entity
    may have its own requirements for database error handling and as such
    configuring every crud deriving resource to handle these errors in a
    specific way would be too limiting and potentially may even force user
    circumvention.

    Without letting the app sync and building for prod you will face 500's.

### Package JSON Scripts

-   The root package JSON scripts have been setup for 2 reasons, one, it is
    faster and simpler to trigger a named command via npm than to write out
    a docker command with multiple required options. Two, for people that
    don't fully understand docker yet it simplifies remember what needs to
    be run and when.

### Docker

-   Simple setup with network access separation, meaning that the db is only
    accessible from the api. The api is only accessible from the server. In
    the case that a frontend is introduced it should sit on its own network
    that the only the server has access to.

-   PostgreSQL data stored in a docker volume to have data persistence. Please
    note that the scripts in the root package json are really only meant for
    development / testing on a local machine. The wipe commands do a full cleanse
    of the container stack, including all active containers, images and volumes
    related to the project.

-   Staged builds (feature of docker) have been used to simplify the process and
    the different builds of every given service in their respective files.

### Nginx

-   The default config sets up the api via a reverse proxy under the `/api` path

-   Allows easy extension to contain a full stack, refer to the full stack
    section on how to do this.

-   The development configuration uses regex to allow further linking to the api
    service, a use case for this would be if you wanted to use swagger, you could
    modify the location to be something like `^/(api|docs)`.

-   The production nginx configuration depends on 2 docker secrets existing:

    -   `webcrt`
    -   `webkey`

-   The production config server_name directive should be adjusted if you wanted
    to serve this app on the web - search for `<example>` in `default.prd.conf`.

### NestJS

-   This section primarily contains some minor useful things that I've done or
    found while working with the framework. I suggest you read through the code
    to understand exactly what's going and whether this is useful to you. Most
    of the code has a bunch of comments to clarify and point to how things can
    be done.

-   The CRUD section of the application was introduced by Kamil Myśliwiec, the
    creator of the framework, at a HolyJS conference, feel free to take a look
    at [his step-by-step](https://youtu.be/jo-1EUxMmxc?feature=shared&t=2349).
    The approach has been somewhat modified to maintain certain functionality
    etc. The code has pretty in depth documentation on varying levels, check
    out: `crud.service.ts`, `crud.controller.ts`, `post.service.ts` and
    `post.controller.ts`. **Please, before using it, try it out and see if it
    fits your needs. The approach does have its own quirks and issues and may
    take some time to be understood**.

-   Checkout the `api/README.md` for more info about what exists in this mini
    repo and what was done to it.

### Full Stack

-   There are a few ways of setting up a full stack, an interesting one that
    you may want to explore but one that won't be covered here would be to
    setup NestJS as a monorepo -- this would allow for an easy way to share
    interfaces between the two applications.

-   Setup another docker service / container like the api and `expose` the
    port your frontend is being served on via the `docker-compose.*.yml`. The
    nginx configuration files are setup to support websockets so tools like
    Vercel / Vite should function normally. Of course you'll probably also
    want to setup an `app/Dockerfile` or something of the sort unless you're
    utilising prebuilt images.

-   Align the nginx `server/Dockerfile` to apply the port replacement logic
    and the `default.dev.conf` `default.prd.conf` to properly reverse proxy
    to the frontend under `location /` for example. Please keep in mind that
    the replacement is actually possible via server templates (envsubst) from
    nginx directly but as we are replacing the root nginx conf file we are
    handling this manually.

-   For a production setup you should run the frontend production build and store
    that in a volume which is shared between the frontend and nginx which would
    allow direct nginx to directly serve the app. This is optimal as it removes
    any intermediary and potentially insecure servers that come prepackage for
    development.

### Future

-   All future contributions will be done via a new branch -> PR -> merge to master.

### S.O.L.I.D

-   This repo also contains various implementations of SOLID for my reference, they
    have picked up from CoderOne's [video](https://www.youtube.com/watch?v=vE74gnv4VlY&ab_channel=CoderOne)
    and extended / modified.

-   Examples of the principles:

    -   The `resources/{order,email}` contain docs on SRP (Single Responsibility
        Principle) and LSP (Liskov Substitution Principle)

    -   The `resources/payment` contains an example and documentation of the OCP
        (Open Closed Principle).
