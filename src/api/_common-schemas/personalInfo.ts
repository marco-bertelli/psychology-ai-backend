import { Schema } from 'mongoose';

const personalInfoBodymenSchema =
  /**
   * @api {js} personalInfoSchema
   * @apiGroup CommonSchemas
   * @apiName personalInfoSchema
   * @apiExample {js} Entity schema: */
  {
    streetName: {
      type: String
    },
    zipCode: {
      type: String
    },
    city: {
      type: String
    },
    province: {
      type: String
    },
    region: {
      type: String
    },
    state: {
      type: String
    },
    vatNumber: {
      type: String
    },
    telephone: {
      type: String
    }
  };
/* **/

const personalInfoSchema = new Schema(personalInfoBodymenSchema, {
  _id: false,
  id: false
});

export default personalInfoSchema;
