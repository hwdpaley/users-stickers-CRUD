
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.varchar('email', 100).unique().notNullable();
    table.varchar('password', 50).notNullable();
    table.datetime('date').notNullable();
    table.boolean('is_active').notNullable().defaultTo(true);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
