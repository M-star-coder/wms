<template>
    <!-- 产品列表 -->
    <div v-loading="loading">
        <div class="productlist">
            <div class="producttype">
                <div class="title">
                    <p>产品分类</p>
                </div>
                <div class="typetree">
                    <el-tree 
                        :data="prodTypeData" 
                        :props="defaultProps" 
                        @node-click="typeNodeClick"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                        >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                            <el-tooltip :disabled="node.label.length>12?false:true" effect="dark" :content="node.label" placement="top">
                                <span style="width:84px; text-overflow:ellipsis;"><img v-if="data.children.length>0" src="../../../assets/icon/file.png" class="fileicon" /> {{node.label.length>12?node.label.substr(0,10)+"...":node.label}}</span>
                                <!-- <span style="width:84px; text-overflow:ellipsis;"><img src="../../../assets/icon/file.png" class="fileicon" />{{node.label.length>12?node.label.substr(0,10)+"...":node.label}}</span> -->
                            </el-tooltip>
                        </span>
                    </el-tree>
                </div>
            </div>
            <div class="productinfo">
                <div class="title">产品信息</div>
                <div class="searchinfo">
                    <el-form :inline="true" align="left">
                        <el-form-item>
                            <el-input v-model="params.productName" placeholder="产品名称" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                    <div class="searchbtn">
                        <el-button type="primary" @click="submitSearch" size="small">查询</el-button>
                        <el-button @click="resetFilter" size="small">重置</el-button>
                    </div>
                </div>
                <div class="producttable">
                    <el-table :data="productData" border size="medium" style="width: 100%">
                        <el-table-column prop="productClassName" label="分类" :show-overflow-tooltip="true" min-width="140px" align="center"></el-table-column>
                        <el-table-column prop="productCode" label="产品编码" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                        <el-table-column prop="productName" label="名称" :show-overflow-tooltip="true" min-width="160px" align="left"></el-table-column>
                        <el-table-column v-if="params.businessType==0" prop="windThick" label="厚度" :show-overflow-tooltip="true" min-width="80px" align="center"></el-table-column>
                        <el-table-column v-if="params.businessType==1" prop="productModel" label="型号" :show-overflow-tooltip="true" min-width="80px" align="center"></el-table-column>
                        <el-table-column prop="productSpec" label="规格" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                        <el-table-column prop="productSpec" label="库存数量" :show-overflow-tooltip="true" min-width="120px" align="center">
                            <template slot-scope="scope">
                                {{scope.row.stockQuantity}}{{scope.row.supUnit}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="productSpec" label="库存重量" :show-overflow-tooltip="true" min-width="120px" align="center">
                            <template slot-scope="scope">
                                {{scope.row.stockWeight}}{{scope.row.mainUnit}}
                            </template>
                        </el-table-column>
                        <el-table-column v-if="params.businessType==0" prop="productSpec" label="保质期" :show-overflow-tooltip="true" min-width="80px" align="center">
                            <template slot-scope="scope">
                                {{scope.row.warehouseShelfLife}}个月
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="150px" align="center">
                            <template slot-scope="scope">
                                <el-button @click="prodEdit(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button @click="prodDetail(0, scope.row)" type="text" size="small">详情</el-button>
                                <el-button @click="prodDetail(1, scope.row)" type="text" size="small">查看明细</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagebg">
                    <wmsPagination :pageTotal="pageTotal" :isCurrentOne="isCurrentOne" @pageFunc="pageFunc" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { 
    productTypeList,
    productList,
} from "@/api/ms";
import wmsPagination from "@/components/wmsPagination";
// import { Crumbs } from "@/utils/crumbs";
export default {
    name: "list",
    components: {
        wmsPagination,
    },
    data() {
        return {
            prodTypeData: [],   //产品分类
            defaultProps: {   //配置选项
                children: 'children',
                label: 'label',
            },
            productData: [],   //产品列表
            params: {
                productClass: "",   //产品分类code
                productClassName: "",   //产品分类名称
                businessType: "",   //业务类型 0 薄膜，1 切片
                pageNum: 1,
                pageSize: 10,
                isPage: true,
            },
            pageTotal: 0, //列表总数量
            isCurrentOne: false,
            loading: true,
        };
    },
    created() {
        this.prodTypeList();
    },
    methods: {
        //产品分类列表
        prodTypeList(){
            productTypeList().then(res => {
                if(res.code == 0 && res.data != null){
                    this.prodTypeData = res.data;
                    this.loading = false
                }
            })
        },
        //选择产品分类
        typeNodeClick(data){
            // console.log(data);
            if(data.children == ""){
                this.params = {
                    ...this.params,
                    productClass: data.code,
                    productClassName: data.label,
                    businessType: data.businessType,
                };
                this.prodList();
            }
        },
        //产品列表
        prodList(){
            if(this.params.productClass == ""){
                this.$message.error("请选择产品分类");
                return false
            }
            productList(this.params).then(res => {
                if(res.code == 0 && res.rows != null){
                    this.productData = res.rows;
                    this.pageTotal = res.total;
                }
            })
        },
        // 查询
        submitSearch () {
            this.isCurrentOne = true;
            this.params.pageNum = 1;
            this.prodList()
        },
        // 重置
        resetFilter () {
            this.params = {
                ...this.params,
                productName: "",   //产品名称
                isPage: true,
                pageNum: 1,
                pageSize: 10
            }
            this.submitSearch();
        },
        //编辑
        prodEdit(data){
            this.$router.push({ 
                path: "/main/basicData/product/edit", 
                query: {
                    businessType: data.businessType,
                    productCode: data.productCode,
                }
            });
        },
        //详情
        prodDetail(type, data){
            // type 0：详情 1：明细
            this.$router.push({ 
                path: "/main/basicData/product/detail", 
                query: {
                    type: type,
                    businessType: data.businessType,
                    productCode: data.productCode,
                }
            });
        },
        //分页
        pageFunc(data) {
            this.isCurrentOne = false;
            this.params.pageNum = data.pageNum;
            this.params.pageSize = data.pageSize;
            this.prodList();
        },
    },
};
</script>

<style lang="less" scoped>
.productlist{
    display: flex;
    background: #fff;
    min-height: 700px;
    .producttype{
        // min-width: 168px;
        // padding: 20px 24px;
        min-width: 208px;
        padding: 20px 14px;
        border-right: 1px solid #f0f0f0;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f1f1;
        }
        .typetree{
            padding-top: 10px;
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;
                .fileicon{
                    width: 14px;
                    height: 12px;
                }
                .icondelete{
                    color: #ec2234;
                }
                .iconedit{
                    color: #409eff;
                }
                .cutline{
                   border: 0px;
                   border-right: 1px solid #e9e9e9;
                   margin: -2px 6px;
                   height: 14px;
                   display: inline-block;
                }
            }
        }
    }
    .productinfo{
        width: calc(100% - 265px);
        padding: 20px 24px;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 12px;
            border-bottom: 1px solid #f1f1f1;
            .deleteadd{
                .deletenum{
                    font-size: 14px;
                    color: #999;
                    margin-right: 10px;
                }
            }
        }
        .searchinfo{
            background: #fff;
            padding-top: 24px;
            display: flex;
            justify-content: space-between;
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
        .producttable{
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
    }
}
</style>