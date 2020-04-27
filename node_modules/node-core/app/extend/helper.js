const crypto = require('crypto')

module.exports = {
  /**
   * 单词首字母大写
   * @returns {string}
   */
  capitalize ([first, ...rest]) {
    return first.toUpperCase() + rest.join('')
  },

  /**
   * 格式化查询
   * @returns {Object}
   */
  formatQuery (query) {
    const {offset = 0, limit = 10, where = '{}', order = [['id', 'DESC']]} = query

    return {offset: +offset, limit: +limit, where: JSON.parse(where), order}
  },

  /**
   * MD5 加密
   * @returns {string}
   */
  md5 (string) {
    return crypto.createHash('md5').update(string).digest('hex')
  },

  /**
   * 分页
   * @returns {string}
   */
  page ({url = '', total, page = 1, limit} = {}) {
    const pages = Math.ceil(total / limit)

    let ret = `<div class="page">`

    if (page === 1) {
      ret += `<span class="page-first">首页</span>`
      ret += `<span class="page-prev">上一页</span>`
    } else {
      ret += `<a class="page-first" href="${url}?p=1">首页</a>`
      ret += `<a class="page-prev" href="${url}?p=${page - 1}">上一页</a>`
    }

    if (pages === page) {
      ret += `<span class="page-next">下一页</span>`
      ret += `<span class="page-last">尾页</span>`
    } else {
      ret += `<a class="page-next" href="${url}?p=${page + 1}">下一页</a>`
      ret += `<a class="page-last" href="${url}?p=${pages}">尾页</a>`
    }

    ret += `</div>`

    return ret
  },

  /**
   * 格式化分页参数
   * @param page 分页参数
   * @returns {number}
   */
  formatPage (page) {
    return /^[0-9]*[1-9][0-9]*$/.test(page) ? +page : 1
  }
}
