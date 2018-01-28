const {Pool} = require('pg')

// For now this will only connect in development
// TODO: make this dynamic based on environment
const pool = new Pool({
  host: 'localhost',
  database: 'tunetrakr',
  port: '5432',
})

pool.connect((err, client, release) => {
  if (err) throw new Error(err)

  const createUsersTable =
    'CREATE TABLE users(id serial primary key, created_at timestamp default now(), updated_at timestamp default now(), email citext not null unique, password varchar(60) not null);'
  client.query(createUsersTable, (err, results) => {
    release()
  })
})

pool.end()
console.log('all tables created!!!')
