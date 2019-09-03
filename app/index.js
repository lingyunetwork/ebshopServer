"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ThinkJS = __importStar(require("../node_modules/thinkjs"));
require("./extend/controller");
require("./extend/logic");
require("./extend/context");
require("./extend/think");
require("./extend/service");
require("./extend/application");
require("./extend/request");
require("./extend/response");
require("think-view");
require("think-model");
require("think-cache");
require("think-session");
exports.think = ThinkJS.think;
//# sourceMappingURL=index.js.map