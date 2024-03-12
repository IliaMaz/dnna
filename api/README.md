## API

-   Continuing from the root `README.md`, the CRUD system has a peripheral decorator
    and guard called `Omit` and `OmitGuard`. The decorator can be used to suppress
    various endpoints that come from controllers that derive the `CrudController`,
    for an example please refer to the `post.controller.ts` file.

-   There is also another decorator that's introduced which is called `Passthrough`,
    it effectively defaults a response decorator as such `@Res({ passthrough: true })`.
    The 2 cases I've found that use this are auth systems where signed cookies are
    involved and `StreamableFile` endpoints.

-   An `EnvironmentService` that can be used to determine whether we are in production.
    Although very simple it is useful to enforce a single approach to be taken in
    determination of the environment.

-   A basic IdentifiableTimestamped TypeORM derivable class that contains properties
    which are extremely common in entities [id, createdAt, updatedAt].

-   A pretty standard factory for TypeORM configuration to be used in tandem with the
    `EnvironmentService`.

### Typescript customisations

-   The following tsconfig values have been changed to enforce some rule-sets I've
    found useful

```
{
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true
}
```

-   You may want to allow fallthrough switch cases but since I haven't run into
    needing fallthroughs often I've avoided allowing them.

### Prettier customisations

-   Prettier has been slightly customised with no trailing commas and a few other
    opinionated choices

```
{
  "semi": false,
  "tabWidth": 4,
  "trailingComma": "none"
}
```

-   Prettier ignore file added in the case that you use .ejs files for mailing purposes.
    I've had prettier butcher the files and break ejs syntax.

### Future

-   I will continue adding useful snippets and pieces of code as I go for my own reference
    and whoever else wants to checkout these tidbits of code.
