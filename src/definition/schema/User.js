// @flow
import SG from 'simple-graphql'
import Sequelize from 'sequelize'

export default SG.schema('User', {
  description: '用户',
  plugin: {
    singularQuery: true,
    pluralQuery: true,
    addMutation: {
      acl: acl => acl.isAdmin()
    },
    updateMutation: {
      acl: acl => acl.isAdmin()
    },
    deleteMutation: {
      acl: acl => acl.isAdmin()
    }
  }
}).fields({
  name: {
    $type: String,
    required: true,
    column: {
      unique: true,
      type: Sequelize.STRING(191)
    }
  },
  password: {
    $type: String,
    hidden: true
  },
  role: {
    $type: String,
    enumValues: ['Admin', 'User']
  },
  accessToken: {
    $type: String
  }
}).methods({
  isAdmin: function () {
    return this.role === 'Admin'
  }
})
