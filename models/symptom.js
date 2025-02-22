const moment = require("moment-timezone");
const { Model } = require("objection");

class Symptom extends Model {
  static get tableName() {
    return "symptoms";
  }
  static get relationMappings() {
    const User = require("./user");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "symptoms.user_id",
          to: "users.user_id",
        },
      },
    };
  }
  symptom_id;
  prompt;
  symptom;
  user_id;
  created_at;
  updated_at;

  $beforeInsert() {
    const now = moment.tz("Africa/Lagos").format("YYYY-MM-DD HH:mm:ss");
    this.created_at = now;
    this.updated_at = now;
  }
  $beforeUpdate() {
    const now = moment.tz("Africa/Lagos").format("YYYY-MM-DD HH:mm:ss");
    this.updated_at = now;
  }
}

module.exports = Symptom;
