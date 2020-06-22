<template>
  <el-dialog
    title="订单详情"
    :visible.sync="visible"
    width="70%">
    <el-table
      :data="orderItemVoList"
      type="card">
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="currentUnitPrice"
        header-align="center"
        align="center"
        label="实付金额"
        width="250">>
      </el-table-column>
      <el-table-column
        prop="orderNo"
        header-align="center"
        align="center"
        label="订单编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="productId"
        header-align="center"
        align="center"
        label="商品ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="productImage"
        header-align="center"
        align="center"
        label="商品图片"
        width="150">
      </el-table-column>
      <el-table-column
        prop="productName"
        header-align="center"
        align="center"
        label="商品名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="quantity"
        header-align="center"
        align="center"
        label="商品数量"
        width="150">
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        header-align="center"
        align="center"
        label="商品总价"
        width="150">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    name: 'viewDetails',
    data () {
      return {
        visible: false,
        orderItemVoList: null
      }
    },
    methods: {
      init (data) {
        this.visible = true
        this.orderItemVoList = data.orderItemVoList
      }
    }
  }
</script>

<style scoped>

</style>
