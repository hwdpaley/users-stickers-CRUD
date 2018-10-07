// Update with your config settings.

require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/curd_web'
    // client: 'mysql',
    // connection: {
    //   host: 'localhost',
    //   user: 'root',
    //   password: 'B163e802a1388B163e802a1388',
    //   database: 'curl_web'
    // }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     user: 'your_database_user',
//     password: 'your_database_password',
//     database: 'myapp_test'
//   }
// });