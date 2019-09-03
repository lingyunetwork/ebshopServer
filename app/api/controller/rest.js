"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const thinkjs_1 = require("thinkjs");
class default_1 extends thinkjs_1.think.Controller {
    constructor(ctx) {
        super(ctx);
        this.resource = this.getResource();
        this.id = this.getId();
        assert(thinkjs_1.think.isFunction(this.model), 'this.model must be a function');
        this.modelInstance = this.model(this.resource);
    }
    __before() { }
    getResource() {
        return this.ctx.controller.split('/').pop();
    }
    getId() {
        const id = this.get('id');
        if (id && (thinkjs_1.think.isString(id) || thinkjs_1.think.isNumber(id))) {
            return id;
        }
        const last = this.ctx.path.split('/').slice(-1)[0];
        if (last !== this.resource) {
            return last;
        }
        return '';
    }
    async getAction() {
        let data;
        if (this.id) {
            const pk = this.modelInstance.pk;
            data = await this.modelInstance.where({ [pk]: this.id }).find();
            return this.success(data);
        }
        data = await this.modelInstance.select();
        return this.success(data);
    }
    async postAction() {
        const pk = this.modelInstance.pk;
        const data = this.post();
        if (data[pk]) {
            delete data[pk];
        }
        if (thinkjs_1.think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        const insertId = await this.modelInstance.add(data);
        return this.success({ id: insertId });
    }
    async deleteAction() {
        if (!this.id) {
            return this.fail('params error');
        }
        const pk = this.modelInstance.pk;
        const rows = await this.modelInstance.where({ [pk]: this.id }).delete();
        return this.success({ affectedRows: rows });
    }
    async putAction() {
        if (!this.id) {
            return this.fail('params error');
        }
        const pk = this.modelInstance.pk;
        const data = this.post();
        data[pk] = this.id;
        if (thinkjs_1.think.isEmpty(data)) {
            return this.fail('data is empty');
        }
        const rows = await this.modelInstance.where({ [pk]: this.id }).update(data);
        return this.success({ affectedRows: rows });
    }
    __call() {
    }
}
exports.default = default_1;
//# sourceMappingURL=rest.js.map