const moment = require("moment-timezone");
const { Model } = require("objection");

class MedicationRemainder extends Model {
  static get tableName() {
    return "medication_remainders";
  }
  static get relationMappings() {
    const User = require("./user");
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "medication_remainders.user_id",
          to: "users.user_id",
        },
      },
    };
  }
  medication_remainder_id;
  medication_name;
  medication_dose;
  medication_time;
  repeat_interval;
  last_sent;
  medication_date;
  schedule;
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

module.exports = MedicationRemainder;
