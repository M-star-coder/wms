<template>
  <div class="wareHouseAdd" v-loading="loading">
    <div class="mainTitle">基本信息</div>
    <el-form ref="addData" label-width="110px" label-position="left">
      <el-form-item prop="telephone" class="formitem left">
        <span slot="label"> 入库单号</span>
        <div class="bombor">
          <el-input
            disabled
            placeholder="提交后系统自动生成"
            maxlength="20"
            size="small"
            v-model="detail.grnCode"
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="companyCode" class="formitem left">
        <span slot="label"
          ><label class="required-icon">*</label> 所属公司</span
        >
        <div class="bombor">
          <el-select
            v-model="detail.companyCode"
            size="small"
            class="select"
            placeholder="请选择所属公司"
            data-checked
            :data-checkedValue="detail.companyCode"
            data-checkedTitle="请选择所属公司"
            @change="changeParams(detail.companyCode, 'company')"
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
        <span slot="label"><label class="required-icon">*</label>生产部门</span>
        <div class="bombor">
          <el-select
            v-model="detail.productionDepartmentCode"
            size="small"
            data-checked
            :data-checkedValue="detail.productionDepartmentCode"
            data-checkedTitle="请选择生产部门"
            @change="
              changeParams(
                detail.productionDepartmentCode,
                'productionDepartment'
              )
            "
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
      <el-form-item prop="warehousingBusinessTypeCode" class="formitem left">
        <span slot="label"><label class="required-icon">*</label>业务类型</span>
        <div class="bombor">
          <el-select
            v-model="detail.warehousingBusinessTypeCode"
            filterable
            placeholder="请选择业务类型"
            data-checked
            :data-checkedValue="detail.warehousingBusinessTypeCode"
            data-checkedTitle="请选择业务类型"
            @change="
              changeParams(
                detail.warehousingBusinessTypeCode,
                'warehousingBusinessType'
              )
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
        <span slot="label"><label class="required-icon">*</label>入库人员</span>
        <div class="bombor selecticon">
          <el-select
            v-model="detail.operator"
            filterable
            placeholder="请输入选择"
            data-checked
            :data-checkedValue="detail.operator"
            data-checkedTitle="请选择入库人员"
            @change="changeParams(detail.operator, 'operator')"
            size="small"
            class="select"
          >
            <el-option
              v-for="vo in staffDataList"
              :key="vo.userId"
              :label="vo.userName"
              :value="vo.userId"
            ></el-option>
          </el-select>
          <i class="el-icon-search searchicon"></i>
        </div>
      </el-form-item>
      <el-form-item prop="warehousingBusinessTypeCode" class="formitem left">
        <span slot="label"><label class="required-icon">*</label>入库类别</span>
        <div class="bombor">
          <el-select
            v-model="detail.warehousingCategoryCode"
            filterable
            placeholder="请选择入库类别"
            data-checked
            :data-checkedValue="detail.warehousingCategoryCode"
            data-checkedTitle="请选择入库类别"
            @change="
              changeParams(
                detail.warehousingCategoryCode,
                'warehousingCategory'
              )
            "
            size="small"
            class="select"
          >
            <el-option
              v-for="vo in dictionaries.wms_warehousing_category"
              :key="vo.dictValue"
              :label="vo.dictLabel"
              :value="vo.dictValue"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop="warehouseCode" class="formitem left">
        <span slot="label"><label class="required-icon">*</label>入库仓库</span>
        <div class="bombor">
          <el-select
            v-model="detail.warehouseCode"
            filterable
            placeholder="请选择入库仓库"
            data-checked
            :data-checkedValue="detail.warehouseCode"
            data-checkedTitle="请选择入库仓库"
            @change="changeParams(detail.warehouseCode, 'warehouse')"
            size="small"
            class="select"
          >
            <el-option
              v-for="vo in warehouseDist"
              :key="vo.warehouseCode"
              :label="vo.warehouseName"
              :value="vo.warehouseCode"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        prop="telephone"
        class="formitem left"
        style="display: block"
      >
        <span slot="label"> 创建时间</span>
        <div class="bombor">
          <el-input
            disabled
            placeholder="提交后系统自动生成"
            maxlength="20"
            size="small"
            v-model="detail.createTime"
          >
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="telephone">
        <span slot="label"> 备注</span>
        <div class="bombor">
          <el-input
            type="textarea"
            v-model="detail.remark"
            maxlength="200"
            placeholder="请输入"
            show-word-limit
            height="124px"
          >
          </el-input>
        </div>
      </el-form-item>
    </el-form>
    <div class="mainTitle">
      <span class="material">入库单明细</span
      ><el-button type="primary" @click="addProduct" size="small"
        >新增</el-button
      >
    </div>
    <el-table
      :data="detail.grnSliceSaveDetail"
      border
      size="medium"
      style="width: 100%"
    >
      <el-table-column label="序号" width="120" type="index" fixed>
      </el-table-column>
      <el-table-column
        prop="productCode"
        label="产品编码"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productSpec"
        label="规格"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productBrand"
        label="批号"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="packagingMethod"
        label="包装"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="productGrade"
        label="等级"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="dateOfPackaging"
        label="重量"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.realWeight"
            placeholder="请输入"
            type="number"
          ></el-input
          >{{ scope.row.mainUnit }}
        </template>
      </el-table-column>
      <el-table-column
        prop="dateOfPackaging"
        label="辅数量"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.realQuantity"
            placeholder="请输入"
            type="number"
          ></el-input
          >{{ scope.row.supUnit }}
        </template>
      </el-table-column>
      <el-table-column
        prop="dateOfPackaging"
        label="入库货位"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <div @click="selectLocationFn(scope.row.productCode)">
            {{ scope.row.storageZoneCode || "请选择" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="dateOfPackaging"
        label="操作"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="toDel(scope.row.productCode)"
            type="text"
            size="small"
            class="del"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <selectProduct
      :showProduct="showProduct"
      @confirmFn="confirmFn"
      :selectData="detail.grnSliceSaveDetail"
    />
    <selectLocation :showLocation="showLocation" @confirmFn="confirmLocation" />
    <div class="totalMoney">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" @click="save(0)">保存</el-button>
      <el-button type="primary" size="small" @click="save(1)">入库</el-button>
    </div>
  </div>
</template>
<script>
import {
  departmentList,
  staffList,
  listDictData,
  companyList,
  storeList,
  saveSliceGrn,
  selectProduceGrnDetail,
  warehouseGrnInfo,
} from "@/api/ms";
import selectProduct from "@/components/selectProduct";
import selectLocation from "@/components/selectLocation";
import { fromChecked } from "@/utils/fromChecked";
export default {
  data() {
    return {
      detail: {
        grnSliceSaveDetail: [],
        businessType: "1",
        createBy: localStorage.getItem("userId"),
        createName: localStorage.getItem("applyPersonName"),
      },
      loading: true,
      companyDataList: [], // 公司列表
      departmentDataList: [], // 部门列表
      dictionaries: {},
      staffDataList: [],
      warehouseDist: [],
      showProduct: false,
      showLocation: false,
      currentLocation: "",
      params: {
        pageNum: 1,
        pageSize: 10,
        grnCode: this.$route.query.grnCode,
      },
    };
  },
  created() {
    this.getCompanyList();
    this.getDictData();
    this.getwarehouseList();
    if (this.$route.query.grnCode) {
      this.getDetail();
      this.getProduceGrnDetail();
    }
  },
  components: {
    selectProduct,
    selectLocation,
  },
  methods: {
    // 获取详情
    async getDetail() {
      const res = await warehouseGrnInfo(this.$route.query);
      if (res.code === 0) {
        this.detail = res.data;
        this.getDepartmentList(res.data.companyCode);
        this.getStaffList(res.data.productionDepartmentCode);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取明细列表
    async getProduceGrnDetail() {
      const res = await selectProduceGrnDetail(this.params);
      if (res.code === 0) {
        this.detail.grnSliceSaveDetail = res.rows;
        this.detail.updateBy = localStorage.getItem("userId");
        this.detail.updateName = localStorage.getItem("applyPersonName");
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },
    // 切换
    changeParams(val, type) {
      this.detail[type + "code"] = val;
      // 部门
      if (type === "productionDepartment") {
        this.detail[type + "Name"] = this.departmentDataList.find(
          (v) => v.deptId === val
        ).deptName;
        this.detail.operator = "";
        this.detail.operatorName = "";
        this.getStaffList(val);
      }
      // 入库人员
      if (type === "operator") {
        this.detail[type + "Name"] = this.staffDataList.find(
          (v) => v.userId === val
        ).userName;
      }
      // 业务类型
      if (type === "warehousingBusinessType") {
        this.detail[
          type + "Name"
        ] = this.dictionaries.wms_warehousing_business_type.find(
          (v) => v.dictValue === val
        ).dictLabel;
      }
      // 入库类别
      if (type === "warehousingCategory") {
        this.detail[
          type + "Name"
        ] = this.dictionaries.wms_warehousing_category.find(
          (v) => v.dictValue === val
        ).dictLabel;
      }

      // 入库仓库
      if (type === "warehouse") {
        this.detail[type + "Name"] = this.warehouseDist.find(
          (v) => v.warehouseCode === val
        ).warehouseName;
      }

      // 所属公司
      if (type === "company") {
        this.detail[type + "Name"] = this.companyDataList.find(
          (v) => v.deptCode === val
        ).deptName;
        this.getDepartmentList(val);
        this.detail.operator = "";
        this.detail.operatorName = "";
        this.detail.productionDepartmentName = "";
        this.detail.productionDepartmentCode = "";
      }
    },
    // 选择库位
    selectLocationFn(currentLocation) {
      this.showLocation = true;
      this.currentLocation = currentLocation;
    },
    // 确认选择库位
    confirmLocation(item) {
      const arr = [];
      this.detail.grnSliceSaveDetail.map((v) => {
        if (v.productCode !== this.currentLocation) {
          arr.push(JSON.parse(JSON.stringify(v)));
        } else {
          arr.push(
            JSON.parse(
              JSON.stringify({
                ...v,
                storageZoneCode: item.locationCode,
                storageZoneName: item.locationName,
              })
            )
          );
        }
      });
      this.detail.grnSliceSaveDetail = JSON.parse(JSON.stringify(arr));
      this.showLocation = false;
      this.$forceUpdate();
    },
    // 删除
    toDel(productCode) {
      const arr = [];
      this.detail.grnSliceSaveDetail.map((v) => {
        if (v.productCode !== productCode) {
          arr.push(JSON.parse(JSON.stringify(v)));
        }
      });
      this.detail.grnSliceSaveDetail = JSON.parse(JSON.stringify(arr));
      this.$forceUpdate();
    },
    // 确认选择产品
    confirmFn(item) {
      console.log(item);
      this.showProduct = false;
      item.map((vo, index) => {
        vo.goodsNum = 1;
        vo.id = "";
        if (
          this.detail.grnSliceSaveDetail.filter(
            (v) => v.productCode === vo.productCode
          ).length === 0
        ) {
          this.detail.grnSliceSaveDetail.push(JSON.parse(JSON.stringify(vo)));
        }
      });
    },
    // 获取仓库列表
    async getwarehouseList() {
      const res = await storeList({
        isPage: false,
      });
      if (res.code === 0) {
        this.warehouseDist = res.rows;
      } else {
        this.$message.error(res.msg);
      }
      if (!this.$route.query.grnCode) {
        this.loading = false;
      }
    },
    // 新增明细按钮
    addProduct() {
      this.showProduct = true;
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
    // 获取字典列表
    async getDictData() {
      const res = await listDictData(
        "wms_warehousing_business_type,wms_warehousing_category"
      );
      if (res.code === 0) {
        this.dictionaries = res.data;
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
    // 员工列表
    async getStaffList(deptId) {
      const res = await staffList({
        deptId: deptId,
      });
      if (res.code === 0) {
        this.staffDataList = JSON.parse(JSON.stringify(res.rows));
        this.$forceUpdate();
      } else {
        this.$message.error(res.msg);
      }
    },
    async save(type) {
      const _this = this;
      if (fromChecked()) {
        console.log(this.detail);
        const res = await saveSliceGrn({ ...this.detail, saveType: type });
        if (res.code === 0) {
          _this.$message.success("操作成功");
          window.history.go(-1);
        } else {
          _this.$message.error(res.msg);
        }
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
.wareHouseAdd {
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
      top: 28px;
      position: absolute;
    }
    .material {
      flex: 1;
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
  /deep/ .el-table th {
    background: #f5f7fa;
    text-align: center;
  }
  /deep/ .el-table td {
    text-align: center;
    /deep/ .el-input {
      width: 60px;
      border: 0;
      margin: 0 auto;
      input {
        border: 0;
        padding: 0;
        text-align: center;
      }
    }
  }
  .totalMoney {
    text-align: right;
    margin-top: 40px;
  }
}
</style>
