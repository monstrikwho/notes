import Joi from 'joi';

class Schema {
  create = Joi.object({
    message: Joi.string(),
  });
}

export default new Schema();
