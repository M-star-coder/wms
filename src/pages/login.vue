<template>
  <div class="home">
    <div>
      <div>
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
      </div>
      <div>
        <el-input placeholder="请输入用户名" v-model="pwd" show-password></el-input>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="toLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
import { loginJobNumber } from '@/api/login'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      pwd: ''
    }
  },
  created () {
    // console.log('页面渲染完成')
  },
  methods: {
    async toLogin () {
      const { data } = await loginJobNumber(this.userName, this.pwd)
      console.log(data)
      const userInfo = {
        Authorization: `bearer ${data.accessToken || ''}`
      }
      sessionStorage.setItem('Authorization', `bearer ${data.accessToken || ''}`)
      sessionStorage.setItem('authorityLeft', `${data.accessToken || ''}`)
      if (data.user) {
        userInfo.userId = `${data.user.userId}`
        userInfo.userName = `${data.user.userName}`
        userInfo.phone = `${data.user.phoneNumber}`
        userInfo.jobNumber = `${data.user.jobNumber}`
        userInfo.loginDate = `${data.user.loginDate}`
        sessionStorage.setItem('userId', `${data.user.userId}`)
        sessionStorage.setItem('applyPersonName', `${data.user.userName}`)
        sessionStorage.setItem('phone', `${data.user.phoneNumber}`)
        sessionStorage.setItem('jobNumber', `${data.user.jobNumber}`)
        sessionStorage.setItem('loginDate', `${data.user.loginDate}`)
        sessionStorage.setItem('companyId', `${data.user.companyId}`)
      } else {
        userInfo.userName = '暂无'
        userInfo.phone = '暂无'
        userInfo.jobNumber = '暂无'
        sessionStorage.setItem('applyPersonName', '暂无')
        sessionStorage.setItem('phone', '暂无')
        sessionStorage.setItem('jobNumber', '暂无')
      }
      if (data.user.roles[0]) {
        userInfo.roleName = `${data.user.roles[0].roleName}`
        userInfo.roleId = `${data.user.roles[0].roleId}`
        sessionStorage.setItem('roleName', `${data.user.roles[0].roleName}`)
        sessionStorage.setItem('roleId', `${data.user.roles[0].roleId}`)
      }
      if (data.user.depts[0]) {
        userInfo.applyDeptName = `${data.user.depts[0].deptName}`
        userInfo.companyName = `${data.user.depts[0].companyName}`
        userInfo.depts = JSON.stringify(data.user.depts)
        userInfo.deptId = `${data.user.depts[0].deptId}`
        userInfo.deptName = `${data.user.depts[0].deptName}`
        sessionStorage.setItem('applyDeptName', `${data.user.depts[0].deptName}`)
        sessionStorage.setItem('applycompanyName', `${data.user.depts[0].companyName}`)
        sessionStorage.setItem('depts', JSON.stringify(data.user.depts))
        sessionStorage.setItem('deptId', `${data.user.depts[0].deptId}`)
        sessionStorage.setItem('deptName', `${data.user.depts[0].deptName}`)
      } else {
        userInfo.applyDeptName = '暂无'
        userInfo.applycompanyName = '暂无'
        userInfo.deptId = '暂无'
        userInfo.deptName = '暂无'
        sessionStorage.setItem('applyDeptName', '暂无')
        sessionStorage.setItem('applycompanyName', '暂无')
        sessionStorage.setItem('deptId', '暂无')
        sessionStorage.setItem('deptName', '暂无')
      }
      if (data.user.posts[0]) {
        userInfo.postNames = `${data.user.posts[0].postName}`
        sessionStorage.setItem('postId', `${data.user.posts[0].postId}`)
        sessionStorage.setItem('applypostName', `${data.user.posts[0].postName}`)
      } else {
        userInfo.applypostName = '暂无'
        sessionStorage.setItem('applypostName', '暂无')
      }
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      if (userInfo) {
        this.$router.push({ path: '/main/basicData/store/list' })
      }
    }
  }
}
</script>
