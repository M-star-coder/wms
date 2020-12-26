<!--添加产品-->
<template>
  <div class="selectProduct">
    <el-dialog
      title="选择产品"
      :visible.sync="show"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="cancel"
      top="50px"
      width="1044px"
    >
      <div class="dialogContent" v-if="show">
        <el-row type="flex" justify="space-between">
          <el-col :span="20">
            <el-row type="flex">
              <el-cascader
                :options="options"
                :props="props"
                v-model="params.productClass"
                @change="getList"
              ></el-cascader>
              <el-input
                v-model="params.productCode"
                placeholder="产品牌号"
                size="small"
                class="materType"
              ></el-input>
              <el-input
                v-model="params.productBrand"
                placeholder="批次"
                size="small"
                class="materType"
              ></el-input>
              <el-input
                v-model="params.packagingMethod"
                placeholder="包装"
                size="small"
                class="materType"
              ></el-input>
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" @click="getList"
              >查询</el-button
            >
            <el-button size="small" @click="resetData">重置</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="materialList"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55px" align="center">
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="产品编号"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="productSpec"
            label="规格"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="packagingMethod"
            label="包装"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productBrand"
            label="批次"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productGrade"
            label="等级"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <wmsPagination :pageTotal="total" @pageFunc="changeSize" />
      <div class="dialogFooter">
        <span class="selected">已选产品：{{ multipleSelection.length }}种</span>
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { productStockDetailList, productTypeList } from "@/api/ms";
import wmsPagination from "@/components/wmsPagination";
export default {
  name: "selectProduct",
  props: ["showProduct", "selectData"],
  data() {
    return {
      show: false,
      tableData: [],
      multipleSelection: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true,
        productClass: [],
      },
      loading: true,
      total: 0,
      options: [],
      props: {
        value: "code",
      },
    };
  },
  watch: {
    showProduct: {
      handler: function (newVal, oldVal) {
        this.show = newVal;
        if (newVal) {
          this.prodTypeList();
        } else {
          this.loading = false;
        }
      },
      deep: true,
    },
    selectData: {
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.multipleSelection = newVal;
        }
      },
      deep: true,
    },
  },
  created() {},
  components: {
    wmsPagination,
  },
  methods: {
    // 产品分类列表
    prodTypeList() {
      productTypeList().then((res) => {
        if (res.code === 0 && res.data != null) {
          const arr = res.data.filter(
            (v) => v.businessType === 1 && v.children.length > 0
          );
          this.options = arr;
          this.params.productClass.push(arr[0].code);
          this.params.productClass.push(arr[0].children[0].code);
          this.getList();
        }
      });
    },
    changeSize(data) {
      this.params.pageNum = data.pageNum;
      this.params.pageSize = data.pageSize;
      this.getList();
    },
    getList() {
      this.loading = true;
      productStockDetailList({
        ...this.params,
        productClass:
          this.params.productClass && this.params.productClass.length > 0
            ? this.params.productClass[1]
            : "",
      }).then((res) => {
        if (res && res.code === 0) {
          this.total = res.total;
          this.tableData = res.rows;
          this.loading = false;
          this.multipleSelection.forEach((row) => {
            if (
              res.rows.filter((v) => v.materialCode === row.materialCode)
                .length > 0
            ) {
              this.$nextTick(() => {
                console.log(row);
                this.$refs.materialList.toggleRowSelection(
                  res.rows.find((v) => v.materialCode === row.materialCode),
                  true
                );
              });
            }
          });
        }
      });
    },

    resetData() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true,
      };
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    confirm() {
      this.$emit("confirmFn", this.multipleSelection);
    },
    cancel() {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true,
      };
      this.$emit("confirmFn", []);
    },
  },
};
</script>
<style lang="less" scoped>
.selectProduct {
  /deep/ .el-cascader {
    margin-right: 12px;
    width: 220px;
  }
  /deep/ .el-cascader,
  /deep/ .el-input__inner,
  /deep/ .el-input__icon {
    height: 32px;
    line-height: 32px;
  }
  .materType {
    margin-right: 12px;
    width: 250px;
  }
  /deep/ .el-table {
    margin-top: 24px;
  }
  /deep/ .el-table th {
    background-color: #f5f7fa;
    color: #333333;
    font-size: 14px;
    font-weight: normal;
    padding: 0px;
    line-height: 43px;
  }
  .dialogFooter {
    display: flex;
    margin-top: 24px;
    padding: 24px 20px 0;
    border-top: 1px solid #f1f1f1;
    text-align: left;
    .selected {
      flex: 1;
    }
  }
  .dialogContent {
    padding: 0 20px;
  }
  /deep/ .el-dialog__body {
    padding: 30px 0;
    /deep/ .pagination {
      text-align: right;
      padding: 0 20px;
    }
  }
  /deep/ .el-dialog__header {
    text-align: left;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #f1f1f1;
    margin: 0 20px;
    padding-left: 0;
  }
}
</style>
