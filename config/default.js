// @flow
export const db = {
  schema: 'test',
  user: 'user',
  password: 'pass',
  options: {
    host: 'localhost',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    // SQLite only
    storage: 'demo.sqlite',
    logging: (s:string) => { console.log(s) }
  }
}
