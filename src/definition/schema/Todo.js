// @flow
import SG from 'simple-graphql'

export default SG.schema('Todo', {
  description: '待办事项',
  plugin: {
    pluralQuery: true,
    addMutation: true,
    updateMutation: true,
    deleteMutation: true
  }
}).fields({
  owner: {
    $type: 'User',
    required: true
  },
  title: {
    $type: String,
    required: true
  },
  desc: String,
  completed: {
    $type: Boolean,
    default: false,
    required: true
  },
  dueAt: Date
})
