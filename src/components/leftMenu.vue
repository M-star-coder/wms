/* eslint-disable eqeqeq */
<template>
  <div class="leftContent">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      router
    >
      <subMenu :menu="menu" />
    </el-menu>
  </div>
</template>
<script>
import subMenu from "./subMenu";
import { interMenuPhTree } from "@/api/menu";
export default {
  components: {
    subMenu
  },
  data() {
    return {
      menu: [],
      defaultActive: "0-0"
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      interMenuPhTree().then(res => {
        // console.log(res);
        if (res && res.code === 0) {
          this.menu = [
            {
              menuKey: "basicDataManagement",
              menuName: "基础数据",
              children: [
                {
                  menuKey: "/main/basicData/storeType/list",
                  menuName: "仓库类型管理"
                },
                {
                  menuKey: "/main/basicData/store/list",
                  menuName: "仓库管理"
                },
                {
                  menuKey: "/main/basicData/storeArea/list",
                  menuName: "库区管理"
                },
                {
                  menuKey: "/main/basicData/storeLocation/list",
                  menuName: "库位管理"
                },
                {
                  menuKey: "/main/basicData/product/list",
                  menuName: "产品管理"
                },
                {
                  menuKey: "/main/basicData/supplier/list",
                  menuName: "供应商管理"
                },
                {
                  menuKey: "/main/basicData/customer/list",
                  menuName: "客户管理"
                }
              ]
            },
            {
              menuKey: "DemandManagement",
              menuName: "薄膜",
              children: [
                {
                  menuKey: "/main/outwarehouse/production/list",
                  menuName: "销售出库管理"
                },

                {
                  menuKey: "/main/warehousing/production/list",
                  menuName: "生产入库管理"
                }
              ]
            },
            {
              menuKey: "sectionManagement",
              menuName: "切片",
              children: [
                {
                  menuKey: "/main/outwarehouse/production/list?pageType=1",
                  menuName: "销售出库管理"
                },

                {
                  menuKey: "/main/warehousing/production/list?pageType=1",
                  menuName: "生产入库管理"
                }
              ]
            }
          ];
          const data = res.data;
          data.forEach(firstData => {
            if (firstData.menuKey === "henglink-pc") {
              const children = firstData.children;
              children.forEach(element => {
                if (element.perms === "left") {
                  const left = element.children;
                  left.forEach(val => {
                    if (val.menuName === "采购系统") {
                      // this.menu = val.children
                      // 遍历this.menu,如果this.$route.path和menuKey相同，则defaultActive为相应的值
                      // this.getDefaulfActive(this.menu, '')
                      this.menu = [
                        {
                          menuKey: "basicDataManagement",
                          menuName: "基础数据",
                          children: [
                            {
                              menuKey: "/main/basicData/storeType/list",
                              menuName: "仓库类型管理"
                            },
                            {
                              menuKey: "/main/basicData/store/list",
                              menuName: "仓库管理"
                            },
                            {
                              menuKey: "/main/basicData/storeArea/list",
                              menuName: "库区管理"
                            },
                            {
                              menuKey: "/main/basicData/storeLocation/list",
                              menuName: "库位管理"
                            },
                            {
                              menuKey: "/main/basicData/product/list",
                              menuName: "产品管理"
                            },
                            {
                              menuKey: "/main/basicData/supplier/list",
                              menuName: "供应商管理"
                            },
                            {
                              menuKey: "/main/basicData/customer/list",
                              menuName: "客户管理"
                            }
                          ]
                        },
                        {
                          menuKey: "inStockManagement",
                          menuName: "在库管理",
                          children: [
                            {
                              menuKey: "/main/inStock/list",
                              menuName: "仓库现存量"
                            },
                            {
                              menuKey: "/main/inStock/orderList",
                              menuName: "仓库订单现存量"
                            }
                          ]
                        },
                        {
                          menuKey: "DemandManagement",
                          menuName: "薄膜",
                          children: [
                            {
                              menuKey: "/main/outwarehouse/production/list",
                              menuName: "销售出库管理"
                            },

                            {
                              menuKey: "/main/warehousing/production/list",
                              menuName: "生产入库管理"
                            }
                          ]
                        },
                        {
                          menuKey: "sectionManagement",
                          menuName: "切片",
                          children: [
                            {
                              menuKey:
                                "/main/outwarehouse/production/list?pageType=1",
                              menuName: "销售出库管理"
                            },

                            {
                              menuKey:
                                "/main/warehousing/production/list?pageType=1",
                              menuName: "生产入库管理"
                            }
                          ]
                        }
                      ];
                    }
                  });
                }
              });
            }
          });
          // console.log(this.menu);
        }
      });
    },
    // 递归遍历左侧树节点
    getDefaulfActive(menu, oIndex) {
      menu.forEach((item, index) => {
        let tempIndex = oIndex + "-" + index;
        if (!oIndex) {
          tempIndex = "" + index;
        }
        // eslint-disable-next-line eqeqeq
        if (this.$route.path == item.menuKey) {
          // console.log('this.$route.path', tempIndex);
          if (tempIndex.indexOf("-") < 0) {
            this.defaultActive = "0-0";
          } else {
            this.defaultActive = tempIndex;
          }
          console.log(this.defaultActive);
          return;
        }
        if (item.children) {
          this.getDefaulfActive(item.children, tempIndex);
        }
      });
    }
  }
};
</script>
<style scoped>
.leftContent {
  min-height: 500px;
  width: 200px;
  background-color: #ffffff;
  padding: 20px 0;
}
.leftContent >>> .el-submenu__title {
  text-align: left;
}
.leftContent >>> .el-submenu__title {
  height: auto;
  line-height: 22px;
  padding: 12px 0;
}
.leftContent >>> .el-submenu .el-menu-item {
  height: auto;
  line-height: 22px;
  padding: 12px 0;
}
.leftContent >>> .el-scrollbar {
  height: 660px;
  width: 100%;
}
.leftContent >>> .el-scrollbar__wrap {
  overflow: scroll;
  overflow-x: hidden;
}
.leftContent >>> .el-menu {
  border-right: 0px;
}
.leftContent >>> .el-menu-item {
  text-align: left;
  height: 50px;
  line-height: 50px;
}
.leftContent >>> .el-menu-item.is-active {
  color: #1890ff;
  background: #f3f9ff;
  border-right: 2px solid #1890ff;
}
</style>
