"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const thinkjs_1 = require("thinkjs");
const isDev = thinkjs_1.think.env === 'development';
module.exports = [
    {
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev
        }
    },
    {
        handle: 'resource',
        enable: isDev,
        options: {
            root: path.join(thinkjs_1.think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    },
    {
        handle: 'trace',
        enable: !thinkjs_1.think.isCli,
        options: {
            debug: isDev
        }
    },
    {
        handle: 'payload',
        options: {
            keepExtensions: true,
            limit: '5mb'
        }
    },
    {
        handle: 'router',
        options: {}
    },
    'logic',
    'controller'
];
//# sourceMappingURL=middleware.js.map