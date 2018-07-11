
export default {
  description: '为 Mutation 操作打开 transaction 操作',
  filter: ({type, config}) => type === 'mutation',
  hook: async function (action, {sgContext: {sequelize}}, next) {
    const result = await sequelize.transaction(function (t) {
      return next()
    })
    return result
  }
}
