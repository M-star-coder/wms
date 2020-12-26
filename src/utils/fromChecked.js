/* eslint-disable no-useless-escape */
import { Message } from 'element-ui'

// 表单校验
export function fromChecked () {
  const checkedValue = document.querySelectorAll('[data-checked]')
  let oTurn = true
  const oTitle = []
  checkedValue.forEach(val => {
    const checkedValue = val.getAttribute('data-checkedValue')
    if (!checkedValue) {
      oTitle.push(val.getAttribute('data-checkedTitle'))
      oTurn = false
    } else {
      // 校验手机号
      if (val.getAttribute('data-checkedMobile') != null) {
        if (!checkedMobile(checkedValue)) {
          oTitle.push('请输入正确的手机号')
          oTurn = false
        }
      }
      // 校验电话号码
      if (val.getAttribute('data-checkedTelphone') != null) {
        if (!checkedTelphone(checkedValue)) {
          oTitle.push('请输入正确的电话号码')
          oTurn = false
        }
      }
      // 校验银行账号
      if (val.getAttribute('data-checkedBankAccount') != null) {
        if (!checkedBankAccount(checkedValue)) {
          oTitle.push('请输入正确的银行账号')
          oTurn = false
        }
      }
      // 校验统一社会信用代码
      if (val.getAttribute('data-checkedTanuNo') != null) {
        if (!checkedTanuNo(checkedValue)) {
          oTitle.push('请输入正确的统一社会信用代码')
          oTurn = false
        }
      }
      // 校验中文
      if (val.getAttribute('data-checkedCN') != null) {
        if (!checkedCN(checkedValue)) {
          oTitle.push('请输入正确的中文')
          oTurn = false
        }
      }
      // 校验英文
      if (val.getAttribute('data-checkedEN') != null) {
        if (!checkedEN(checkedValue)) {
          oTitle.push('请输入正确的英文')
          oTurn = false
        }
      }
      // 校验小数
      if (val.getAttribute('data-checkedFloat') != null) {
        if (!checkedFloat(checkedValue)) {
          oTitle.push('请输入正确的数字')
          oTurn = false
        }
      }
      // 校验正整数和0
      if (val.getAttribute('data-checkedNumber') != null) {
        if (!checkedNumber(checkedValue)) {
          oTitle.push('请输入整数')
          oTurn = false
        }
      }
      // 校验邮箱
      if (val.getAttribute('data-checkedEmail') != null) {
        if (!checkedEmail(checkedValue)) {
          oTitle.push('请输入正确的邮箱')
          oTurn = false
        }
      }
    }
  })
  if (oTitle.length) {
    Message.error(oTitle[0])
  }
  return oTurn
}

// 校验手机号
export function checkedMobile (value) {
  var ext = /^1[3456789]\d{9}/
  return ext.test(value)
}
// 校验电话号码
export function checkedTelphone (value) {
  var ext = /^(\d{3,4}|\d{3,4}-|\s)?\d{7,8}$/
  return ext.test(value)
}
// 校验传真号
export function checkedFax (value) {
  var ext = /^(?:\d{3,4}-)?\d{7,8}(?:-\d{1,6})?$/
  return ext.test(value)
}
// 校验银行账号
export function checkedBankAccount (value) {
  var ext = /^[0-9]{16,19}$/
  return ext.test(value)
  // return true
}
// 校验统一社会信用代码
export function checkedTanuNo (value) {
  var ext = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
  return ext.test(value)
}
// 校验中文
export function checkedCN (value) {
  var ext = /^[\u4E00-\u9FA5\/]+$/
  return ext.test(value)
}
// 校验英文
export function checkedEN (value) {
  var ext = /^[ A-Za-z\/`~!#$%^&*()_\+=<>?:"{}|~！#￥%……&*（）={}|《》？：“”【】、；‘’，。、\s+]+$/
  return ext.test(value)
}
// 校验小数
export function checkedFloat (value) {
  var ext = /^\d+(\.\d+)?$/
  return ext.test(value)
}
// 校验正整数和0
export function checkedNumber (value) {
  var ext = /^(0|\+?[1-9][0-9]*)$/
  return ext.test(value)
}
// 校验邮箱
export function checkedEmail (value) {
  var ext = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return ext.test(value)
}

// 校验checkbox
export function isStringNo (rule, value, callback) {
  console.log(value)
  if (value.replace(/(^\s*)|(\s*$)/, '') !== '') {
    callback()
  } else {
    callback(new Error('请输入驳回备注'))
  }
}
