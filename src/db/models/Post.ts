import {BaseModel} from './BaseModel';
import {User} from './User';

export class Post extends BaseModel {
  static get tableName() {
    return 'posts'; // Table name in the database
  }

  static get idColumn() {
    return 'id';
  }

  static jsonSchema = {
    type: 'object',
    required: ['ref', 'balanceBefore', 'user_id'],

    properties: {
      id: {type: 'integer'},
      ref: {type: 'string', minLength: 1, maxLength: 255},
      treatment: {type: 'string', minLength: 1, maxLength: 255},
      amount: {type: 'integer'},
      status: {type: 'string', enum: ['PENDING', 'SUCCESS', 'FAILED']},
      content: {type: 'string', minLength: 1},
      user_id: {type: 'integer'},
    },
  };

  // Define the relationship with the User model
  static relationMappings = {
    user: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: User, // Reference to the User model
      join: {
        from: 'posts.user_id',
        to: 'users.id',
      },
    },
  };
}
