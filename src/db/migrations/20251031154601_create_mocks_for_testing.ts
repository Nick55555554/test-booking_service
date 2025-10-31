import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex('events').insert([
        {
            name: 'Fireworks on the red square',
            total_seats: 3000,
        },
        {
            name: 'Sunday blue',
            total_seats: 1,
        },
        {
            name: 'My beatiful dream',
            total_seats: 0,
        },
        {
            name: 'Frontend and Backend lesson in MIREA ',
            total_seats: 30,
        },
    ]);
}

export async function down(knex: Knex): Promise<void> {
    await knex('events')
        .whereIn('name', [
            'My beatiful dream',
            'Frontend and Backend lesson in MIREA',
            'Sunday blue',
            'Fireworks on the red square',
        ])
        .delete();
}
