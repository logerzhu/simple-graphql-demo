// @flow
import express from 'express'

import { graphiqlExpress } from 'apollo-server-express'
import graphQLRouter from './router/GraphQL'

import sequelize from './sequelize'

async function startServer () {
  await sequelize.sync({
    force: false,
    logging: (s) => { console.log(s) }
  })

  const app = express()

  // 通过 graphql-voyager 显示Model的关系图
  app.use(express.static(require('path').join(__dirname, '/../public')))

  // GraphQL 入口
  app.use('/graphql', graphQLRouter(sequelize))

  // 基于浏览器的GraphQL IDE
  app.get('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))

  const SERVER_PORT = 9413

  app.listen(SERVER_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${SERVER_PORT} , Env: ${process.env.NODE_ENV || 'default'}`
  ))
}

startServer().then(() => null, (err) => console.log('Init GraphQL Server Fail', err))
