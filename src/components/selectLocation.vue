<!--添加库位-->
<template>
  <div class="selectLocation">
    <el-dialog
      title="选择产品"
      :visible.sync="show"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="cancel"
      top="50px"
      width="764px"
    >
      <div class="dialogContent">
        <el-row type="flex" justify="space-between">
          <el-col :span="16">
            <el-row type="flex">
              <el-input
                v-model="params.zoneName"
                placeholder="库区"
                size="small"
                class="materType"
              ></el-input>
              <el-input
                v-model="params.locationName"
                placeholder="入库货位"
                size="small"
                class="materType"
              ></el-input>
            </el-row>
          </el-col>
          <el-col :span="8" class="btns">
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
          @row-click="confirm"
          border
        >
          <el-table-column
            prop="zoneName"
            label="库区"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="locationName"
            label="入库货位"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="productSpec"
            label="现存重量"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <div v-for="vo in scope.row.inventoryInfo"  :key="vo.storageLocationCode">
                {{ vo.weight }}{{ vo.mainUnit }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="packagingMethod"
            label="现存数量"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <div v-for="vo in scope.row.inventoryInfo" :key="vo.storageLocationCode">
                {{ vo.quantity }}{{ vo.supUnit }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <wmsPagination :pageTotal="total" @pageFunc="changeSize" />
    </el-dialog>
  </div>
</template>
<script>
import { storeLocationList } from '@/api/ms'
import wmsPagination from '@/components/wmsPagination'
export default {
  name: 'selectLocation',
  props: ['showLocation'],
  data () {
    return {
      show: false,
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true
      },
      loading: true,
      total: 0
    }
  },
  watch: {
    showLocation: {
      handler: function (newVal, oldVal) {
        this.show = newVal
        if (newVal) {
          this.getList()
        } else {
          this.loading = false
        }
      },
      deep: true
    }
  },
  created () {},
  components: {
    wmsPagination
  },
  methods: {
    changeSize (data) {
      this.params.pageNum = data.pageNum
      this.params.pageSize = data.pageSize
      this.getList()
    },
    getList () {
      this.loading = true
      storeLocationList(this.params).then((res) => {
        if (res && res.code === 0) {
          this.total = res.total
          this.tableData = res.rows
          this.loading = false
        }
      })
    },

    resetData () {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true
      }
      this.getList()
    },
    confirm (item) {
      this.$emit('confirmFn', item)
    },
    cancel () {
      this.params = {
        pageNum: 1,
        pageSize: 10,
        status: 1,
        isPage: true
      }
      this.$emit('confirmFn', {})
    }
  }
}
</script>
<style  lang="less"  scoped>
.selectLocation {
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
  .btns{text-align: right;}
}
</style>
