<!--
 * @Author:tina.zhang
 * @Date: 2020-12-02 15:12:33
 * @LastEditors:tina.zhang
 * @LastEditTime: 2020-12-02 15:15:48
 * @Description: file content
-->
<template>
  <div>
    <el-container>
      <el-aside width="224px">
        <leftMenu/>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script>
import leftMenu from '@/components/leftMenu'
export default {
  components: {
    leftMenu
  },
  methods: {}
}
</script>
<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  min-width: 804px;
}
.el-header {
  padding: 0;
  z-index: 2;
  min-width: 804px;
}
.indexCompanySelect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-width: 804px;
  z-index: 23;
}
.indexHeader {
  position: absolute;
  left: 0;
  top: 32px;
  width: 100%;
  min-width: 804px;
  z-index: 22;
}
.el-footer {
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
  z-index: 2;
  min-width: 804px;
}

.el-aside {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.el-main {
  background-color: #f0f2f5;
  color: #333;
  text-align: center;
  z-index: 1;
  /*padding: 0px 24px;*/
  padding: 0;
  min-width: 804px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.indexConFooter {
  width: 100%;
  height: 92px;
}
</style>
