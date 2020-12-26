<!--入库拆分-->
<template>
  <div class="stockSplit" v-loading="loading">
    <div class="stockTitle">入库单拆分</div>
    <el-form ref="addData" label-width="110px" label-position="left">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item
          :title="item.lineNum + '线'"
          :name="item.lineNum"
          v-for="(item, index) in detail"
          :key="item.lineNum"
        >
          <div class="mainTitle"><span class="material">主要信息</span></div>

          <el-form-item prop="companyCode" class="formitem left">
            <span slot="label"
              ><label class="required-icon">*</label> 所属公司</span
            >
            <div class="bombor">
              <el-select
                v-model="item.companyCode"
                size="small"
                disabled
                class="select"
              >
                <el-option
                  v-for="vo in companyDataList"
                  :key="vo.deptCode"
                  :label="vo.deptName"
                  :value="vo.deptCode"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item prop="productionDepartmentCode" class="formitem">
            <span slot="label"> 生产部门</span>
            <div class="bombor">
              <el-select
                v-model="item.productionDepartmentCode"
                size="small"
                data-checked
                :data-checkedValue="item.productionDepartmentCode"
                data-checkedTitle="请选择生产部门"
                @change="selectDepartment(item.productionDepartmentCode, index)"
                class="select"
              >
                <el-option
                  v-for="vo in departmentDataList"
                  :key="vo.deptId"
                  :label="vo.deptName"
                  :value="vo.deptId"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item
            prop="warehousingBusinessTypeCode"
            class="formitem left"
          >
            <span slot="label">业务类型</span>
            <div class="bombor">
              <el-select
                v-model="item.warehousingBusinessTypeCode"
                filterable
                placeholder="请选择业务类型"
                data-checked
                :data-checkedValue="item.warehousingBusinessTypeCode"
                data-checkedTitle="请选择业务类型"
                @change="
                  selectBusinessType(item.warehousingBusinessTypeCode, index)
                "
                size="small"
                class="select"
              >
                <el-option
                  v-for="vo in dictionaries.wms_warehousing_business_type"
                  :key="vo.dictValue"
                  :label="vo.dictLabel"
                  :value="vo.dictValue"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item prop="operator" class="formitem left">
            <span slot="label">入库人员</span>
            <div class="bombor selecticon">
              <el-select
                v-model="item.operator"
                filterable
                placeholder="请输入选择"
                data-checked
                :data-checkedValue="item.operator"
                data-checkedTitle="请选择入库人员"
                @change="selectUser(item.operator, index)"
                size="small"
                class="select"
              >
                <el-option
                  v-for="vo in item.staffDataList"
                  :key="vo.userId"
                  :label="vo.userName"
                  :value="vo.userId"
                ></el-option>
              </el-select>
              <i class="el-icon-search searchicon"></i>
            </div>
          </el-form-item>
          <div class="mainTitle"><span class="material">产品信息</span></div>
          <el-table
            :data="item.waitSplitDetail"
            class="waitSplitDetail"
            border
            size="medium"
            style="width: 100%"
          >
            <el-table-column label="序号" width="120" type="index">
            </el-table-column>
            <el-table-column
              label="包装日期"
              width="120"
              prop="dateOfPackaging"
            >
            </el-table-column>
            <el-table-column label="入库单号" width="120" prop="grnCode">
            </el-table-column>
            <el-table-column label="订单号" width="120" prop="orderCode">
            </el-table-column>
            <el-table-column label="托盘单号" width="120" prop="trayCode">
            </el-table-column>
            <el-table-column label="单卷条码" width="120" prop="barCode">
            </el-table-column>
            <el-table-column label="线别" width="120" prop="lineNum">
            </el-table-column>
            <el-table-column label="产品编号" width="120" prop="productCode">
            </el-table-column>
            <el-table-column label="产品名称" width="120" prop="productName">
            </el-table-column>
            <el-table-column label="厚度" width="120" prop="windThick">
            </el-table-column>
            <el-table-column label="规格" width="120" prop="productSpec">
            </el-table-column>
            <el-table-column label="等级" width="120" prop="productGrade">
            </el-table-column>
            <el-table-column label="重量" width="120" prop="realWeight">
            </el-table-column>
            <el-table-column label="单位" width="120" prop="mainUnit">
            </el-table-column>
            <el-table-column label="卷长" width="120" prop="windLength">
            </el-table-column>
            <el-table-column label="卷数" prop="realQuantity">
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div class="totalMoney">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button type="primary" size="small" @click="saveStockSplit"
        >确认</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  stockSplitData,
  companyList,
  departmentList,
  staffList,
  listDictData,
  stockGrnSplit,
} from "@/api/ms";
import { fromChecked } from "@/utils/fromChecked";
export default {
  data() {
    return {
      detail: [],
      loading: true,
      companyDataList: [], // 公司列表
      departmentDataList: [], // 部门列表
      dictionaries: {},
      activeNames: [],
    };
  },
  created() {
    this.getDictData();
    this.getCompanyList();
    this.getDepartmentList("123000");
    this.getStockSplit();
  },
  methods: {
    // 选择业务类型
    selectBusinessType(val, index) {
      if (val) {
        this.detail[
          index
        ].warehousingBusinessTypeName = this.dictionaries.wms_warehousing_business_type.find(
          (v) => v.dictValue === val
        ).dictLabel;
      }
      this.$forceUpdate();
    },
    handleChange(val) {
      console.log(val);
    },
    // 获取字典列表
    async getDictData() {
      const res = await listDictData("wms_warehousing_business_type");
      if (res.code === 0) {
        this.dictionaries = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取待拆分入库单
    async getStockSplit() {
      const res = await stockSplitData(this.$route.query);
      if (res.code === 0) {
        const arr = res.data;
        arr.map((v, index) => {
          arr[index].companyCode = "123000";
          if (index === 0) {
            this.activeNames.push(v.lineNum);
          }
        });
        this.detail = arr;
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },
    // 保存
    async saveStockSplit() {
      const _this = this;
      if (fromChecked()) {
        console.log({
          createBy: sessionStorage.getItem("userId"),
          createName: sessionStorage.getItem("applyPersonName"),
          originalGrnCode: _this.$route.query.grnCode,
          grnSplitDetail: _this.detail,
        });
        const res = await stockGrnSplit({
          createBy: sessionStorage.getItem("userId"),
          createName: sessionStorage.getItem("applyPersonName"),
          originalGrnCode: _this.$route.query.grnCode,
          grnSplitDetail: _this.detail,
        });
        if (res.code === 0) {
          _this.$message.success("操作成功");
          window.history.go(-1);
        } else {
          _this.$message.error(res.msg);
        }
      }
    },
    // 公司列表
    async getCompanyList() {
      const res = await companyList();
      if (res.code === 0) {
        this.companyDataList = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 部门列表
    async getDepartmentList(companyCode) {
      const res = await departmentList({
        companyCode: companyCode,
      });
      if (res.code === 0) {
        this.departmentDataList = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 选择部门
    selectDepartment(val, index) {
      if (val) {
        this.detail[
          index
        ].productionDepartmentName = this.departmentDataList.find(
          (v) => v.deptId === val
        ).deptName;
        this.detail[index].operator = "";
        this.detail[index].operatorName = "";
        this.detail[index].staffDataList = [];
        this.getStaffList(val, index);
      }
    },
    // 选择入库人员
    selectUser(val, index) {
      if (val) {
        this.detail[index].operatorName = this.detail[index].staffDataList.find(
          (v) => v.userId === val
        ).userName;
      }
      this.$forceUpdate();
    },
    // 员工列表
    async getStaffList(deptId, index) {
      const res = await staffList({
        deptId: deptId,
      });
      if (res.code === 0) {
        this.detail[index].staffDataList = JSON.parse(JSON.stringify(res.rows));
        this.$forceUpdate();
      } else {
        this.$message.error(res.msg);
      }
    },
    // 取消
    cancel() {
      window.history.go(-1);
    },
  },
};
</script>
<style lang="less" scoped>
.stockSplit {
  background: #fff;
  padding: 10px 6px 30px 42px;
  text-align: left;
  min-height: 800px;
  .mainTitle {
    position: relative;
    text-align: left;
    font-size: 16px;
    color: #333;
    padding: 24px 0 24px 6px;
    display: flex;
    &:before {
      content: " ";
      height: 14px;
      width: 2px;
      background-color: #1890ff;
      left: 0;
      top: 30px;
      position: absolute;
    }
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
  /deep/ .el-collapse-item__header {
    border: 1px solid #ebeef5;
    padding: 0 12px;
  }
  /deep/ .el-collapse-item__wrap,
  .el-collapse {
    border: 0;
  }
  .stockTitle {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 12px;
    margin-bottom: 24px;
    font-size: 14px;
    color: #000;
  }
  /deep/ .el-table th {
    background: #f5f7fa;
    text-align: center;
  }
  /deep/ .el-table td {
    text-align: center;
  }
  .totalMoney {
    text-align: right;
    margin-top: 44px;
  }
}
</style>
