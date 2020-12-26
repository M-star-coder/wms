<template>
  <div>
    <div class="listinfo">
      <el-input
        v-model="params.companyName"
        placeholder="申请单号/产品编码"
        suffix-icon="el-icon-search"
        @input="submitSearch"
        size="small"
        class="btnadd"
      ></el-input>
      <p class="title">冻结单据</p>
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
            prop="categoryCode"
            label="申请单号"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="categoryCode"
            label="申请日期"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="categoryCode"
            label="编码"
            :show-overflow-tooltip="true"
            min-width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="categoryCode"
            label="申请部门"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="categoryCode"
            label="申请人"
            :show-overflow-tooltip="true"
            min-width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="categoryCode"
            label="申请数量"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.categoryCode }}{{ scope.row.categoryCode }}
            </template>
          </el-table-column>
          <el-table-column
            prop="categoryCode"
            label="申请重量"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.categoryCode }}{{ scope.row.categoryCode }}
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
import { storeTypeList } from "@/api/ms";
import wmsPagination from "@/components/wmsPagination";
// import crumbsMap from "@/utils/crumbsMap";
export default {
  name: "list",
  components: {
    wmsPagination
  },
  data() {
    return {
      userId: sessionStorage.getItem("userId"),
      applyPersonName: sessionStorage.getItem("applyPersonName"),
      params: {
        companyName: "", // 申请单号/产品编码
        isPage: true,
        pageNum: 1,
        pageSize: 10
      },
      listData: [],
      pageTotal: 0, // 列表总数量
      isCurrentOne: false,
      loading: false
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    // 列表数据
    getListData() {
      this.loading = true;
      storeTypeList(this.params).then(res => {
        if (res.code == 0) {
          this.listData = res.rows;
          this.pageTotal = res.total;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message.error(res.msg);
        }
      });
    },
    // 查询
    submitSearch(val) {
      // console.log(val);
      this.isCurrentOne = true;
      this.params.pageNum = 1;
      this.getListData();
    },
    // 分页
    pageFunc(data) {
      this.isCurrentOne = false;
      this.params.pageNum = data.pageNum;
      this.params.pageSize = data.pageSize;
      this.getListData();
    }
  }
};
</script>

<style lang="less" scoped>
.listinfo {
  background: #fff;
  padding: 24px 24px;
  margin-top: 24px;
  min-height: 700px;
  .btnadd {
    position: absolute;
    right: 24px;
    margin-top: -5px;
    z-index: 1;
    width: 20%;
  }
  .title {
    text-align: left;
    color: #666;
    line-height: 38px;
    border-bottom: 1px solid #f1f1f1;
    margin-bottom: 15px;
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
    text-align: right;
  }
  .c333 {
    color: #333;
  }
  .c999 {
    color: #999;
  }
}
.iconclose {
  position: absolute;
  right: 40px;
  top: 22px;
  cursor: pointer;
}
.hintinfo {
  font-size: 14px;
  color: #666;
  text-align: left;
  line-height: 22px;
  .price {
    color: #000;
  }
}
.footer {
  text-align: center;
  margin-top: 30px;
}
</style>
