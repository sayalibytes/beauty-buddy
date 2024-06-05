/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'john_doe', email: 'john@example.com', password: 'password'},
    {id: 2, username: 'jane_lou', email: 'jane@example.com', password: 'password'}
  ]);
};
