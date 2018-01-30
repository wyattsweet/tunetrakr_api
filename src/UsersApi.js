import {Pool} from 'pg'

const pool = new Pool({
  host: 'localhost',
  database: 'tunetrakr',
  port: '5432',
})

class UsersApi {
  // TODO: rewrite this as a promise
  createUser(email, password) {
    return new Promise((res, rej) => {
      pool.connect().then(client => {
        const queryText =
          'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *'
        const values = [email, password]
        return client.query(queryText, values).then(data => {
          client.release()
          res(JSON.stringify(data.rows))
        })
      })
    })
  }
}

export default UsersApi
