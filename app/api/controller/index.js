"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_js_1 = __importDefault(require("./base.js"));
class default_1 extends base_js_1.default {
    async indexAction() {
        const model = this.model('category');
        const list = await model.select();
        return this.success(list);
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map