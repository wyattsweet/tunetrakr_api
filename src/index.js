import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import express from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'

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
  bcrypt.hash(reqData.password, 10).then(hash => {
    usersApi.createUser(reqData.email, String(hash)).then(data => {
      const cert = fs.readFileSync('jwtRS256.key', 'utf8')
      const token = jwt.sign({sub: 1, email: 'joe@shmo.com'}, cert, {
        algorithm: 'RS256'
      })
      res.send(token)
    })
  })
})

app.listen(3000)
