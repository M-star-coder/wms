// 校验手机号
export function checkedMobile (rule, value, callback) {
  console.log(value)
  var reg = /^1[3456789]\d{9}/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('手机号码格式不正确，请重新输入'))
    } else {
      callback()
    }
  }
}
