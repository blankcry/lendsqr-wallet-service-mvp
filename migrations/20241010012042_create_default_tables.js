/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema
    .createTableIfNotExists('users', table => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('token');
      table.timestamps(true, true); // Add created_at and updated_at columns
    })
    .createTableIfNotExists('wallets', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.decimal('balance', 10, 2).notNullable();
      table.string('currency', 10).notNullable();
      table.timestamps(true, true); // Add created_at and updated_at columns

      table.foreign('user_id').references('id').on('users');
    })
    .createTableIfNotExists('posts', table => {
      table.increments('id').primary();
      table.string('ref', 255).notNullable().unique();
      table.integer('amount').notNullable();
      table.string('type', 45).notNullable();
      table.string('treatment', 45).notNullable();
      table.string('status', 45).notNullable();
      table.integer('recipient_id').unsigned().notNullable();
      table.integer('initiated_by').unsigned().notNullable();
      table.integer('wallet_id').unsigned().notNullable();
      table.string('remark');
      table.timestamps(true, true); // Add created_at and updated_at columns

      table.foreign('recipient_id').references('id').on('users');
      table.foreign('initiated_by').references('id').on('users');
      table.foreign('wallet_id').references('id').on('wallets');
    })
    .createTableIfNotExists('wallet_ledgers', table => {
      table.increments('id').primary();
      table.integer('post_id').unsigned().notNullable();
      table.integer('wallet_id').unsigned().notNullable();
      table.decimal('balanceBefore', 10, 2).notNullable();
      table.decimal('balanceAfter', 10, 2).notNullable();
      table.timestamps(true, true); // Add created_at and updated_at columns

      table.foreign('post_id').references('id').on('posts');
      table.foreign('wallet_id').references('id').on('wallets');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('wallet_ledgers')
    .dropTable('posts')
    .dropTable('wallets')
    .dropTable('users');
};
