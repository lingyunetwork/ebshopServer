import BaseRest from './rest';
import { think } from 'thinkjs';
import * as fs from 'fs';
import * as querystring from 'querystring';
export default class extends BaseRest {
    async getAction() {
        return this.success(this.ip);
        // let res = this.help.down_file("http://127.0.0.1/test/keygen.html", "", "", {
        //     'Accept': '*/*',
        //     'Accept-Encoding': 'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
        //     'Accept-Language': 'zh-CN,zh;q=0.8',
        //     'Connection': 'keep-alive',
        // });
        // return this.success(res);
    }
    async postAction() {
        let file = this.file("test");
        let result = this.help.upload(file);
        if (!result) {
            return this.success("上传失败");
        }
        return this.success(result);
    }
}
