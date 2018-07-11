// @flow
import express from 'express'
import bodyParser from 'body-parser'
import Sequelize from 'sequelize'
import { graphqlExpress } from 'apollo-server-express'

import {graphQLSchema} from '../definition'

export default function (sequelize:Sequelize) {
  const router = express.Router()

  // 参考: https://github.com/apollographql/apollo-server
  // 配置一个 GraphQL Server 入口, context 会传递到每个GraphQL的方法调用, 可以在这里提供一些公共的方法
  // 例如添加一个 loginUser: async function(...) 的方法, 那么在所有的query/mutation中都可以通过loginUser获得当前登录用户的信息
  // 同时也可以做下相关cache的处理
  router.use('/', bodyParser.json({limit: '10mb'}), function (req:any, res:any) {
    graphqlExpress({
      schema: graphQLSchema,
      context: {
        request: req
      }
    })(req, res)
  })

  return router
}
