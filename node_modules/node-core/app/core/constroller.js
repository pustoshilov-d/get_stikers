module.exports = app => {
  return class extends app.Controller {
    constructor (ctx) {
      super(ctx)

      this.module = ''
      this.service = null
    }

    /**
     * 获取当前 service
     * @param module 模块
     * @returns {Object}
     */
    getService (module) {
      if (!this.service) {
        this.service = this.ctx.service[module || this.module]
      }

      return this.service
    }

    /**
     * 获取列表
     * @returns {Promise}
     * @private
     */
    async _index () {
      const {offset, limit, where} = this.ctx.helper.formatQuery(this.ctx.request.query)

      this.response({
        status: 200,
        data: {
          total: await this.getService().count({where}),
          items: await this.getService().find({offset, limit, where})
        }
      })
    }

    /**
     * 获取单条记录
     * @returns {Promise}
     * @private
     */
    async _show () {
      this.response({
        status: 200,
        data: await this.getService().find({id: this.ctx.params.id})
      })
    }

    /**
     * 新增
     * @returns {Promise}
     * @private
     */
    async _create () {
      this.response({
        status: 201,
        data: await this.getService().create({body: this.ctx.request.body})
      })
    }

    /**
     * 更新
     * @returns {Promise}
     * @private
     */
    async _update () {
      await this.getService().update({
        id: this.ctx.params.id,
        body: this.ctx.request.body
      })
      this.response({status: 204})
    }

    /**
     * 删除
     * @returns {Promise}
     * @private
     */
    async _destroy () {
      await this.getService().destroy({id: this.ctx.params.id})
      this.response({status: 204})
    }

    /**
     * 签发 token
     * @param userInfo 不敏感的用户信息
     * @param expiresIn 过期时间
     *   如：60=60*1000ms、'1d'=24*60*60*1000ms、'1h'=60*60*1000ms、'1m'=60*1000ms、'1s'=1000ms、'1y'=365.25*24*60*60*1000ms
     * @returns {string}
     */
    sign ({userInfo, expiresIn}) {
      const {jwt, config} = this.app
      return jwt.sign(userInfo, config.jwt.secret, {expiresIn})
    }

    /**
     * 校验 token
     * @returns {Object}
     */
    verify () {
      const token = this.ctx.header.authorization
      const {jwt, config} = this.app
      return jwt.verify(token, config.jwt.secret)
    }

    /**
     * 将数据注册到 $
     * @param data 数据
     * @returns {Object}
     */
    $ (data = {}) {
      return {
        $: {
          settings: {},
          ...data
        }
      }
    }

    /**
     * 返回
     * @param status 状态码
     * @param error 错误
     * @param data 数据
     */
    response ({status = 200, error = null, data = null} = {}) {
      this.ctx.status = status
      this.ctx.body = {error, data}
    }
  }
}
