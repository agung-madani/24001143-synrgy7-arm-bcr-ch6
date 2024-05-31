import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table) => {
    table.uuid('car_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('car_name').notNullable();
    table.enum('category', ['small', 'medium', 'large']).notNullable();
    table.timestamp('start_rent').nullable();
    table.timestamp('finish_rent').nullable();
    table.integer('price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.uuid('created_by').references('id').inTable('users').onDelete('SET NULL');
    table.uuid('updated_by').references('id').inTable('users').onDelete('SET NULL');
    table.enum('deleted_status', ['active', 'deleted']).defaultTo('active');
    table.uuid('deleted_by').references('id').inTable('users').onDelete('SET NULL');
    table.string('car_image').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
