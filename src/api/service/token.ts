import { think } from "thinkjs";
import jwt = require("jsonwebtoken");

export default class extends think.Service {
  secret = 'SLDLKKDS323ssdd@#@@gf';

  async getUserId(token: string) {
    if (!token) {
      return 0;
    }

    const result = await this.parse(token);
    if (think.isEmpty(result) || result["uid"] <= 0) {
      return 0;
    }

    return result["uid"];
  }

  async create(userInfo: any) {

    const token = jwt.sign(userInfo, this.secret);
    return token;
  }

  async parse(token: string) {
    if (token) {
      try {
        return jwt.verify(token, this.secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  async verify(token: string) {
    const result = await this.parse(token);
    if (think.isEmpty(result)) {
      return false;
    }

    return true;
  }
}
