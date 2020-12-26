<template>
  <div>
    <div class="searchinfo">
      <el-form :inline="true" align="left">
        <el-form-item>
          <el-input
            v-model="params.zoneName"
            placeholder="库区名称"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="params.zoneCode"
            placeholder="库区编号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="params.warehouseCode"
            placeholder="所属仓库"
            size="small"
            class="select"
          >
            <el-option
              v-for="item in storeList"
              :key="item.warehouseCode"
              :label="item.warehouseName"
              :value="item.warehouseCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="params.lockStatus"
            placeholder="状态"
            size="small"
            class="select"
          >
            <el-option label="正常" value="1"></el-option>
            <el-option label="锁定" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="searchbtn">
        <el-button type="primary" @click="submitSearch" size="small"
          >查询</el-button
        >
        <el-button @click="resetFilter" size="small">重置</el-button>
      </div>
    </div>
    <div class="listinfo">
      <el-button type="primary" size="small" class="btnadd" @click="dataAdd(0)"
        >新增库区</el-button
      >
      <p class="title">全部库区</p>
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
            prop="zoneCode"
            label="库区编号"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.zoneCode
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="zoneName"
            label="库区名称"
            :show-overflow-tooltip="true"
            min-width="140px"
            align="left"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.zoneName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="warehouseName"
            label="所属仓库"
            :show-overflow-tooltip="true"
            min-width="120px"
            align="left"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.warehouseName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="companyName"
            label="所属公司"
            :show-overflow-tooltip="true"
            min-width="180px"
            align="left"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.companyName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="lockStatus"
            label="状态"
            min-width="80px"
            align="center"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.lockStatus == 1 ? "正常" : "锁定"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            :show-overflow-tooltip="true"
            min-width="160px"
            align="left"
          >
            <template slot-scope="scope">
              <span :class="scope.row.lockStatus == 1 ? '' : 'c999'">{{
                scope.row.remark
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                @click="dataDelete(scope.row)"
                class="del"
                type="text"
                size="small"
                >删除</el-button
              >
              <el-button @click="dataAdd(1, scope.row)" type="text" size="small"
                >编辑</el-button
              >
              <el-button @click="dataDetail(scope.row)" type="text" size="small"
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
import { storeAreaList, storeList, storeAreaDelete } from "@/api/ms";
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
        zoneName: "", //库区名称
        zoneCode: "", //库区编号
        warehouseCode: "", //仓库
        lockStatus: "", //锁定状态
        isPage: true,
        pageNum: 1,
        pageSize: 10
      },
      storeList: [], //仓库
      listData: [],
      pageTotal: 0, // 列表总数量
      isCurrentOne: false,
      loading: false
    };
  },
  created() {
    this.getListData();
    this.getStoreList();
  },
  methods: {
    // 列表数据
    getListData() {
      this.loading = true;
      storeAreaList(this.params).then(res => {
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
    // 仓库
    getStoreList() {
      storeList({
        isPage: false
      }).then(res => {
        if (res.code == 0) {
          this.storeList = res.rows;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 查询
    submitSearch() {
      this.isCurrentOne = true;
      this.params.pageNum = 1;
      this.getListData();
    },
    // 重置
    resetFilter() {
      this.params = {
        ...this.params,
        zoneName: "", //库区名称
        zoneCode: "", //库区编号
        warehouseCode: "", //仓库
        lockStatus: "", //锁定状态
        isPage: true,
        pageNum: 1,
        pageSize: 10
      };
      this.submitSearch();
    },
    // 新增、编辑
    dataAdd(type, data) {
      // type 0：新增 1：编辑
      if (type == 0) {
        this.$router.push({
          path: "/main/basicData/storeArea/add",
          query: {
            type: type
          }
        });
      } else {
        this.$router.push({
          path: "/main/basicData/storeArea/add",
          query: {
            type: type,
            zoneCode: data.zoneCode
          }
        });
      }
    },
    // 删除
    dataDelete(data) {
      this.$confirm(
        `请确认是否删除库区 “${data.zoneName}”，删除后将无法再次恢复！`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
          storeAreaDelete({
            id: data.id,
            updateBy: sessionStorage.getItem("userId"),
            updateName: sessionStorage.getItem("applyPersonName"),
            zoneCode: data.zoneCode
          }).then(res => {
            if (res.code == 0) {
              this.$message.success("删除成功");
              this.getListData();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {});
    },
    // 详情
    dataDetail(data) {
      this.$router.push({
        path: "/main/basicData/storeArea/detail",
        query: {
          zoneCode: data.zoneCode
        }
      });
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
.searchinfo {
  background: #fff;
  padding: 24px 24px;
  display: flex;
  justify-content: space-between;
  .searchbtn {
    line-height: 40px;
  }
  .tabs {
    margin-bottom: 10px;
  }
  .searchtype {
    .typelab {
      color: #999;
    }
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
  padding: 24px 24px;
  margin-top: 24px;
  min-height: 700px;
  .btnadd {
    position: absolute;
    right: 24px;
    margin-top: -5px;
    z-index: 1;
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
