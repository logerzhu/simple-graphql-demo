// @flow
import sequelize from '../sequelize'

import buildSG from './buildSG'

export const {graphQLSchema, sgContext} = buildSG(sequelize)
