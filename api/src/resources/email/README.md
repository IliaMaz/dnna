### Mailing

-   With the production setup in mind, you would probably want to move mailing
    into a non-clustered microservice or start using a database level locking
    mechanisms. Be aware that TypeORM does not implement all the locking variants
    of PostgreSQL and as such may not be suitable. The simplest option could be
    the microservice which has the mailing entities and logic so that the main
    app can create Email entities and then the microservice would, using `@Cron()`
    , intermittently send out the emails.
