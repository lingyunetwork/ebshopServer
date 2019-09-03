"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const path = require('path');
const thinkjs_1 = require("thinkjs");
const isDev = thinkjs_1.think.env === "development";
exports.cache = {
    type: 'file',
    common: {
        timeout: 24 * 60 * 60 * 1000
    },
    file: {
        handle: fileCache,
        cachePath: path.join(thinkjs_1.think.ROOT_PATH, 'runtime/cache'),
        pathDepth: 1,
        gcInterval: 24 * 60 * 60 * 1000
    }
};
exports.model = {
    type: 'mysql',
    common: {
        logConnect: isDev,
        logSql: isDev,
        logger: (msg) => thinkjs_1.think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        database: 'Shop',
        prefix: 'shop_',
        encoding: 'utf8',
        host: '127.0.0.1',
        port: '',
        user: 'root',
        password: 'root',
        dateStrings: true,
        acquireWaitTimeout: isDev ? 3000 : 0
    }
};
exports.session = {
    type: 'file',
    common: {
        cookie: {
            name: 'thinkjs'
        }
    },
    file: {
        handle: fileSession,
        sessionPath: path.join(thinkjs_1.think.ROOT_PATH, 'runtime/session')
    }
};
exports.view = {
    type: 'nunjucks',
    common: {
        viewPath: path.join(thinkjs_1.think.ROOT_PATH, 'view'),
        sep: '_',
        extname: '.html'
    },
    nunjucks: {
        handle: nunjucks
    }
};
//# sourceMappingURL=adapter.js.map