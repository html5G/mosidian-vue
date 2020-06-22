<template>
  <div class="mod-config">
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="orderNo"
        header-align="center"
        align="center"
        label="订单编号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="下单时间"
        width="250">>
      </el-table-column>
      <el-table-column
        prop="payment"
        header-align="center"
        align="center"
        label="实际付款金额"
        width="150">
      </el-table-column>
      <el-table-column
        prop="paymentType"
        header-align="center"
        align="center"
        label="支付类型"
        width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.paymentType === 1" size="small">支付宝</el-tag>
          <el-tag v-else size="small">在线支付</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="postage"
        header-align="center"
        align="center"
        label="运费"
        width="150">
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="交易完成时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="订单状态"
        width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">已取消</el-tag>
          <el-tag v-else-if="scope.row.status === 10" type="danger" size="small">未付款</el-tag>
          <el-tag v-else-if="scope.row.status === 20" size="small">已付款</el-tag>
          <el-tag v-else size="small">已发货</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row)">查看详情</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.orderNo.toString())">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <addOrupdate v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></addOrupdate>
  </div>
</template>

<script>
  import addOrupdate from './viewDetails'

  export default {
    data () {
      return {
        ckxq: false,
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        dataList: []
      }
    },
    components: {
      addOrupdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 0
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/mall/orders'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data.list
            console.log(this.dataList)
            this.totalPage = data.data.total
          } else {
            this.dataList = []
            this.totalPage = 2
          }
          this.dataListLoading = false
        })
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      addOrUpdateHandle (data) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(data)
        })
      },
      deleteHandle (id) {
        // var ids = id ? [id] : this.dataListSelections.map(item => {
        //   return item.orderNo
        // })
        this.$confirm(`确定对[id=${id}]进行['删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/mall/orders/' + id),
            method: 'PUT'
            // data: this.$http.adornData({
            //   'orderNo': this.data.orderNo
            // })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
