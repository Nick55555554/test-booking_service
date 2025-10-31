import { Model } from 'objection';

import { knex } from '@/config/db';

beforeAll(async () => {
    Model.knex(knex);
});

afterAll(async () => {
    await knex.destroy();
});

jest.mock('@/db/models/booking-model');
jest.mock('@/db/models/event-model');
