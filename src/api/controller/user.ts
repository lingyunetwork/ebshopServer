import BaseRest from './rest';
import { think } from 'thinkjs';
import token from '../service/token';
export default class extends BaseRest {

    async postAction() {

        var userName = this.post("u");
        var password = this.post("p");

        if (think.isEmpty(userName) || think.isEmpty(password)) {
            return this.fail('登录失败');
        }

        var user =await this.modelInstance.field("password,id").where({ "username": userName }).find();

        if (password != user["password"]) {
            return this.fail('密码错误');
        }
        const tokenSerivce = this.service('token', 'api') as token;

       
        const sessionKey = await tokenSerivce.create({ uid: user["id"] });

        return this.success({token: sessionKey});
    }
}
