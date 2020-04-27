module.exports = app => {
  return class extends app.Service {
    constructor (ctx) {
      super(ctx)

      this.module = ''
      this.model = null
    }

    /**
     * 获取当前模型
     * @param module 模块
     * @returns {Object}
     */
    getModel (module) {
      const {capitalize} = this.ctx.helper

      if (!this.model) {
        this.model = this.ctx.model[capitalize(module || this.module)]
      }

      return this.model
    }

    /**
     * 查询
     * @returns {Promise}
     */
    async find ({id = '', attributes = null, offset = 0, limit = 10, where = null, order = [['id', 'DESC']]} = {}) {
      if (id) {
        return this.getModel().findById(id)
      } else {
        return this.getModel().findAll({attributes, offset, limit, where, order})
      }
    }

    /**
     * 删除
     * @returns {Promise}
     */
    async destroy ({id}) {
      return this.getModel().destroy({
        where: {id}
      })
    }

    /**
     * 新增
     * @returns {Promise}
     */
    async create ({body = null} = {}) {
      return this.getModel().create(body)
    }

    /**
     * 更新
     * @returns {Promise}
     */
    async update ({id, body = null} = {}) {
      return this.getModel().update(body, {
        where: {id}
      })
    }

    /**
     * 获取记录总数
     * @returns {Promise}
     */
    async count ({where = null} = {}) {
      return this.getModel().count({where})
    }
  }
}
