<template>
    <div v-loading="loading">
        <div class="addinfo">
            <div class="title">主要信息</div>
            <el-form :model="addData" ref="addData" label-width="110px" label-position="left">
                <el-form-item v-if="isEdit" prop="categoryCode" class="formitem left">
                    <span slot="label"><label class="required-icon">*</label> 仓库类型编码</span>
                    <div class="bombor">
                        <el-input
                            v-model="addData.categoryCode"
                            placeholder="请输入"
                            disabled
                            size="small">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="categoryName" class="formitem left">
                    <span slot="label"><label class="required-icon">*</label> 仓库类型名称</span>
                    <div class="bombor">
                        <el-input
                            v-model="addData.categoryName"
                            placeholder="请输入"
                            data-checked
                            :data-checkedValue="addData.categoryName"
                            data-checkedTitle="请输入仓库类型名称"
                            maxlength="30"
                            size="small">
                        </el-input>
                    </div>
                </el-form-item>
                <el-form-item prop="authorityCodeList" class="formitem special">
                    <span slot="label"><label class="required-icon">*</label> 权限</span>
                    <el-checkbox-group 
                        v-model="addData.authorityCodeList"
                        data-checked
                        :data-checkedValue="addData.authorityCodeList"
                        data-checkedTitle="请选择权限"
                    >
                        <el-checkbox 
                            v-for="item in authorityDataList" 
                            :key="item.authorityCode" 
                            :label="item.authorityCode"
                        >{{item.authorityName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item prop="remark" class="formitem special">
                    <span slot="label"> 备注</span>
                    <el-input
                        type="textarea"
                        v-model="addData.remark"
                        placeholder="请输入"
                        :rows="3"
                        maxlength="300"
                        show-word-limit
                        size="small">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="submitbtn">
                <el-button size="small" @click="cancel">取 消</el-button>
                <el-button type="primary" @click="saveAdd" size="small">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {
    storeTypeAdd,
    storeTypeDetail,
    storeTypeEdit,
    allAuthorityList,
} from '@/api/ms'
import { fromChecked } from '@/utils/fromChecked'
// import crumbsMap from "@/utils/crumbsMap";
export default {
    name: 'add',
    data () {
        return {
            userId: sessionStorage.getItem('userId'),
            applyPersonName: sessionStorage.getItem('applyPersonName'),
            loading: true,
            isEdit: true,
            addData: {
                categoryName: "",   // 类型名称
                authorityCodeList: [],   // 权限
                remark: "",   // 备注
            },
            authorityDataList: [],   //权限列表
        }
    },
    created () {
        this.getAuthorityList();
        // type 0：新增 1：编辑
        if (this.$route.query.type == 1) {
            this.getDetail()
        }else{
            this.loading = false
            this.isEdit = false
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
                    this.addData = res.data
                    this.loading = false
                } else {
                    this.$message.error(res.msg)
                }
            })
        },

        // 保存、提交
        saveAdd () {
            // type 0：新增 1：编辑
            let type = this.$route.query.type;
            if (fromChecked()) {
                this.loading = true
                this.addData = type==0?{
                    ...this.addData,
                    createBy: this.userId,
                    createName: this.applyPersonName,
                }:{
                    ...this.addData,
                    updateBy: this.userId,
                    updateName: this.applyPersonName,
                }
                let saveFun = type==0?storeTypeAdd(this.addData):storeTypeEdit(this.addData);
                saveFun.then(res => {
                    this.loading = false
                    if (res.code == 0) {
                        this.$message.success(type==0?"新增成功":"编辑成功")
                        this.$router.push({ path: '/main/basicData/storeType/list' })
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        //取消
        cancel(){
            window.history.go(-1);
        },

    }
}
</script>

<style lang="less" scoped>
.addinfo{
    background: #fff;
    padding: 10px 6px 30px 42px;
    text-align: left;
    min-height: 800px;
    .title{
        font-size: 16px;
        line-height: 16px;
        margin: 30px 0px 20px 0px;
        padding-left: 6px;
        border: 0px;
        border-left: 2px solid #1890ff;
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

    .btnadd {
        position: absolute;
        right: 35px;
        margin-top: 14px;
        z-index: 1;
    }
    .submitbtn{
        margin-top: 40px;
        text-align: right;
        padding-right: 35px;
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
.pagebg{
    text-align: center;
}
.iconclose{
    position: absolute;
    right: 40px;
    top: 22px;
    cursor: pointer;
}
.search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0px;
    .input{
        width: 160%;
    }
    /deep/ .el-form-item{
        margin-bottom: 0px;
    }
}
.hr{
    border: 0px;
    border-bottom: 1px solid #f1f1f1;
    margin: 30px 0px 20px 0px;
}
.footer{
    display: flex;
    justify-content: space-between;
    .selectnum{
        line-height: 32px;
        color: #666;
    }
}
/deep/ .el-dialog__header{
            padding: 20px 40px 0px 40px;
        }
/deep/  .el-dialog__title{
            line-height: 24px;
            font-size: 16px;
            color: #333;
            display: block;
            border-bottom: 1px solid #eee;
            padding-bottom: 16px;
            text-align: left;
        }
/deep/  .el-dialog__body{
            padding: 0px 40px 20px 40px;
        }
</style>
