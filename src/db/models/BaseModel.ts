import {Model} from 'objection';
import knex from '../knex';

Model.knex(knex);

export class BaseModel extends Model {
  created_at?: Date;
  updated_at?: Date;

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
