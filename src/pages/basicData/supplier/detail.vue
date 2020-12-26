<template>
    <div v-loading="loading" class="main">
        <el-tabs v-model="tabType">
            <el-tab-pane label="供应商详情" name="infoDetail"></el-tab-pane>
        </el-tabs>
        <div v-if="tabType == 'infoDetail'">
            <div class="title">主要信息</div>
            <div class="item">
                <el-row>
                    <el-col :span="8">
                        <label class="sublab">供应商编号：</label>{{detail.companyCode}}
                    </el-col>
                    <el-col :span="16">
                        <label class="sublab">供应商名称：</label>{{detail.companyName}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">供应商简称：</label>{{detail.companyAbbr}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">所在区域：</label>{{detail.merchantArea}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">所在行业：</label>{{detail.correspondBusiness}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">法人：</label>{{detail.corporation}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">税号：</label>{{detail.tanuNo}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">数据来源：</label>{{detail.sources}}
                    </el-col>
                    <!-- <el-col :span="8">
                        <label class="sublab">创建：</label>{{detail.createName}} {{detail.createTime}}
                    </el-col>
                    <el-col :span="16">
                        <label class="sublab">最后修改：</label>{{detail.updateName}} {{detail.updateTime}}
                    </el-col> -->
                     <el-col :span="24">
                        <label class="sublab">地址：</label>{{detail.companyAddr}}
                    </el-col>
                </el-row>
            </div>
            <div class="title">供应商账户</div>
            <div class="item">
                <el-row>
                    <el-col :span="8">
                        <label class="sublab">币种：</label>{{detail.currency}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">银行信息：</label>{{detail.bankName}}
                    </el-col>
                    <el-col :span="8">
                        <label class="sublab">SWIFI代码：</label>{{detail.bankCode}}
                    </el-col>
                    <el-col :span="24">
                        <label class="sublab">银行账号：</label>{{detail.bankAccount}}
                    </el-col>
                    <!-- <el-col :span="24">
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
                    </el-col> -->
                </el-row>
            </div>
            <div class="btn">
                <el-button @click="goBack" size="small">返 回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
// import crumbsMap from "@/utils/crumbsMap";
import {
    supplierDetail,
} from '@/api/ms'
export default {
    name: "detail",
    data() {
        return{
            userId: sessionStorage.getItem('userId'),
            tabType: "infoDetail",   // tab
            loading: true,
            detail: {},
        }
    },
    created(){
        if(this.$route.query.companyCode){
            this.getDetail();
        }
    },
    methods: {
        // 获取详情
        getDetail () {
            supplierDetail({
                companyCode: this.$route.query.companyCode,
            }).then(res => {
                if (res.code == 0) {
                    this.detail = res.data
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 返回
        goBack(){
            window.history.go(-1);
        },
    },
}
</script>

<style lang="less" scoped>
.main{
    background: #fff;
    padding: 20px 25px 40px 25px;
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
    
    .btn{
        margin-top: 40px;
        text-align: right;
    }
}
</style>