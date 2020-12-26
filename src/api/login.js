import request from '@/utils/request'
import qs from 'qs'
import { Base64 } from 'js-base64'

export function loginJobNumber (uName, pwd) {
  return request({
    url: '/api/auth/oauth/token',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic OGQzM2E1NjM2Zjg1NGM1OWE5N2IxZDNmNzJjMTcwYjY6Zjc3NWYxNmZiZGU2NDVmNmI3MzViOWEzNjAzMmMwMzc='
    },
    data: qs.stringify({
      grant_type: 'password',
      username: uName,
      password: pwd,
      scope: 'pc'
    })
  })
}
export function checkToken (token) {
  return request({
    url: `/api/auth/oauth/checkToken/v2?token=${token}`,
    method: 'get',
    headers: {
      Authorization: `Basic ${Base64.encode('8d33a5636f854c59a97b1d3f72c170b6:f775f16fbde645f6b735b9a36032c037')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
