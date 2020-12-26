<template>
  <div class="kkhhss">
    <template v-for="(item,index) in menu">
      <template v-if="item.children">
        <el-submenu :index="menuIndex+index" :key="item.menuId">
          <template slot="title">
            <span>{{item.menuName}}</span>
          </template>
          <subMenu :menu="item.children" :menuIndex="menuIndex+index+'-'" />
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="menuIndex+index" :route="item.menuKey" :key="index">
          <span slot="title">{{item.menuName}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'subMenu',
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    menuIndex: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>
.el-submenu__title {
  text-align: left;
}
.el-submenu__title {
  height: auto;
  line-height: 22px;
  padding: 12px 0;
}
.el-submenu .el-menu-item {
  height: auto;
  line-height: 22px;
  padding: 12px 0;
}
.el-menu {
  border-right: 0px;
}
.el-menu-item {
  text-align: left;
}
</style>
