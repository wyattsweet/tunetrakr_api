import express from 'express'
import path from 'path'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'

import UsersApi from './UsersApi'

const app = express()
const usersApi = new UsersApi()

app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, '/public')))
// app.use()

// app.get('/', (req, res) => {
// })

app.post('/api/v1/user', (req, res) => {
  const reqData = req.body
  // create a user
  // hash password
  bcrypt.hash(reqData.password, 10).then(hash => {
    // save stuff to db
    usersApi.createUser(reqData.email, String(hash))
  })
})

app.listen(3000)
