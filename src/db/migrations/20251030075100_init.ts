import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await Promise.all([
        knex.schema.createTable('events', table => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.integer('total_seats').notNullable();
        }),
        knex.schema.createTable('bookings', table => {
            table.increments('id').primary();
            table.integer('event_id').unsigned().notNullable();
            table.string('user_id', 255).notNullable();
            table.timestamps(true, true);

            table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
            table.index(['event_id']);
            table.index(['user_id']);
        }),
    ]);
}

export async function down(knex: Knex): Promise<void> {
    await Promise.all([knex.schema.dropTable('bookings'), knex.schema.dropTable('events')]);
}
