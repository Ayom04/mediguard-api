const moment = require("moment-timezone");
const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  user_id;
  name;
  email_address;
  password_hash;
  password_salt;
  phone_number;
  location;
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

module.exports = User;
