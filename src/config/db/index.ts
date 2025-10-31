import Knex from 'knex';
import { Model } from 'objection';
const knexConfig = require('./knexfile');

const knex = Knex(knexConfig);

Model.knex(knex);

export { knex };
export default knex;
