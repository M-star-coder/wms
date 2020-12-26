<template>
    <div>
        <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="pageSizes"
            :page-size="pageData.pageSize"
            :total="pageTotal"
            :current-page.sync="currentPage"
            @current-change="current"
            @size-change="sizeTotal"
            @prev-click="prev"
            @next-click="next"
            background
            class="pagination">
        </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'wmsPagination',
  props: ['pageTotal', 'isCurrentOne'],
  data () {
    return {
      pageSizes: [10, 20, 30, 40],
      currentPage: 1,
      pageData: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  watch: {
      isCurrentOne: {
          handler: function(newVal, oldVal){
              if(newVal){
                  this.currentPage = 1;
              }
          },
          deep: true
      }
  },
  methods: {
    // 选择某一页
    current () {
      this.pageData.pageNum = this.currentPage
      this.$emit('pageFunc', this.pageData)
    },
    // 每页几条数据
    sizeTotal (val) {
      this.pageData.pageSize = val
      this.$emit('pageFunc', this.pageData)
    },
    // 上一页
    prev () {
      this.pageData.pageNum = this.pageData.pageNum - 1
      this.$emit('pageFunc', this.pageData)
    },
    // 下一页
    next () {
      this.pageData.pageNum = this.pageData.pageNum + 1
      this.$emit('pageFunc', this.pageData)
    }
  }
}

</script>

<style lang="less" scoped>
.pagination{
    margin: 20px 0px 10px 0px;
}
</style>
