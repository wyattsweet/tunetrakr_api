import {Pool} from 'pg'

const pool = new Pool({
  host: 'localhost',
  database: 'tunetrakr',
  port: '5432',
})

class UsersApi {
  // TODO: rewrite this as a promise
  createUser(email, password) {
    pool.connect((err, client, release) => {
      if (err) {
        client.release()
        console.log(err)
      }
      const queryText =
        'INSERT INTO users(email, password) VALUES ($1, $2) RETURNING *'
      const values = [email, password]
      const query = client.query(queryText, values, (err, result) => {
        if (err) {
          console.error(err.stack)
        } else {
          console.log(result.rows)
        }
      })
    })

    //      .then(client => {
    //          email,
    //          password,
    //        ])
    //      })
    //      .then(res => {
    //        client.release()
    //        console.log(res)
    //      })
  }
}

export default UsersApi
