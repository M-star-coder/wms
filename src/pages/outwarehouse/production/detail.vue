<template>
  <div class="outwarehouseDetail" v-loading="loading">
    <el-tabs v-model="outDetail">
      <el-tab-pane label="出库详情" name="first">
        <div class="basicDetail">
          <div class="mainTitle">主要信息</div>
          <el-row>
            <el-col :span="8"
              >出库单号：<span class="c333">{{
                detail.outStockCode
              }}</span></el-col
            >
            <el-col :span="8"
              >销售部门：<span class="c333">{{
                detail.saleDeptName
              }}</span></el-col
            >
            <el-col :span="8"
              >状态：<span class="c333">{{ detail.statusShow }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"
              >业务员：<span class="c333">{{
                detail.operatorName
              }}</span></el-col
            >
            <el-col :span="8"
              >业务类型：<span class="c333">{{
                detail.businessTypeShow
              }}</span></el-col
            >
            <el-col :span="8"
              >仓库：<span class="c333">{{
                detail.warehouseName
              }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"
              >出库类别：<span class="c333">{{
                detail.outStockTypeShow
              }}</span></el-col
            >
            <el-col :span="8"
              >关联提货单：<span class="c333">{{
                detail.noticeCode
              }}</span></el-col
            >
            <el-col :span="8"
              >客户名称：<span class="c333">{{
                detail.memberName
              }}</span></el-col
            >
          </el-row>
          <el-row>
            <el-col :span="8"
              >车号：<span class="c333">{{ detail.carNumber }}</span></el-col
            >
            <el-col :span="8"
              >创建时间：<span class="c333">{{
                detail.createTime
              }}</span></el-col
            >
            <el-col :span="8"></el-col>
          </el-row>
          <div class="remarks">
            <span>备注</span>
            <el-input
              type="textarea"
              v-model="detail.remark"
              maxlength="200"
              placeholder="请输入"
              show-word-limit
              height="124px"
            ></el-input>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="提货单明细" name="first">
        <el-table
          v-loading="loading"
          :data="detail.saleInvoiceDetailResponseList"
          border
          size="medium"
          style="width: 100%"
        >
          <el-table-column label="序号" width="120" type="index">
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="产品编号"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="productSpec"
            label="厚度 "
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="specificationsList"
            label="规格"
            :show-overflow-tooltip="true"
            min-width="180px"
            align="left"
          >
            <template
              slot-scope="scope"
              v-if="scope.row.specificationsList.length > 0"
            >
              <div
                class="specItem"
                v-for="vo in scope.row.specificationsList"
                :key="vo.id"
              >
                {{ vo.productHeight }}
                *
                {{ vo.productWidth }}
                *
                {{ vo.productLength }}
                -
                {{ vo.paperCore }}
                -
                {{ vo.packingMethod }}
                -
                {{ vo.station | stationFilter(dictionaries) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="productGrade"
            label="等级"
            :show-overflow-tooltip="true"
            min-width="100px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="productGrade"
            label="重量"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="weightUnit"
            label="单位"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="volumeNum"
            label="卷数"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="salePrice"
            label="单价"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="statusShow"
            label="税率"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="salePrice"
            label="含税单价"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="totalPrice"
            label="价税合计"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="freightPrice"
            label="运费单价"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="remarkJson"
            label="备注"
            :show-overflow-tooltip="true"
            align="left"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="库位明细" name="second">
        <el-table
          :data="detail.locationDetailList"
          class="locationDetailList"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                v-loading="loading"
                :data="props.row.outStockDetailResponseList"
                size="medium"
                class="childLocation"
                style="width: 100%"
              >
                <el-table-column label="序号" width="120" type="index">
                </el-table-column>
                <el-table-column
                  prop="barCode"
                  label="单卷条码"
                  :show-overflow-tooltip="true"
                  min-width="140px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="productName"
                  label="产品名称"
                  :show-overflow-tooltip="true"
                  min-width="140px"
                  align="center"
                ></el-table-column>
                <el-table-column
                  prop="windThick"
                  label="厚度 "
                  :show-overflow-tooltip="true"
                  min-width="140px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="productSpec"
                  label="规格"
                  :show-overflow-tooltip="true"
                  min-width="180px"
                  align="left"
                >
                  <!-- <template
                    slot-scope="scope"
                    v-if="
                      scope.row.specificationsList &&
                      scope.row.specificationsList.length > 0
                    "
                  >
                    <div
                      class="specItem"
                      v-for="vo in scope.row.specificationsList"
                      :key="vo.id"
                    >
                      {{ vo.productHeight }}
                      *
                      {{ vo.productWidth }}
                      *
                      {{ vo.productLength }}
                      -
                      {{ vo.paperCore }}
                      -
                      {{ vo.packingMethod }}
                      -
                      {{ vo.station | stationFilter(dictionaries) }}
                    </div>
                  </template> -->
                </el-table-column>
                <el-table-column
                  prop="productGrade"
                  label="等级"
                  :show-overflow-tooltip="true"
                  min-width="100px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="productBaseWeight"
                  label="重量"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="productBaseUnit"
                  label="单位"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="volumeNum"
                  label="整托毛重"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="salePrice"
                  label="单卷净重"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="statusShow"
                  label="税率"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="unit"
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
                  prop="supUnit"
                  label="辅单位"
                  :show-overflow-tooltip="true"
                  min-width="120px"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="remarkJson"
                  label="仓库"
                  :show-overflow-tooltip="true"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="storageZoneName"
                  label="库区 "
                  :show-overflow-tooltip="true"
                  align="left"
                ></el-table-column>
                <el-table-column
                  prop="storageLocationName"
                  label="库位"
                  :show-overflow-tooltip="true"
                  align="left"
                ></el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="" prop="id">
            <template slot-scope="props">
              托盘码：{{ props.row.trayCode }}
            </template>
          </el-table-column>
          <el-table-column label="" prop="name">
            <template slot-scope="props">
              数量：{{ props.row.goodNum }}
            </template>
          </el-table-column>
          <el-table-column label="" prop="desc">
            <template slot-scope="props">
              重量：{{ props.row.goodWeight }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="出库明细" name="third">
        <el-table
          v-loading="loading"
          :data="detail.outStockDetailResponseList"
          border
          size="medium"
          style="width: 100%"
        >
          <el-table-column label="序号" width="120" type="index">
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="库位编号"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="storageLocationName"
            label="库位名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="storageZoneName"
            label="库区名称 "
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="saleCompanyName"
            label="销售公司名称"
            :show-overflow-tooltip="true"
            min-width="100px"
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
            prop="productGrade"
            label="等级"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="productRemark"
            label="备注"
            :show-overflow-tooltip="true"
            align="left"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未出库明细" name="fourth">
        <el-table
          v-loading="loading"
          :data="detail.whOutStockDetailList"
          border
          size="medium"
          style="width: 100%"
        >
          <el-table-column label="序号" width="120" type="index">
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="库位编号"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="storageLocationName"
            label="库位名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="storageZoneName"
            label="库区名称 "
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="saleCompanyName"
            label="销售公司名称"
            :show-overflow-tooltip="true"
            min-width="100px"
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
            prop="productGrade"
            label="等级"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          ></el-table-column>
          <el-table-column
            prop="productRemark"
            label="备注"
            :show-overflow-tooltip="true"
            align="left"
          ></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="totalMoney">总计：<span class="cBlue">943.00</span>kg <span class="cBlue">943</span>卷<el-button type="primary" @click="outStockSave">保存备注</el-button></div>
  </div>
</template>
<script>
import { outStockGet, listDictData, outStockUpdate } from '@/api/ms'
export default {
  data () {
    return {
      activeName: 'first',
      outDetail: 'first',
      detail: {},
      loading: true,
      dictionaries: {}
    }
  },
  created () {
    this.getDictData()
    this.getDetail()
  },
  filters: {
    stationFilter (value, dictionaries) {
      return dictionaries.ms_diaphragm_station.find(
        (vo) => vo.dictValue === value.toString()
      ).dictLabel
    }
  },
  methods: {
    outStockSave () {
      this.loading = true
      outStockUpdate(this.detail).then((res) => {
        if (res.code === 0) {
          this.$router.push('/main/outwarehouse/production/list')
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    getDetail () {
      outStockGet(this.$route.query).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
        } else {
          this.$message.error(res.msg)
        }
        this.loading = false
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    // 获取字典列表
    async getDictData () {
      const { data } = await listDictData('ms_diaphragm_station')
      this.dictionaries = data
    }
  }
}
</script>
<style lang="less" scoped>
.outwarehouseDetail {
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
  /deep/ .locationDetailList .el-table__header-wrapper {
    display: none;
  }
  /deep/
    .locationDetailList
    .el-table__expanded-cell
    .el-table__header-wrapper {
    display: block;
  }
  .totalMoney{
    text-align: right;
    .cBlue{color: #2B7DE1;}
    margin: 24px 0;
    /deep/ .el-button{margin-left: 24px;}
  }
}
</style>
