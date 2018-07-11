import Sequelize from 'sequelize'
import cls from 'continuation-local-storage'

import config from 'config'

// 根据环境变量 process.env.NODE_ENV 读取 /config 目录下的配置
const dbCfg = config.get('db')

// 参考: http://docs.sequelizejs.com/manual/tutorial/transactions.html#automatically-pass-transactions-to-all-queries
// 通过 cls 实现 DB transaction的自动嵌套传递, 配合 /src/definition/hook/TransactionHook.js 可以为所有mutation开启transaction
const namespace = cls.createNamespace('db-transaction-nsp')
Sequelize.useCLS(namespace)

export default new Sequelize(dbCfg.schema, dbCfg.user, dbCfg.password, dbCfg.options)
