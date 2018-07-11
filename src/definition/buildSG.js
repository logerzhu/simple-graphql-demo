// @flow
import Sequelize from 'sequelize'
import SG from 'simple-graphql'
import glob from 'glob'
import hooks from './hook'

export default function (sequelize:Sequelize) {
  sequelize.beforeDefine(function (attributes, options) {
    if (options) {
      options.tableName = options.modelName
    }
  })

  // 默认情况下,schema的目录下放置所有Schema定义
  const schemas = glob.sync(`${__dirname}/schema/**/*.js`, {
    ignore: ['**/__test__/*.js']
  }).map(file => require(file).default
  ).filter(schema => schema instanceof SG.Schema)

  // 默认情况下,service的目录下放置所有Service定义
  const services = glob.sync(`${__dirname}/service/**/*.js`, {
    ignore: ['**/__test__/*.js']
  }).map(file => require(file).default
  ).filter(schema => schema instanceof SG.Service)

  return SG.build({
    sequelize: sequelize,
    schemas: schemas,
    services: services,
    options: {
      hooks: hooks,
      mutation: {
        payloadFields: ['relay']
      },
      query: {
        viewer: 'AllQuery'
      }
    }
  })
}
