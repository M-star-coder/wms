<template>
    <div v-loading="loading" class="main">
        <el-tabs v-model="tabType" class="tabs">
            <el-tab-pane label="产品详情" name="infoDetail"></el-tab-pane>
            <el-tab-pane label="产品明细" name="infoList"></el-tab-pane>
        </el-tabs>
        <div v-if="tabType == 'infoDetail'">
            <div class="title">主要信息</div>
            <div class="item">
                <el-row>
                    <el-col :span="8">
                        <label class="sublab">分类：</label>{{detail.productClass}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">名称：</label>{{detail.productName}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">产品编码：</label>{{detail.productCode}}
                    </el-col>
                    <el-col v-if="businessType==0" :span="8">
                        <label class="sublab">厚度：</label>{{detail.windThick}}
                    </el-col>
                    <el-col v-if="businessType==1" :span="8">
                        <label class="sublab">型号：</label>{{detail.productModel}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">规格：</label>{{detail.productSpec}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">库存数量：</label>{{detail.stockQuantity}}{{detail.supUnit}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">库存重量：</label>{{detail.stockWeight}}{{detail.mainUnit}}
                    </el-col>  
                    <el-col :span="8">
                        <label class="sublab">创建：</label>{{detail.createName}} {{detail.createTime}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">最后修改：</label>{{detail.updateName}} {{detail.updateTime}}
                    </el-col> 
                </el-row>
            </div>
            <div class="title">产品属性</div>
            <div class="item">
                <el-row>
                    <el-col :span="12">
                        <label class="sublab">保质期：</label>{{detail.warehouseShelfLife}}个月
                    </el-col>
                    <el-col :span="12">
                        <label class="sublab">产品类型：</label>{{detail.warehouseProductTypeShow}}
                    </el-col>
                    <el-col :span="24">
                        <label class="sublab">
                            <span class="remarks">
                                <label>备注：</label>
                                <el-input
                                    type="textarea"
                                    v-model="detail.remark"
                                    placeholder="请输入"
                                    disabled
                                    :rows="6"
                                    maxlength="300"
                                    show-word-limit
                                    size="small">
                                </el-input>
                            </span>
                        </label>
                    </el-col>
                </el-row>
            </div>
            <div class="submitbtn">
                <el-button @click="goBack" size="small">返 回</el-button>
                <el-button type="primary" @click="goEdit" size="small">编 辑</el-button>
            </div>
        </div>
        <div v-if="tabType == 'infoList'">
            <div class="searchinfo">
                <el-form :inline="true" align="left">
                    <el-form-item>
                        <el-input v-model="params.productName" placeholder="产品名称" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="params.productBrand" placeholder="产品批次" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select
                            v-model="params.productGrade"
                            placeholder="等级"
                            size="small"
                            class="select">
                            <el-option
                                v-for="item in dictionaries.ms_product_grade"
                                :key="item.dictValue"
                                :label="item.dictLabel"
                                :value="item.dictValue"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div class="searchbtn">
                    <el-button type="primary" @click="submitSearch" size="small">查询</el-button>
                    <el-button @click="resetFilter" size="small">重置</el-button>
                </div>
            </div>
            <div class="listinfo">
                <div class="tablestyle">
                    <el-table :data="listData" border size="medium" style="width: 100%">
                        <el-table-column prop="productCode" label="产品存货" :show-overflow-tooltip="true" min-width="120px" align="center"></el-table-column>
                        <el-table-column prop="productName" label="名称" :show-overflow-tooltip="true" min-width="140px" align="center"></el-table-column>
                        <el-table-column v-if="businessType==0" prop="windThick" label="厚度" :show-overflow-tooltip="true" min-width="80px" align="center"></el-table-column>
                        <el-table-column v-if="businessType==1" prop="productModel" label="型号" :show-overflow-tooltip="true" min-width="80px" align="center"></el-table-column>
                        <el-table-column prop="productBrand" label="批次" :show-overflow-tooltip="true" min-width="140px" align="center"></el-table-column>
                        <el-table-column prop="productGrade" label="等级" :show-overflow-tooltip="true" min-width="80px" align="center"></el-table-column>
                        <el-table-column prop="quantity" label="库存数量" :show-overflow-tooltip="true" min-width="100px" align="center">
                            <template slot-scope="scope">
                                {{scope.row.quantity}}{{scope.row.supUnit}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="weight" label="库存重量" :show-overflow-tooltip="true" min-width="120px" align="center">
                            <template slot-scope="scope">
                                {{scope.row.weight}}{{scope.row.mainUnit}}
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
// import crumbsMap from "@/utils/crumbsMap";
import {
    listDictData,
    productDetail,
    productDetailList,
} from '@/api/ms'
import wmsPagination from "@/components/wmsPagination";
export default {
    name: "detail",
    components: {
        wmsPagination,
    },
    data() {
        return{
            userId: sessionStorage.getItem('userId'),
            applyPersonName: sessionStorage.getItem('applyPersonName'),
            tabType: "infoDetail",   // tab
            loading: true,
            businessType: "",   // 0 薄膜，1 切片
            detail: {},
            params: {
                productName: "",   // 产品名称 
                productBrand: "",   // 产品批次
                productGrade: "",   // 等级
                productCode: this.$route.query.productCode,
                pageNum: 1,
                pageSize: 10,
                isPage: true,
            },
            listData: [],
            pageTotal: 0, // 列表总数量
            isCurrentOne: false,
            dictionaries: {},   //字典
        }
    },
    created(){
        this.getDictData()
        if(this.$route.query.type == 1){
            this.tabType = "infoList"
        }
        if(this.$route.query.productCode){
            this.businessType = this.$route.query.businessType
            this.getDetail();
            this.getListData();
        }
    },
    methods: {
        // 获取字典列表
        async getDictData () {
            const { data } = await listDictData('ms_product_grade')
            this.dictionaries = data
        },
        // 获取详情
        getDetail () {
            productDetail({
                productCode: this.$route.query.productCode,
            }).then(res => {
                if (res.code == 0) {
                    this.detail = res.data
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 编辑
        goEdit(){
            this.$router.push({ 
                path: "/main/basicData/product/edit", 
                query: {
                    businessType: this.businessType,
                    productCode: this.detail.productCode,
                }
            });
        },
        // 取消
        goBack(){
            window.history.go(-1);
        },

        // 列表数据
        getListData () {
            productDetailList(this.params).then(res => {
                if (res.code == 0) {
                    this.listData = res.rows;
                    this.pageTotal = res.total;
                    this.loading = false
                }else{
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
                productName: "",   // 产品名称 
                productBrand: "",   // 产品批次
                productGrade: "",   // 等级
                isPage: true,
                pageNum: 1,
                pageSize: 10
            }
            this.submitSearch();
        },
        // 分页
        pageFunc (data) {
            this.isCurrentOne = false;
            this.params.pageNum = data.pageNum
            this.params.pageSize = data.pageSize
            this.getListData();
        }
    },
}
</script>

<style lang="less" scoped>
.main{
    background: #fff;
    padding: 10px 6px 30px 42px;
    text-align: left;
    min-height: 800px;
    .tabs{
        padding-right: 35px;
    }
    .title{
        font-size: 16px;
        color: #333;
        line-height: 16px;
        margin: 40px 0px 25px 0px;
        padding-left: 6px;
        border: 0px;
        border-left: 2px solid #1890ff;
    }
    .item{
        font-size: 14px;
        color: #333;
        line-height: 30px;
        padding-bottom: 40px;
        .sublab{
            color: #666;   
            // display: flex;      
            .remarks{
                // white-space:break-spaces;
                // display: inline-block;
                display: flex;
            }
            label{
                min-width: 42px;
            }
            // /deep/ .el-textarea{
            //     width: auto;
            // }
            /deep/  .el-textarea.is-disabled .el-textarea__inner{
                color: #333;
                border-color: #fff;
                background-color: #fff;
                padding: 5px 0;
                resize: none;
            }
        }
        .status{
                width: 6px;
                height: 6px;
                display: inline-block;
                border: 0px;
                border-radius: 6px;
                margin: 0px 2px 2px 0px;
        }
        .s1{
            background: #f5222d;    
        }
        .s2{
            background: #1890ff;
        }
        .s3{
            background: #52c41a;
        }
        .subspan1{
            color: #ec2234;
        }
        .subspan2{
            color: #999;
        }
    }
    .formitem{
        width: calc(~'50% - 35px');
        display: inline-block;
        margin-bottom: 22px;
        margin-right: 35px;
        .bombor{
            border: 0px;
            border-bottom: 1px solid #e6e6e6;
            .select{
                width: 100%;
            }
            .unit{
                font-size: 12px;
                color: #999;
                position: absolute;
                margin-left: -16px;
            }
            .unit2{
                font-size: 12px;
                color: #999;
                position: absolute;
                margin-left: -24px;
            }
            .unit3{
                font-size: 12px;
                color: #999;
                position: absolute;
                margin-left: -34px;
            }
        }
        .selecticon{
            /deep/ .el-icon-arrow-up:before{
                content: "";
            }
            .searchicon{
                color: #c0c4cc;
                position: absolute;
                top: 16px;
                margin-left: -24px;
            }
        }
        .specunit{
            line-height: 40px;
            width: 46%;
        }
        .rate{
            font-size: 12px;
            color: #666;
            line-height: 22px;
            position: absolute;
            span{
                color: #1890ff;
            }
        }
        .required-icon{
            color: #F56C6C;
        }
        /deep/  .el-input__inner{
                border-color: #fff;
                padding: 0 2px 0 2px;
            }
        /deep/  .el-input__inner:hover{
                    border-color: #fff;
                }
        /deep/  .el-input__inner:focus{
                    border-color: #fff;
                }
        /deep/  .el-input.is-disabled .el-input__inner{
                    border-color: #fff;
                    background-color: #fff;
                }
        /deep/  .el-textarea__inner{
                    padding: 6px 6px;
                }
         /deep/  .el-textarea__inner:focus{
                    border-color: #c0c4cc;
                }
        /deep/  .el-textarea__inner:hover{
                    border-color: #c0c4cc;
                }
        /deep/  .el-textarea .el-input__count{
                    right: 20px;
                }      
        /deep/  .el-select .el-input .el-input__inner{
                    border-color: #fff;
                }
        /deep/  .el-select .el-input .el-input__inner:hover{
                    border-color: #fff;
                }
        /deep/  .el-select .el-input .el-input__inner:focus{
                    border-color: #fff;
                }
        /deep/  .el-select .el-input.is-focus .el-input__inner{
                    border-color: #fff;
                }
    }
    .special{
        width: calc(100% - 35px);
    }
    .tablestyle{
        .del {
            color: #ec2234;
        }
        /deep/ .el-table th{
                    background: #f5f7fa;
                }
    }
    .submitbtn{
        margin-top: 40px;
        text-align: right;
        padding-right: 35px;
    }
    .searchinfo{
        background: #fff;
        padding: 14px 35px 0px 0px;
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
    .listinfo{
        background: #fff;
        padding: 0px 35px 24px 0px;
        min-height: 700px;
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
    }
}
</style>