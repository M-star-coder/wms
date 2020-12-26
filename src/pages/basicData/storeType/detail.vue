<template>
    <div v-loading="loading" class="main">
        <el-tabs v-model="tabType">
            <el-tab-pane label="仓库类型详情" name="infoDetail"></el-tab-pane>
        </el-tabs>
        <div v-if="tabType == 'infoDetail'">
            <div class="title">主要信息</div>
            <div class="item">
                <el-row>
                    <el-col :span="12">
                        <label class="sublab">仓库类型编码：</label>{{detail.categoryCode}}
                    </el-col>
                    <el-col :span="12">
                        <label class="sublab">仓库类型名称：</label>{{detail.categoryName}}
                    </el-col>
                    <el-col :span="24">
                        <label class="sublab">权限：</label>
                        <template v-for="(item, index) in detail.authorityNames">
                            <span :key="item">{{item}}{{index!=(detail.authorityNames.length-1)?"、":""}}</span>
                        </template>
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
            <div class="btn">
                <el-button @click="goBack" size="small">返 回</el-button>
                <el-button type="primary" @click="goEdit" size="small">编 辑</el-button>
            </div>
        </div>
    </div>
</template>

<script>
// import crumbsMap from "@/utils/crumbsMap";
import {
    storeTypeDetail,
    allAuthorityList,
} from '@/api/ms'
export default {
    name: "detail",
    data() {
        return{
            userId: sessionStorage.getItem('userId'),
            tabType: "infoDetail",   // tab
            loading: true,
            detail: {},
            authorityDataList: [],   //权限列表
        }
    },
    created(){
        this.getAuthorityList();
        if(this.$route.query.categoryCode){
            this.getDetail();
        }
    },
    methods: {
        // 获取权限列表
        getAuthorityList () {
            allAuthorityList().then(res => {
                if (res.code == 0) {
                    this.authorityDataList = res.data
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 获取详情
        getDetail () {
            storeTypeDetail({
                categoryCode : this.$route.query.categoryCode ,
            }).then(res => {
                if (res.code == 0) {
                    this.detail = res.data
                    this.detail.authorityNames = this.detail.authorityCodeList.map(item => {
                        let authorityNames = "";
                        authorityNames += this.authorityDataList.find(auth => auth.authorityCode==item).authorityName;
                        return authorityNames
                    })
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
        // 编辑
        goEdit(){
            this.$router.push({ 
                path: "/main/basicData/storeType/add", 
                query: {
                    type: 1,
                    categoryCode: this.detail.categoryCode,
                }
            });
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