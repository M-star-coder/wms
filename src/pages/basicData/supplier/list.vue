<template>
    <div>
        <div class="searchinfo">
            <el-tabs v-model="params.enterpriseType" @tab-click="submitSearch">
                <el-tab-pane label="国内" name="1"></el-tab-pane>
                <el-tab-pane label="国外" name="2"></el-tab-pane>
            </el-tabs>
            <div class="search">
                <el-form :inline="true" align="left">
                    <el-form-item>
                        <el-input v-model="params.companyName" placeholder="供应商名称" size="small"></el-input>
                    </el-form-item>
                </el-form>
                <div class="searchbtn">
                    <el-button type="primary" @click="submitSearch" size="small">查询</el-button>
                    <el-button @click="resetFilter" size="small">重置</el-button>
                </div>
            </div>
        </div>
        <div class="listinfo">
            <div class="tablestyle">
                <el-table v-loading="loading" :data="listData" border size="medium" style="width: 100%">
                    <el-table-column fixed prop="companyCode" label="编码" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                    <el-table-column prop="companyName" label="供应商名称" :show-overflow-tooltip="true" min-width="140px" align="left"></el-table-column>
                    <el-table-column prop="companyAbbr" label="简称" :show-overflow-tooltip="true" min-width="100px" align="center"></el-table-column>
                    <el-table-column prop="corporation" label="法人" :show-overflow-tooltip="true" min-width="100px" align="center"></el-table-column>
                    <el-table-column prop="tanuNo" label="税号" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                    <el-table-column prop="companyAddr" label="地址" :show-overflow-tooltip="true" min-width="140px" align="center"></el-table-column>
                    <el-table-column prop="bankName" label="银行" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                    <el-table-column prop="bankAccount" label="银行账号" :show-overflow-tooltip="true" min-width="140px" align="center"></el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="80px" align="center">
                        <template slot-scope="scope">
                            <el-button @click="dataDetail(scope.row)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagebg">
                <wmsPagination :pageTotal="pageTotal" :isCurrentOne="isCurrentOne" @pageFunc="pageFunc" />
            </div>
        </div>
    </div>
</template>

<script>
import {
    supplierList,
} from '@/api/ms'
import wmsPagination from '@/components/wmsPagination'
// import crumbsMap from "@/utils/crumbsMap";
export default {
    name: 'list',
    components: {
        wmsPagination
    },
    data () {
        return {
            userId: sessionStorage.getItem('userId'),
            applyPersonName: sessionStorage.getItem('applyPersonName'),
            params: {
                enterpriseType: "1",   // 企业类型 1：国内 2：国外
                companyName: "",   // 供应商名称
                pageNum: 1,
                pageSize: 10
            },
            listData: [],
            pageTotal: 0, // 列表总数量
            isCurrentOne: false,
            loading: false,
        }
    },
    created () {
        this.getListData();
    },
    methods: {
        // 列表数据
        getListData () {
            this.loading = true
            supplierList(this.params).then(res => {
                if (res.code == 0) {
                    this.listData = res.rows;
                    this.pageTotal = res.total;
                    this.loading = false
                }else{
                    this.loading = false
                    this.$message.error(res.msg);
                }
            })
        },
        // 查询
        submitSearch () {
            this.isCurrentOne = true;
            this.params.pageNum = 1;
            this.getListData()
        },
        // 重置
        resetFilter () {
            this.params = {
                ...this.params,
                enterpriseType: "1",   // 企业类型 1：国内 2：国外
                companyName: "",   // 供应商名称
                pageNum: 1,
                pageSize: 10
            }
            this.submitSearch();
        },
        // 详情
        dataDetail (data) {
            this.$router.push({ 
                path: "/main/basicData/supplier/detail", 
                query: {
                    companyCode: data.companyCode,
                }
            });
        },
        // 分页
        pageFunc (data) {
            this.isCurrentOne = false;
            this.params.pageNum = data.pageNum
            this.params.pageSize = data.pageSize
            this.getListData();
        }
    }
}
</script>

<style lang="less" scoped>
.searchinfo{
    background: #fff;
    padding: 14px 24px 0px 24px;
    .search{
        display: flex;
        justify-content: space-between;
        padding-top: 6px;
    }
    .searchbtn{
        line-height: 40px;
    }
    .tabs{
        margin-bottom: 10px;
    }
    .searchtype{
        .typelab{
            color: #999;
        }
    }
    /deep/  .el-radio-button:first-child .el-radio-button__inner{
                border-left: 0px;
            }
    /deep/  .el-radio-button__inner{
                border: 0px;
                line-height: 22px;
                padding: 0px 5px;
                margin-left: 20px;
            }
    /deep/  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        color: #409eff;
        background-color: #f3f9ff;
        box-shadow: 0 0 0 0 #fff;
    }
}
.listinfo{
    background: #fff;
    padding: 4px 24px 24px 24px;
    min-height: 600px;
    .btnadd {
        position: absolute;
        right: 24px;
        margin-top: -5px;
        z-index: 1;
    }
    .title{
        text-align: left;
        color: #666;
        line-height: 38px;
        border-bottom: 1px solid #f1f1f1;
        margin-bottom: 15px;
    }
    .tablestyle{
        .del {
            color: #ec2234;
        }
        /deep/ .el-table th{
                    background: #f5f7fa;
                }
    }
    .pagebg{
        text-align: right;
    }
    .c333{
        color: #333;
    }
    .c999{
        color: #999;
    }
}
.iconclose{
    position: absolute;
    right: 40px;
    top: 22px;
    cursor: pointer;
}
.hintinfo{
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: 22px;
    .price{
        color: #000;
    }
}
.footer{
    text-align: center;
    margin-top: 30px;
}
</style>
