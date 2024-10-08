import {BaseModel} from './BaseModel';

export class User extends BaseModel {
  static get tableName() {
    return 'users'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  static jsonSchema = {
    type: 'object',
    required: ['name', 'email'],
    properties: {
      id: {type: 'integer'},
      name: {type: 'string', minLength: 1, maxLength: 255},
      email: {type: 'string', minLength: 1, maxLength: 255},
      token: {type: 'string'},
    },
  };

  static relationMappings = {
    posts: {
      relation: BaseModel.HasManyRelation,
      modelClass: 'Post', // Reference to another model
      join: {
        from: 'users.id',
        to: 'posts.userId',
      },
    },
  };
}
