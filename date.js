/* eslint-disable */ //关闭Eslint检查
const moment = require('./moment.min.js')
const isBlank = (param) => {
  if (param === null || param === undefined || param === '' || param.length === 0) {
    return true
  }
  return false
}

/**
 * date日期工具类
 */
module.exports = {
    /**
     * 日期格式转换，默认格式：YYYY-MM-DD HH:mm:ss
     * @param date 待处理日期：若日期为空，则返回格式化后的当前日期
     * @returns {}
     */
  dateFormat: function(date, pattern) {
    if (isBlank(pattern)) { pattern = 'YYYY-MM-DD HH:mm:ss' }

    if (isBlank(date)) { return moment().format(pattern) } else { return moment(date).format(pattern) }
  },
    /**
     * 日期格式转换为：YYYY
     * @param date 待处理日期：若日期为空，则返回格式化后的当前日期
     * @returns {}
     */
  dateFormatYYYY: function(date) {
    if (isBlank(date)) { return moment().format('YYYY') } else { return moment(date).format('YYYY') }
  },
    /**
     * 日期格式转换为：YYYY-MM-DD
     * @param date 待处理日期：若日期为空，则返回格式化后的当前日期
     * @returns {}
     */
  dateFormatYYYY_MM_DD: function(date) {
    if (isBlank(date)) { return moment().format('YYYY-MM-DD') } else { return moment(date).format('YYYY-MM-DD') }
  },
    /**
     * 为传入日期增加或减少多少天
     * @param date 待处理日期：若日期为空，使用当前日期
     * @param days 增加或减少多少天，支持负数
     * @returns {string}
     */
  addDay: function(date, days) {
    if (isBlank(date)) { return moment().add(days, 'days').format('YYYY-MM-DD') } else { return moment(date).add(days, 'days').format('YYYY-MM-DD') }
  },
    /**
     * 根据传入的日期计算所在自然周的星期一和星期天日期
     * @param date
     * @returns {string}
     */
  getMondayAndSundayOfWeek: function(date) {
    if (isBlank(date)) { // 若传值为空，则默认当前日期
      date = moment()
    }
    const weekOfDay = moment(date).format('E')
    const monday = moment(date).add(1 - weekOfDay, 'days').format('YYYY-MM-DD')
    const sunday = moment(date).add(7 - weekOfDay, 'days').format('YYYY-MM-DD')
    return { monday, sunday }
  },
    /**
     * 获取2个日期时间相差多少秒
     * @param date1 日期时间1
     * @param date2 日期时间2
     * @returns {}
     */
  getDiffSeconds: function(datetime1, datetime2) {
    return Math.abs(moment(datetime1).diff(moment(datetime2), 'seconds'))
  },
  /**
     * 获取2个日期时间相差多少秒,返回负数，比较大小
     * @param date1 日期时间1
     * @param date2 日期时间2
     * @returns {}
     */
  getDiffSecondsNotabs: function(datetime1, datetime2) {
      return moment(datetime1).diff(moment(datetime2), 'seconds')
    },
    /**
     * 获取2个日期时间相差多少天
     * @param date1 日期时间1
     * @param date2 日期时间2
     * @returns {}
     */
  getDiffDay: function(datetime1, datetime2) {
    if (isBlank(datetime1)) { datetime1 = Date.now() }
    if (isBlank(datetime2)) { datetime2 = Date.now() }

    return Math.abs(moment(datetime1).diff(moment(datetime2), 'day'))
  },
    /**
     * 返回开始、结束日期的日期数组
     * @param startDate
     * @param endDate
     * @returns {Array}
     */
  getDateArray: function(startDate, endDate) {
    let diffDay = Math.abs(moment(startDate).diff(moment(endDate), 'day')) // 获取开始和结束日期相差多少天
    let dates = []
    let tempDate = startDate
    for (let i = 0; i < (diffDay + 1); i++) {
      dates.push(tempDate)
      tempDate = moment(tempDate).add(1, 'days').format('YYYY-MM-DD')
    }
    return dates
  },
    /**
     * 获取传入日期是所在的小时
     * @param date
     * @returns {number}
     */
  getHourOfDay: function(date) {
    return moment(date).format('H')
  },
    /**
     * 获取传入日期是星期几
     * @param date
     * @returns {number}
     */
  getDayOfWeek: function(date) {
    return moment(date).format('E')
  },
    /**
     * 获取传入日期是该年的几月份
     * @param date
     * @returns {number}
     */
  getMonthOfYear: function(date) {
    return moment(date).format('M')
  },
    /**
     * 获取传入日期是该年的第几个自然周
     * @param date
     * @returns {number}
     */
  getWeekOfYear: function(date) {
    return moment(date).format('W')
  },
    /**
     * 获取传入日期是该月份的几号
     * @param date
     * @returns {number}
     */
  getDayOfMonth: function(date) {
    return moment(date).format('D')
  },
    /**
     * 获取2个日期时间相差多少天,返回的是负数
     * @param date1 日期时间1
     * @param date2 日期时间2
     * @returns {}
     */
  getDiffDayNotabs: function(datetime1, datetime2) {
    if (isBlank(datetime1)) { datetime1 = Date.now() }
    if (isBlank(datetime2)) { datetime2 = Date.now() }

    return moment(datetime1).diff(moment(datetime2), 'day')
  },
    /**
     *日期计算
     * date:日期对象、数字、字符串
     * str:计算字符串  -负数 y年 Q季 M月 w周 d日 h时 m分 s秒 ms毫秒      eg:'-1y' / '1y'
     * 注意：得到的是一个moment对象，还需要做TODO:getCal(date, str).format('格式')处理
     */
  getCalc: function(date, str) {
    if (!date) date = moment().format('YYYY-MM-DD HH:mm:ss')
    if (!str) str = '0d'
    const regUnit = /y$|Q$|M$|w$|d$|h$|m$|s$|ms$/
    const regSign = /^\-/
    const num = Math.abs(parseInt(str) || 0)
    const unit = str.match(regUnit)[0] || 'd'
    const isNegative = !!str.match(regSign)
    if (isNegative) return moment(date).subtract(num, unit)
    else return moment(date).add(num, unit)
  },
    /**
     * 根据传入的当前月份和参数，获取对应季度的开始日期和结束日期
     * @param mowMonth 表示当前的月份
     * @param num 0表示获取本季度的开始和结束日期，-1表示上个季度的，1表示当前季度的
     */
  getQuarterStartAndEnd: function(nowMonth, num) {
    if (isBlank(num)) {
      num = 0
    }
    let quarter = 1
    let startDate = ''
    let endDate = ''
    if (nowMonth <= 3) {
      quarter = 1
    } else if (nowMonth > 3 && nowMonth <= 6) {
        quarter = 2
      } else if (nowMonth > 6 && nowMonth <= 9) {
          quarter = 3
        } else if (nowMonth > 9 && nowMonth <= 12) {
          quarter = 4
        }
    let quarterNum = quarter + num
    switch (quarterNum) {
      case 1:
        return { startDate: '01月01日', endDate: '03月31日' }
        break
      case 2:
        return { startDate: '04月01日', endDate: '06月30日' }
        break
      case 3:
        return { startDate: '07月01日', endDate: '09月30日' }
        break
      case 4:
        return { startDate: '10月01日', endDate: '12月31日' }
        break

      default:
        break
    }
  },
  /**
   *  根据传入的时间参数，计算所在的月份的开始、结束日期
   * @param  date 传入的时间参数
   */
  getMonthDays: function (date) {
    if (!date) date = moment()
    // let dates = []
    let dates = {}
    let start = moment(date).add(0, 'month').format('YYYY-MM') + '-01'
    let end = moment(start).add(1, 'month').add(-1, 'days').format('YYYY-MM-DD')
    // dates.push(start)
    // dates.push(end)
    dates.start = start
    dates.end = end
    return dates
  },
  /**
   * 根据传入的参数，计算所在季度的开始、结束时间
   * @param {*} date 传入的时间参数
   */
  getMonthOfQuarter: function (date) {
    if (!date) date = moment()
    const q = moment(date).quarter()
    const y = moment(date).year()
    let obj = {}
    if (q === 1) obj = { start: y + '-01-01', end: y + '-03-31' }
    else if (q === 2) obj = { start: y + '-04-01', end: y + '-06-30' }
    else if (q === 3) obj = { start: y + '-07-01', end: y + '-09-30' }
    else if (q === 4) obj = { start: y + '-10-01', end: y + '-12-31' }
    return obj
  }
}
