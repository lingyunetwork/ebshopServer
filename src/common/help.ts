import * as fs from 'fs';
import { think } from 'thinkjs';
import { md5 } from 'think-helper';
import * as http from 'http';
import * as https from 'https';
/**
 *  上传文件函数
 * @param file  file 对象
 * @param filename  想要保存的文件名   默认为md5随机名字（防覆盖）
 * @param savepath  保存路径   默认保存在根目录的upload里
 */
function upload(file: any, filename = "", savepath = think.ROOT_PATH + '/upload') {
    let filepath = file.path;
    if (filename == "" || filename == undefined) {
        let date = Date.now();
        let rundom = Math.random();
        filename = md5(file.name + rundom + date);
    }
    let arr = file.name.split('.');
    filename = filename + "." + arr[arr.length - 1];
    console.log(filename);
    think.mkdir(savepath);
    fs.readFile(filepath, function (err: any, data: any) {
        if (err) throw err;
        console.log('File read!');
        // Write the file
        fs.writeFile(savepath + '/' + filename, data, function (err: any) {
            if (err) {
                throw err;
            }
            console.log('File written!');
        });
        // Delete the file
        fs.unlink(filepath, function (err: any) {
            if (err) throw err;
            console.log('File deleted!');
        });
    });
    file.path = savepath + '/' + filename;
    return file.path;
}

function keysort(key: any, sortType: any) {
    return function (a: any, b: any) {
        return sortType ? ~~(a[key] < b[key]) : ~~(a[key] > b[key]);
    }
}
/**
 * 根据对象里的值排序
 * @param arr  需要排序的数组
 * @param key  数组中的对象为object,按object中的key进行排序
 * @param sortType  true为降序；false为升序
 */
function sortbykey(arr: any, key: any, sortType: any) {
    arr.sort(keysort(key, sortType));
    return arr;
}

/**
 * 取文本中间值
 * @param str  需要处理的字符串
 * @param leftStr   左边字符串
 * @param rightStr  右边字符串
 */
function regstr(str: string, leftStr: string, rightStr: string) {
    // let regExp = new RegExp("/\\d"+leftStr+"(.*?)\\d"+rightStr+"/","gim");
    let regExp = new RegExp(leftStr + "(\\S*?)" + rightStr, "g");
    // let res = regExp.exec(str);
    let res = str.match(regExp);
    return res;
}

/**
 * 生成指定数字随机数
 * @param sum    长度
 * @param minNum  默认为0
 * @param maxNum  默认为9
 */
function random_num(sum: number, minNum = 0, maxNum = 9) {
    let arr = [];
    for (let i = 0; i < sum; i++) {
        let number = 0;
        number = parseInt(Math.random() * (maxNum - minNum + 1) + minNum + "", 10);
        // return number;
        arr[i] = number;
    }
    return arr.join("");
}
/**
 * 生成指定字符串的随机字符
 * @param sum    长度
 * @param chars  为空即为 ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678
 */
function random_char(sum: number, chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678") {
    let char_arr = chars.split("");
    let str = "";
    for (let i = 0; i < sum; i++) {
        str += char_arr[random_num(1, 0, char_arr.length - 1)];
    }
    return str;
}

/**
 * 通过url下载文件到指定目录
 * @param url   需要下载文件的URL地址
 * @param path  保存路径  不传默认下载到根目录download文件夹内
 * @param filename 保存为什么名字 不传默认名字
 * @param header 需要的头信息 不传默认为空
 */
function down_file(url: string, path = think.ROOT_PATH + '/download', filename = "", header = {}) {
    let option = {
        headers: header
    };
    if (path == "" || path == undefined) {
        path = think.ROOT_PATH + '/download';
    }
    if (filename == "" || filename == undefined) {
        let file = url.split("/");
        filename = file[file.length - 1];
    }
    think.mkdir(path);
    http.get(url, option, function (res: any) {
        let body = "";
        res.on("data", function (chunk: any) {
            body += chunk;
        });
        res.on("end", function () {
            fs.writeFile(path + "/" + filename, body, { 'flag': 'a+' }, function (err) {
                if (err) {
                    throw err;
                }
            });
            console.log("save end");
        });
        res.on("error", function (err: any) {
            throw err;
        });
    }).end();
    return true;
}


module.exports = {
    upload,         // 上传文件
    sortbykey,      // 根据对象里的值排序
    regstr,         // 取文本中间值
    random_num,     // 生成指定数字随机数
    random_char,    // 生成指定字符串的随机字符
    down_file,      // 通过url下载文件到指定目录
};