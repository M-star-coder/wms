<template>
  <div id="app" v-if="loading">
    <router-view/>
  </div>
</template>
<script>
import { checkToken } from '@/api/login'

export function getUrlParam (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const _l = window.location.href.indexOf('?')
  let search = window.location.href.substr(_l + 1)

  if (search.indexOf('#') > 0) {
    search = search.substr(0, search.indexOf('#'))
  }
  const r = search.match(reg)
  return r != null ? unescape(r[2]) : null
}
export default {
  data () {
    return {
      parentToken: getUrlParam('token'),
      loading: false
    }
  },
  async created () {
    // sessionStorage.clear();
    const uri = location.origin
    console.log(uri)
    if (uri.indexOf('localhost') > -1) {
      this.loading = true
    } else {
      await sessionStorage.setItem('Authorization', `bearer ${this.parentToken}`)
      console.log(sessionStorage.getItem('Authorization'))
      if (this.parentToken) {
        const checkData = await checkToken(this.parentToken)
        if (checkData && checkData.code === 0) {
          await sessionStorage.setItem('Authorization', `bearer ${this.parentToken}`)
          await sessionStorage.setItem('authority', `bearer ${checkData.data.authority}`)
          await sessionStorage.setItem('authorityLeft', `${checkData.data.authority}`)
          await sessionStorage.setItem('userInfo', JSON.stringify(checkData.data.user))
          await sessionStorage.setItem('userId', `${checkData.data.user.userId}`)
          await sessionStorage.setItem('deptId', `${checkData.data.user.deptId}`)
          await sessionStorage.setItem('applyPersonName', `${checkData.data.user.userName}`)
          await sessionStorage.setItem('deptName', `${checkData.data.user.deptName}`)
          await sessionStorage.setItem('companyId', `${checkData.data.user.companyId}`)
          await sessionStorage.setItem('phone', `${checkData.data.user.phoneNumber}`)
          await sessionStorage.setItem(
            'applycompanyName',
          `${checkData.data.user.companyName}`
          )
          console.log(location)
          this.loading = true
        }
      }
    }
  }
}
</script>
<style lang="less">
  @import url('./assets/css/global.css');
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>
