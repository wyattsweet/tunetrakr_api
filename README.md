# TuneTrakr API

## Database Design

**users table**

|field name|data type|notes|
|---|---|---|
|id|`serial primary key`|   |
|created_at|`timestamp default now()`|   |
|updated_at|`timestamp default now()`|   |
|email|`citext not null unique`|citext gives efficient, case-insensitive lookups. More info [here](https://hashrocket.com/blog/posts/working-with-email-addresses-in-postgresql)|
|password|`varchar(60) not null`|bcrypt passwords are always 60 chars|

*Note:* Must add citext module to database before using. Access database from within the PostgreSQL shell prompt and run `CREATE EXTENSION citext;`. Then create the table.
