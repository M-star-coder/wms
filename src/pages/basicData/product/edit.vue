<template>
    <div v-loading="loading" class="main">
        <!-- <el-tabs v-model="tabType">
            <el-tab-pane label="库区详情" name="infoDetail"></el-tab-pane>
        </el-tabs>
        <div v-if="tabType == 'infoDetail'"> -->
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
                </el-row>
            </div>
            <div class="title">产品属性</div>
            <el-form :model="detail" ref="detail" label-width="110px" label-position="left">
                <el-form-item prop="warehouseShelfLife" class="formitem left">
                    <span slot="label"><label class="required-icon">*</label> 保质期</span>
                    <div class="bombor">
                        <el-input
                            v-model="detail.warehouseShelfLife"
                            placeholder="请输入"
                            data-checked
                            :data-checkedValue="detail.warehouseShelfLife"
                            :data-checkedFloat="detail.warehouseShelfLife"
                            data-checkedTitle="请输入保质期"
                            maxlength="32"
                            size="small">
                        </el-input>
                        <label class="unit3">个月</label>
                    </div>
                </el-form-item>
                <el-form-item prop="warehouseProductType" class="formitem">
                    <span slot="label"><label class="required-icon">*</label> 产品类型</span>
                    <div class="bombor">
                        <el-select
                            v-model="detail.warehouseProductType"
                            size="small"
                            data-checked
                            :data-checkedValue="detail.warehouseProductType"
                            data-checkedTitle="请选择产品类型"
                            class="select">
                            <el-option
                                v-for="item in dictionaries.warehouse_product_type"
                                :key="item.dictValue"
                                :label="item.dictLabel"
                                :value="item.dictValue"
                            ></el-option>
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item prop="remark" class="formitem special">
                    <span slot="label"> 备注</span>
                    <el-input
                        type="textarea"
                        v-model="detail.remark"
                        placeholder="请输入"
                        :rows="3"
                        maxlength="300"
                        show-word-limit
                        size="small">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="submitbtn">
                <el-button @click="goBack" size="small">取 消</el-button>
                <el-button type="primary" @click="edit" size="small">确 认</el-button>
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
// import crumbsMap from "@/utils/crumbsMap";
import {
    listDictData,
    productDetail,
    productEdit,
} from '@/api/ms'
import { fromChecked } from '@/utils/fromChecked'
export default {
    name: "detail",
    data() {
        return{
            userId: sessionStorage.getItem('userId'),
            applyPersonName: sessionStorage.getItem('applyPersonName'),
            tabType: "infoDetail",   // tab
            loading: true,
            businessType: "",   // 0 薄膜，1 切片
            detail: {
                warehouseShelfLife: "",   // 保质期
                warehouseProductType: "",   // 产品类型
                remark: "",   // 备注
            },
            dictionaries: {},   //字典
        }
    },
    created(){
        this.getDictData()
        if(this.$route.query.productCode){
            this.businessType = this.$route.query.businessType
            this.getDetail();
        }
    },
    methods: {
        // 获取字典列表
        async getDictData () {
            const { data } = await listDictData('warehouse_product_type')
            this.dictionaries = data
        },
        // 获取详情
        getDetail () {
            productDetail({
                productCode: this.$route.query.productCode,
            }).then(res => {
                if (res.code == 0) {
                    this.detail = res.data
                    this.detail.warehouseProductType = res.data.warehouseProductType.toString()
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 确认
        edit(){
            if (fromChecked()) {
                this.loading = true
                this.detail = {
                    ...this.detail,
                    productCode: this.$route.query.productCode,
                    updateBy: this.userId,
                    updateName: this.applyPersonName,
                }
                let saveFun = productEdit(this.detail);
                saveFun.then(res => {
                    this.loading = false
                    if (res.code == 0) {
                        this.$message.success("编辑成功")
                        this.$router.push({ path: '/main/basicData/product/list' })
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        // 取消
        goBack(){
            window.history.go(-1);
        },
    },
}
</script>

<style lang="less" scoped>
.main{
    background: #fff;
    padding: 10px 6px 30px 42px;
    text-align: left;
    min-height: 800px;
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
    .steps{
        margin-left: 100px;
        .steptime{
            margin: 0px 0px -36px -100px;
            .lab1{
                font-size: 14px;
                line-height: 20px;
            }
            .lab2{
                font-size: 12px;
                color: #999;
            }
        }
        /deep/  .el-step__title{
                    font-size: 12px;
                }
        /deep/  .el-step__title.is-wait{
                    color: #666;
                }
        /deep/  .el-step__description{
                    width: 68%;
                    background: #f7f7f7;
                    padding: 0px 8px;
                }
        /deep/  .el-step__description.is-wait{
                    color: #666;
                    line-height: 24px;
                }
        /deep/  .el-step__icon{
                    width: 9px;
                    height: 9px;
                }       
        /deep/  .el-step__icon-inner{
                    display: none;
                }
        /deep/  .el-step__icon.is-text{
                    border: 1px solid;
                }
        /deep/  .el-step.is-vertical .el-step__title{
                    line-height: 20px;
                }
        /deep/  .el-step.is-vertical .el-step__line{
                    width: 1px;
                    left: 4px;
                    margin-top: 6px;
                }
    }
    
    .submitbtn{
        margin-top: 40px;
        text-align: right;
        padding-right: 35px;
    }
}
</style>