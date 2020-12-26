import request from '@/utils/request'

// 权限树
export function interMenuPhTree () {
  return request({
    url: '/api/resource/menu/hasMenusTree',
    method: 'get',
    headers: {
      Authorization: sessionStorage.getItem('Authorization'),
      authority: sessionStorage.getItem('authorityLeft')
    }
  })
}
