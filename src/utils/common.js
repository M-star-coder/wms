export const imgReg = /<img.*?(?:>|\/>)/gi

export function formatDate (date, fmt) {
  const d = new Date(date)
  var o = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    S: d.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (d.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        // eslint-disable-next-line eqeqeq
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function uuid (len, radix, containTime) {
  var now = new Date()
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    ''
  )
  var uuid = []
  var i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    var r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        // eslint-disable-next-line eqeqeq
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  // eslint-disable-next-line eqeqeq
  if (containTime == null && containTime == true) { return now.getTime() + '' + uuid.join('') } else return uuid.join('')
}

export function getBase64ByImg (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function sleep (time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function SectionToChinese (num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    return
  }
  var AA = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '镹']
  var BB = ['', '拾', '佰', '千', '万', '亿', '', '']
  var CC = ['角', '分']
  var a = ('' + num).replace(/(^0*)/g, '').split('.')
  var k = 0
  var re = ''
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) { re = BB[4] + re }
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    // eslint-disable-next-line eqeqeq
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) { re = AA[0] + re }
    // eslint-disable-next-line eqeqeq
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
    k++
  }
  re += '圆'
  if (a.length > 1) {
    // eslint-disable-next-line no-redeclare
    for (var i = 0; i < a[1].length; i++) {
      re += AA[a[1].charAt(i)] + CC[i]

      // eslint-disable-next-line eqeqeq
      if (i == 1) {
        break
      }
    }
  }
  return re
}

const currencyObj = {
  CNY: '￥',
  USD: '$',
  EUR: '€'
}
export function fmtCurrency (currency) {
  return currencyObj[currency] || ''
}

export function floatNumber (number, l = 0) {
  const multiple = Math.pow(10, l)
  // eslint-disable-next-line no-undef
  return numeral(number * multiple).format('0') / multiple
}

export function downloadIamge(imgsrc, name) {
    //下载图片地址和图片名
    var image = new Image();
    // 解决跨域 Canvas 污染问题
    image.setAttribute("crossOrigin", "anonymous");
    image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
    };
    image.src = imgsrc;
}