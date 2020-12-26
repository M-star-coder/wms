<template>
  <div class="warehousingDetail" v-loading="loading">
    <el-tabs v-model="outDetail">
      <el-tab-pane label="出库详情" name="first">
        <div class="basicDetail">
          <div class="mainTitle">主要信息</div>
          <el-row>
            <el-col :span="8">
              入库单号：
              <span class="c333">{{ detail.grnCode }}</span>
            </el-col>
            <el-col :span="8">
              生产部门：
              <span class="c333">
                {{ detail.productionDepartmentName }}
              </span>
            </el-col>
            <el-col :span="8">
              状态：
              <span class="c333">{{ detail.statusShow }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              操作人：
              <span class="c333">
                {{ detail.operatorName }}
              </span>
            </el-col>
            <el-col :span="8">
              业务类型：
              <span class="c333">
                {{ detail.warehousingBusinessTypeName }}
              </span>
            </el-col>
            <el-col :span="8">
              入库类别：
              <span class="c333">
                {{ detail.warehousingCategoryName }}
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              目的仓库：
              <span class="c333">
                {{ detail.warehouseName }}
              </span>
            </el-col>
            <el-col :span="8">
              创建时间：
              <span class="c333">
                {{ detail.createTime }}
              </span>
            </el-col>
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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="收货明细" name="first">
            <el-table
              :data="detail.filmProductionList"
              class="productDetail"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                    v-loading="loading"
                    :data="props.row.productDetail"
                    size="medium"
                    class="childLocation"
                    style="width: 100%"
                  >
                    <el-table-column
                      label="序号"
                      width="120"
                      type="index"
                    ></el-table-column>
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
                      prop="saleSpec"
                      label="规格"
                      :show-overflow-tooltip="true"
                      min-width="180px"
                      align="left"
                    ></el-table-column>
                    <el-table-column
                      prop="productGrade"
                      label="等级"
                      :show-overflow-tooltip="true"
                      min-width="100px"
                      align="left"
                    ></el-table-column>
                    <el-table-column
                      prop="productGrade"
                      label="ERP码"
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
                      prop="realQuantity"
                      label="卷数"
                      :show-overflow-tooltip="true"
                      align="left"
                    ></el-table-column>
                    <el-table-column
                      prop="storageLocationName"
                      label="入库货位"
                      :show-overflow-tooltip="true"
                      align="left"
                    ></el-table-column>
                    <el-table-column
                      prop="orderCode"
                      label="订单编号"
                      :show-overflow-tooltip="true"
                      align="left"
                    ></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column label prop="id">
                <template slot-scope="props"
                  >托盘码：{{ props.row.trayCode }}</template
                >
              </el-table-column>
              <el-table-column label prop="name">
                <template slot-scope="props"
                  >数量：{{ props.row.totalVolumeNum }}</template
                >
              </el-table-column>
              <el-table-column label prop="desc">
                <template slot-scope="props"
                  >重量：{{ props.row.totalWeight }}</template
                >
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="totalMoney">
          总计：
          <span class="cBlue">943.00</span>kg <span class="cBlue">943</span>卷
          <el-button type="primary" @click="outStockSave">保存备注</el-button>
          <el-button type="primary" @click="stockSplit">入库拆分</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="明细查看" name="seconds">
        <div class="pagebg">
          <el-table
            v-loading="loading"
            :data="list"
            border
            size="medium"
            style="width: 100%"
          >
            <el-table-column
              label="序号"
              width="120"
              type="index"
              fixed
            ></el-table-column>
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
          <wmsPagination
            :pageTotal="pageTotal"
            :isCurrentOne="isCurrentOne"
            @pageFunc="pageFunc"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {
  warehouseGrnInfo,
  listDictData,
  outStockUpdate,
  selectFilmProduceISReceiptDetail,
  selectProduceGrnDetail,
} from "@/api/ms";
import wmsPagination from "@/components/wmsPagination";
export default {
  data() {
    return {
      activeName: "first",
      outDetail: "first",
      detail: {},
      loading: true,
      dictionaries: {},
      params: {
        pageNum: 1,
        pageSize: 10,
        grnCode: this.$route.query.grnCode,
      },
      list: [],
      pageTotal: 0, // 列表总数量
      isCurrentOne: false,
    };
  },
  created() {
    this.getDictData();
    this.getDetail();
    this.ProductDetail();
    this.getProduceGrnDetail();
  },
  components: {
    wmsPagination,
  },
  filters: {
    stationFilter(value, dictionaries) {
      return dictionaries.ms_diaphragm_station.find(
        (vo) => vo.dictValue === value.toString()
      ).dictLabel;
    },
  },
  methods: {
    // 入库拆分

    stockSplit() {
      this.$router.push(
        `/main/warehousing/production/stockSplit?grnCode=${this.$route.query.grnCode}`
      );
    },
    // 分页
    pageFunc(data) {
      this.isCurrentOne = false;
      this.params.pageNum = data.pageNum;
      this.params.pageSize = data.pageSize;
      this.getProduceGrnDetail();
    },
    // 获取明细列表
    async getProduceGrnDetail() {
      const res = await selectProduceGrnDetail(this.params);
      if (res.code === 0) {
        this.list = res.rows;
        this.pageTotal = res.total;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 获取生产入库收货产品明细
    async ProductDetail() {
      const res = await selectFilmProduceISReceiptDetail(this.$route.query);
      if (res.code === 0) {
        this.detai.filmProductionList = res.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 保存备注
    outStockSave() {
      this.loading = true;
      outStockUpdate(this.detail).then((res) => {
        if (res.code === 0) {
          this.$router.push("/main/outwarehouse/production/list");
        } else {
          this.$message.error(res.msg);
        }
        this.loading = false;
      });
    },
    // 获取详情
    async getDetail() {
      const res = await warehouseGrnInfo(this.$route.query);
      if (res.code === 0) {
        this.detail = res.data;
      } else {
        this.$message.error(res.msg);
      }
      this.loading = false;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 获取字典列表
    async getDictData() {
      const { data } = await listDictData("ms_diaphragm_station");
      this.dictionaries = data;
    },
  },
};
</script>
<style lang="less" scoped>
.warehousingDetail {
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
  .totalMoney {
    text-align: right;
    .cBlue {
      color: #2b7de1;
    }
    margin: 24px 0;
    /deep/ .el-button {
      margin-left: 24px;
    }
  }
  .pagebg {
    text-align: right;
  }
}
</style>
