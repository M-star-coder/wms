<template>
  <div v-loading="loading">
    <div class="addinfo">
      <div class="title">主要信息</div>
      <el-form
        :model="addData"
        ref="addData"
        label-width="110px"
        label-position="left"
      >
        <el-form-item prop="companyCode" class="formitem left">
          <span slot="label"
            ><label class="required-icon">*</label> 所属公司</span
          >
          <div class="bombor">
            <el-select
              v-model="addData.companyCode"
              :disabled="type == 1 ? true : false"
              size="small"
              data-checked
              :data-checkedValue="addData.companyCode"
              data-checkedTitle="请选择所属公司"
              @change="selectCompany"
              class="select"
            >
              <el-option
                v-for="item in companyDataList"
                :key="item.deptCode"
                :label="item.deptName"
                :value="item.deptCode"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="deptCode" class="formitem">
          <span slot="label"
            ><label class="required-icon">*</label> 所属部门</span
          >
          <div class="bombor">
            <el-select
              v-model="addData.deptCode"
              size="small"
              data-checked
              :data-checkedValue="addData.deptCode"
              data-checkedTitle="请选择所属部门"
              @change="selectDepartment"
              class="select"
            >
              <el-option
                v-for="item in departmentDataList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="managerCode" class="formitem left">
          <span slot="label"
            ><label class="required-icon">*</label> 负责人</span
          >
          <div class="bombor selecticon">
            <el-select
              v-model="addData.managerCode"
              filterable
              placeholder="请输入选择"
              size="small"
              data-checked
              :data-checkedValue="addData.managerCode"
              data-checkedTitle="请选择负责人"
              class="select"
            >
              <el-option
                v-for="item in staffDataList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
            <i class="el-icon-search searchicon"></i>
          </div>
        </el-form-item>
        <el-form-item prop="telephone" class="formitem left">
          <span slot="label"> 负责人电话</span>
          <div class="bombor">
            <el-input
              v-model="addData.telephone"
              placeholder="请输入"
              maxlength="20"
              size="small"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="categoryCode" class="formitem left">
          <span slot="label"
            ><label class="required-icon">*</label> 仓库类型</span
          >
          <div class="bombor">
            <el-select
              v-model="addData.categoryCode"
              size="small"
              data-checked
              :data-checkedValue="addData.categoryCode"
              data-checkedTitle="请选择仓库类型"
              class="select"
            >
              <el-option
                v-for="item in typeList"
                :key="item.categoryCode"
                :label="item.categoryName"
                :value="item.categoryCode"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item prop="isVirtual" class="formitem">
          <span slot="label"
            ><label class="required-icon">*</label> 是否虚拟仓</span
          >
          <el-radio-group v-model="addData.isVirtual">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="warehouseName" class="formitem left">
          <span slot="label"
            ><label class="required-icon">*</label> 仓库名称</span
          >
          <div class="bombor">
            <el-input
              v-model="addData.warehouseName"
              placeholder="请输入"
              data-checked
              :data-checkedValue="addData.warehouseName"
              data-checkedTitle="请输入仓库名称"
              maxlength="32"
              size="small"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="lockStatus" class="formitem">
          <span slot="label"
            ><label class="required-icon">*</label> 仓库状态</span
          >
          <el-radio-group v-model="addData.lockStatus" @change="selectStatus">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">锁定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="address" class="formitem special">
          <span slot="label"> 仓库地址</span>
          <div class="bombor">
            <el-input
              v-model="addData.address"
              placeholder="请输入"
              maxlength="100"
              size="small"
            >
            </el-input>
          </div>
        </el-form-item>
        <el-form-item prop="remark" class="formitem special">
          <span slot="label"> 备注</span>
          <el-input
            type="textarea"
            v-model="addData.remark"
            placeholder="请输入"
            :rows="3"
            maxlength="300"
            show-word-limit
            size="small"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div class="submitbtn">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveAdd" size="small"
          >确 定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  companyList,
  departmentList,
  staffList,
  storeTypeList,
  storeAdd,
  storeDetail,
  storeEdit
} from "@/api/ms";
import { fromChecked } from "@/utils/fromChecked";
// import crumbsMap from "@/utils/crumbsMap";
export default {
  name: "add",
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
      applyPersonName: sessionStorage.getItem("applyPersonName"),
      loading: true,
      isEdit: true,
      addData: {
        companyCode: "", // 所属公司
        deptCode: "", // 所属部门
        managerCode: "", // 负责人
        telephone: "", // 负责人电话
        categoryCode: "", // 仓库类型
        isVirtual: 0, // 是否虚拟仓
        warehouseName: "", // 仓库名称
        lockStatus: 1, // 仓库状态
        address: "", // 仓库地址
        remark: "" // 备注
      },
      companyDataList: [], // 公司列表
      departmentDataList: [], // 部门列表
      staffDataList: [], // 负责人列表
      typeList: [], // 类型列表
      type: this.$route.query.type
    };
  },
  created() {
    this.getCompanyList();
    this.getTypeList();
    // type 0：新增 1：编辑
    if (this.$route.query.type == 1) {
      this.getDetail();
    } else {
      this.loading = false;
      this.isEdit = false;
    }
  },
  methods: {
    // 公司列表
    getCompanyList() {
      companyList().then(res => {
        if (res.code == 0) {
          this.companyDataList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    selectCompany(val) {
      if (val) {
        this.addData.deptCode = "";
        this.addData.managerCode = "";
        this.departmentDataList = [];
        this.staffDataList = [];
        this.getDepartmentList(val);
      }
    },
    // 部门列表
    getDepartmentList(companyCode) {
      departmentList({
        companyCode: companyCode
      }).then(res => {
        if (res.code == 0) {
          this.departmentDataList = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    selectDepartment(val) {
      if (val) {
        this.addData.managerCode = "";
        this.staffDataList = [];
        this.getStaffList(val);
      }
    },
    // 员工列表
    getStaffList(deptId) {
      staffList({
        deptId: deptId
      }).then(res => {
        if (res.code == 0) {
          this.staffDataList = res.rows;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 仓库类型
    getTypeList() {
      storeTypeList({
        isPage: false
      }).then(res => {
        if (res.code == 0) {
          this.typeList = res.rows;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 获取详情
    getDetail() {
      storeDetail({
        warehouseCode: this.$route.query.warehouseCode
      }).then(res => {
        if (res.code == 0) {
          this.getDepartmentList(res.data.companyCode);
          this.getStaffList(res.data.deptCode);
          this.addData = res.data;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    selectStatus(val) {
      if (this.$route.query.type == 1 && val == 0) {
        this.$confirm(
          "锁定仓库时，将同时锁定此仓库下的库区和库位，请确认",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }
        )
          .then(() => {})
          .catch(() => {
            this.addData.lockStatus = 1;
          });
      }
    },

    // 保存、提交
    saveAdd() {
      // type 0：新增 1：编辑
      let type = this.$route.query.type;
      if (fromChecked()) {
        this.loading = true;
        this.addData =
          type == 0
            ? {
                ...this.addData,
                createBy: this.userId,
                createName: this.applyPersonName
              }
            : {
                ...this.addData,
                updateBy: this.userId,
                updateName: this.applyPersonName
              };
        let saveFun =
          type == 0 ? storeAdd(this.addData) : storeEdit(this.addData);
        saveFun.then(res => {
          this.loading = false;
          if (res.code == 0) {
            this.$message.success(type == 0 ? "新增成功" : "编辑成功");
            this.$router.push({ path: "/main/basicData/store/list" });
          } else {
            this.$message.error(res.msg);
          }
        });
      }
    },
    //取消
    cancel() {
      window.history.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.addinfo {
  background: #fff;
  padding: 10px 6px 30px 42px;
  text-align: left;
  min-height: 800px;
  .title {
    font-size: 16px;
    line-height: 16px;
    margin: 30px 0px 20px 0px;
    padding-left: 6px;
    border: 0px;
    border-left: 2px solid #1890ff;
  }
  .formitem {
    width: calc(~"50% - 35px");
    display: inline-block;
    margin-bottom: 22px;
    margin-right: 35px;
    .bombor {
      border: 0px;
      border-bottom: 1px solid #e6e6e6;
      .select {
        width: 100%;
      }
      .unit {
        font-size: 12px;
        color: #999;
        position: absolute;
        margin-left: -16px;
      }
      .unit2 {
        font-size: 12px;
        color: #999;
        position: absolute;
        margin-left: -24px;
      }
      .unit3 {
        font-size: 12px;
        color: #999;
        position: absolute;
        margin-left: -34px;
      }
    }
    .selecticon {
      /deep/ .el-icon-arrow-up:before {
        content: "";
      }
      .searchicon {
        color: #c0c4cc;
        position: absolute;
        top: 16px;
        margin-left: -24px;
      }
    }
    .specunit {
      line-height: 40px;
      width: 46%;
    }
    .rate {
      font-size: 12px;
      color: #666;
      line-height: 22px;
      position: absolute;
      span {
        color: #1890ff;
      }
    }
    .required-icon {
      color: #f56c6c;
    }
    /deep/ .el-input__inner {
      border-color: #fff;
      padding: 0 2px 0 2px;
    }
    /deep/ .el-input__inner:hover {
      border-color: #fff;
    }
    /deep/ .el-input__inner:focus {
      border-color: #fff;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
      border-color: #fff;
      background-color: #fff;
    }
    /deep/ .el-textarea__inner {
      padding: 6px 6px;
    }
    /deep/ .el-textarea__inner:focus {
      border-color: #c0c4cc;
    }
    /deep/ .el-textarea__inner:hover {
      border-color: #c0c4cc;
    }
    /deep/ .el-textarea .el-input__count {
      right: 20px;
    }
    /deep/ .el-select .el-input .el-input__inner {
      border-color: #fff;
    }
    /deep/ .el-select .el-input .el-input__inner:hover {
      border-color: #fff;
    }
    /deep/ .el-select .el-input .el-input__inner:focus {
      border-color: #fff;
    }
    /deep/ .el-select .el-input.is-focus .el-input__inner {
      border-color: #fff;
    }
  }
  .special {
    width: calc(100% - 35px);
  }

  .btnadd {
    position: absolute;
    right: 35px;
    margin-top: 14px;
    z-index: 1;
  }
  .submitbtn {
    margin-top: 40px;
    text-align: right;
    padding-right: 35px;
  }
}
.tablestyle {
  .del {
    color: #ec2234;
  }
  /deep/ .el-table th {
    background: #f5f7fa;
  }
}
.pagebg {
  text-align: center;
}
.iconclose {
  position: absolute;
  right: 40px;
  top: 22px;
  cursor: pointer;
}
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
  .input {
    width: 160%;
  }
  /deep/ .el-form-item {
    margin-bottom: 0px;
  }
}
.hr {
  border: 0px;
  border-bottom: 1px solid #f1f1f1;
  margin: 30px 0px 20px 0px;
}
.footer {
  display: flex;
  justify-content: space-between;
  .selectnum {
    line-height: 32px;
    color: #666;
  }
}
/deep/ .el-dialog__header {
  padding: 20px 40px 0px 40px;
}
/deep/ .el-dialog__title {
  line-height: 24px;
  font-size: 16px;
  color: #333;
  display: block;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
  text-align: left;
}
/deep/ .el-dialog__body {
  padding: 0px 40px 20px 40px;
}
</style>
