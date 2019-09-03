"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const thinkjs_1 = require("thinkjs");
module.exports = [
    view,
    model(thinkjs_1.think.app),
    cache,
    session
];
//# sourceMappingURL=extend.js.map