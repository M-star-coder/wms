<!--切片生产入库详情-->
<template>
  <div class="sliceDetail">
    <div class="basicDetail">
      <div class="mainTitle">基本信息</div>
      <el-row>
        <el-col :span="8"
          >入库单号：<span class="c333">{{ detail.grnCode }}</span></el-col
        >
        <el-col :span="8"
          >生产部门：<span class="c333">{{
            detail.productionDepartmentName
          }}</span></el-col
        >
        <el-col :span="8"
          >状态：<span class="c333">{{ detail.statusShow }}</span></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          >操作人：<span class="c333">{{ detail.operatorName }}</span></el-col
        >
        <el-col :span="8"
          >业务类型：<span class="c333">{{
            detail.warehousingBusinessTypeName
          }}</span></el-col
        >
        <el-col :span="8"
          >入库类别：<span class="c333">{{
            detail.warehousingCategoryName
          }}</span></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="8"
          >目的仓库：<span class="c333">{{
            detail.warehouseName
          }}</span></el-col
        >
        <el-col :span="8"
          >创建时间：<span class="c333">{{ detail.createTime }}</span></el-col
        >
        <el-col :span="8"></el-col>
      </el-row>
      <div class="remarks">
        <span>备注</span>
        <span class="c333">{{detail.remark}}</span>
      </div>
    </div>
    <div class="mainTitle">入库单明细</div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      size="medium"
      style="width: 100%"
    >
      <el-table-column label="序号" width="120" type="index" fixed>
      </el-table-column>
      <el-table-column
        prop="dateOfPackaging"
        label="包装日期"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="grnCode"
        label="入库单号"
        :show-overflow-tooltip="true"
        min-width="140px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="orderCode"
        label="订单号"
        :show-overflow-tooltip="true"
        min-width="80px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="trayCode"
        label="托盘单号"
        :show-overflow-tooltip="true"
        min-width="140px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="operatorName"
        label="单卷条码"
        :show-overflow-tooltip="true"
        min-width="80px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="lineNum"
        label="线别"
        :show-overflow-tooltip="true"
        min-width="100px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="productCode"
        label="产品编号"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="windThick"
        label="厚度"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="productSpec"
        label="规格"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="productGrade"
        label="等级"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="realWeight"
        label="重量"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="mainUnit"
        label="单位"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="windLength"
        label="卷长"
        :show-overflow-tooltip="true"
        min-width="120px"
        align="left"
      ></el-table-column>
      <el-table-column
        prop="realQuantity"
        label="卷数"
        :show-overflow-tooltip="true"
        align="left"
      ></el-table-column>
    </el-table>
    <div class="pageNum">
      <wmsPagination
        :pageTotal="pageTotal"
        :isCurrentOne="isCurrentOne"
        @pageFunc="pageFunc"
      />
    </div>
  </div>
</template>
<script>
import { warehouseGrnInfo, selectProduceGrnDetail } from '@/api/ms'
import wmsPagination from '@/components/wmsPagination'
export default {
  data () {
    return {
      list: [],
      pageTotal: 0, // 列表总数量
      isCurrentOne: false,
      detail: {},
      params: {
        pageNum: 1,
        pageSize: 10,
        grnCode: this.$route.query.grnCode
      },
      loading: true
    }
  },
  created () {
    this.getDetail()
    this.getProduceGrnDetail()
  },
  components: {
    wmsPagination
  },
  methods: {
    // 分页
    pageFunc (data) {
      this.isCurrentOne = false
      this.params.pageNum = data.pageNum
      this.params.pageSize = data.pageSize
      this.getProduceGrnDetail()
    },
    // 获取明细列表
    async getProduceGrnDetail () {
      this.loading = true
      const res = await selectProduceGrnDetail(this.params)
      if (res.code === 0) {
        this.list = res.rows
        this.pageTotal = res.total
      } else {
        this.$message.error(res.msg)
      }
      this.loading = false
    },
    // 获取详情
    async getDetail () {
      const res = await warehouseGrnInfo(this.$route.query)
      if (res.code === 0) {
        this.detail = res.data
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.sliceDetail {
  padding: 24px;
  background-color: #fff;
  .basicDetail {
    text-align: left;
    color: #666;
  }
  .c333 {
    color: #333;
  }
  .el-row {
    margin-bottom: 16px;
  }
  .mainTitle {
    position: relative;
    text-align: left;
    font-size: 16px;
    color: #333;
    padding: 48px 0 24px 6px;
    display: flex;
    &:before {
      content: " ";
      height: 14px;
      width: 2px;
      background-color: #1890ff;
      left: 0;
      top: 52px;
      position: absolute;
    }
  }
  .remarks {
    display: flex;
    margin-bottom: 48px;
    margin-top: 24px;
    span {
      flex: 0 0 92px;
      margin-right: 12px;
    }
    /deep/ .el-textarea__inner {
      height: 124px;
    }
  }
  /deep/ .el-table th {
    background: #f5f7fa;
    text-align: center;
  }
  /deep/ .el-table td {
    text-align: center;
  }
  /deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 0;
  }
  /deep/ .productDetail .el-table__header-wrapper {
    display: none;
  }
  /deep/ .productDetail .el-table__expanded-cell .el-table__header-wrapper {
    display: block;
  }
  .pageNum {
    text-align: right;
  }
}
</style>
