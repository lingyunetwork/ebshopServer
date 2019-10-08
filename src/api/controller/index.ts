import Base from './base.js';
export default class extends Base {
  async indexAction() {
    const model = this.model('category');

    const list = await model.select();

    return this.success(list);
  }
}
