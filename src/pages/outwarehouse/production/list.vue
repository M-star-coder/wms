<template>
  <div class="wareProductList">
    <div class="searchinfo">
      <el-tabs
        v-model="params.companyType"
        @tab-click="changeStatus"
        class="tabs"
      >
        <el-tab-pane
          v-for="item in ms_company_simple"
          :key="item.dictValue"
          :label="item.dictLabel"
          :name="item.dictValue"
        ></el-tab-pane>
      </el-tabs>
      <el-form :inline="true" align="left">
        <el-form-item>
          <el-input
            v-model="params.memberName"
            placeholder="客户名称"
            size="small"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="params.operatorName"
            placeholder="业务员"
            size="small"
            maxlength="100"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="params.warehouseCode"
            size="small"
            placeholder="目的仓库"
            class="select"
          >
            <el-option
              v-for="item in warehouseDist"
              :key="item.warehouseCode"
              :label="item.warehouseName"
              :value="item.warehouseCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <template v-if="isUnfold">
          <el-form-item>
            <el-select
              v-model="params.warehousingStatus"
              size="small"
              placeholder="状态"
              class="select"
            >
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="submitSearch" size="small"
            >查询</el-button
          >
          <el-button @click="resetFilter" size="small">重置</el-button>
          <el-button type="text" @click="unfoldSearch" size="small">
            {{ isUnfold ? "收起" : "展开" }}
            <i
              :class="isUnfold ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            ></i>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="listinfo">
      <div class="tablestyle">
        <el-table
          v-loading="loading"
          :data="listData"
          border
          size="medium"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="outStockCode"
            label="出库单号"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="memberName"
            label="客户名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="saleDeptName"
            label="销售部门"
            :show-overflow-tooltip="true"
            min-width="80px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="operatorName"
            label="业务员"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="warehouseName"
            label="仓库"
            :show-overflow-tooltip="true"
            min-width="80px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="createName"
            label="申请人"
            :show-overflow-tooltip="true"
            min-width="100px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="statusShow"
            label="状态"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-button @click="goDetail(scope.row)" type="text" size="small"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagebg">
        <wmsPagination
          :pageTotal="pageTotal"
          :isCurrentOne="isCurrentOne"
          @pageFunc="pageFunc"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { outStockList, storeList, listDictData } from '@/api/ms'
import wmsPagination from '@/components/wmsPagination'
// import crumbsMap from "@/utils/crumbsMap";
export default {
  name: 'wareProductList',
  components: {
    wmsPagination
  },
  data () {
    return {
      params: {
        pageNum: 1,
        pageSize: 10,
        companyType: '123000'
      },
      listData: [],
      pageTotal: 0, // 列表总数量
      isCurrentOne: false,
      isUnfold: false, // 展开、收起
      ms_company_simple: [
        { dictLabel: '康辉', dictValue: '123000' },
        { dictLabel: '力金', dictValue: '101000' }
      ],
      loading: false,
      dictionaries: [], // 字典
      statusList: [], // 状态列表
      warehouseDist: [] // 仓库列表
    }
  },
  created () {
    this.getwarehouseList()
    this.getDictData()
    this.getListData()
  },
  methods: {
    // 获取字典列表
    async getDictData () {
      const res = await listDictData('warehousing_category')
      if (res.code === 0) {
        this.dictionaries = res.data
      } else {
        this.$message.error(res.msg)
      }
    },
    // 获取仓库列表
    async getwarehouseList () {
      const res = await storeList({
        isPage: false
      })
      if (res.code === 0) {
        this.warehouseDist = res.rows
      } else {
        this.$message.error(res.msg)
      }
    },
    // 列表
    async getListData () {
      this.loading = true
      const res = await outStockList(this.params)
      if (res.code === 0) {
        this.listData = res.rows
        this.pageTotal = res.total
        this.loading = false
      } else {
        this.loading = false
        this.$message.error(res.msg)
      }
    },
    // 查询
    submitSearch () {
      this.isCurrentOne = true
      this.params.pageNum = 1
      this.getListData()
    },
    // 重置
    resetFilter () {
      this.params = {
        ...this.params,
        memberName: '',
        warehouseCode: '',
        operatorName: '',
        status: '',
        pageNum: 1,
        pageSize: 10
      }
      this.submitSearch()
    },
    // 展开、收起
    unfoldSearch () {
      if (this.isUnfold) {
        this.isUnfold = false
      } else {
        this.isUnfold = true
      }
    },
    // 详情
    goDetail (data) {
      this.$router.push({
        path: '/main/outwarehouse/production/detail',
        query: {
          outStockCode: data.outStockCode
        }
      })
    },
    // 切换tab
    changeStatus () {
      this.isCurrentOne = true
      this.params.pageNum = 1
      this.params.memberName = ''
      this.params.warehouseCode = ''
      this.params.operatorName = ''
      this.params.status = ''
      this.getListData()
    },
    // 分页
    pageFunc (data) {
      this.isCurrentOne = false
      this.params.pageNum = data.pageNum
      this.params.pageSize = data.pageSize
      this.getListData()
    }
  }
}
</script>

<style lang="less" scoped>
.wareProductList {
  .searchinfo {
    background: #fff;
    padding: 12px 24px 0px 24px;
    .tabs {
      margin-bottom: 10px;
    }
    /deep/ .el-radio-button:first-child .el-radio-button__inner {
      border-left: 0px;
    }
    /deep/ .el-radio-button__inner {
      border: 0px;
      line-height: 22px;
      padding: 0px 5px;
      margin-left: 20px;
    }
    /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
      color: #409eff;
      background-color: #f3f9ff;
      box-shadow: 0 0 0 0 #fff;
    }
  }
  .listinfo {
    background: #fff;
    padding: 0px 24px 24px 24px;
    min-height: 700px;
    .tablestyle {
      .del {
        color: #ec2234;
      }
      /deep/ .el-table th {
        background: #f5f7fa;
        text-align: center;
      }
      /deep/ .el-table td {
        text-align: center;
      }
    }
    .pagebg {
      text-align: right;
    }
  }
}
</style>
