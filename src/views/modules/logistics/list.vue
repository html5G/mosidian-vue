<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-select v-model="dataForm.key" placeholder="请选择" filterable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.value" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('logistics:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('logistics:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
        <!--给按钮绑定事件-->
        <el-button @click="exportExcel()" type="danger">点击导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
      id="out-table">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="enId"
        header-align="center"
        align="center"
        label="会员卡ID"
        width="165">
      </el-table-column>
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="会员账号"
        width="105">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="userId"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="登录ID">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="企业全称">
      </el-table-column>
      <el-table-column
        prop="website"
        header-align="center"
        align="center"
        label="企业官网"
        width="135">
      </el-table-column>
      <el-table-column
        prop="scale"
        header-align="center"
        align="center"
        label="企业规模">
      </el-table-column>
      <el-table-column
        prop="synopsis"
        header-align="center"
        align="center"
        label="企业简介">
      </el-table-column>
      <el-table-column
        prop="corporation"
        header-align="center"
        align="center"
        label="法人">
      </el-table-column>

      <el-table-column
        prop="reason"
        header-align="center"
        align="center"
        label="认证理由"
        width="176">
      </el-table-column>
      <el-table-column
        prop="eserver"
        header-align="center"
        align="center"
        label="提供的服务">
      </el-table-column>

      <!--      <el-table-column-->
      <!--        prop="level"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="等级">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.level === 1" size="small" type="danger">Cu</el-tag>-->
      <!--          <el-tag v-if="scope.row.level === 2" size="small" type="danger">Ag</el-tag>-->
      <!--          <el-tag v-if="scope.row.level === 3" size="small" type="danger">Au</el-tag>-->
      <!--          <el-tag v-if="scope.row.level === 4" size="small" type="danger">Pt</el-tag>-->
      <!--          <el-tag v-if="scope.row.level === 5" size="small" type="danger">Zu</el-tag>-->
      <!--          &lt;!&ndash;根据男女判断曜黑曜白&ndash;&gt;-->
      <!--          <el-tag v-if="scope.row.level === 6 " size="small" type="danger">MS-黑</el-tag>-->
      <!--          <el-tag v-if="scope.row.level === 7" size="small" type="danger">Ti</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="companies"
        header-align="center"
        align="center"
        label="企业类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.companies === '3'" size="small">物流类型</el-tag>
          <el-tag v-if="scope.row.companies === '4'" size="small">企业类型</el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="audit"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="状态">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag size="small">正常</el-tag>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="balance"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="余额"-->
      <!--        width="100">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-tag v-if="scope.row.balance === 288"><slot>{{scope.row.balance}}·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 1218"><slot>{{scope.row.balance}}·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 12180"><slot>1.218W·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 121800"><slot>12.18W·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 1218000"><slot>121.8W·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 12180000"><slot>1218W·ZTB</slot></el-tag>-->
      <!--          <el-tag v-else-if="scope.row.balance === 1218000000"><slot>12.18T·ZTB</slot></el-tag>&lt;!&ndash;十二亿&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="monetary"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="消费金额"-->
      <!--        width="100">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="monetary"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="消费积分"-->
      <!--        width="100">-->
      <!--      </el-table-column>-->

      <el-table-column
        prop="headName"
        header-align="center"
        align="center"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="sector"
        header-align="center"
        align="center"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="eposition"
        header-align="center"
        align="center"
        label="职位">
      </el-table-column>
      <el-table-column
        prop="headCard"
        header-align="center"
        align="center"
        label="负责人身份证号"
        width="173">
      </el-table-column>
      <el-table-column
        prop="emobile"
        header-align="center"
        align="center"
        label="负责人电话"
        width="110">
      </el-table-column>
      <el-table-column
        prop="eemail"
        header-align="center"
        align="center"
        label="负责人邮箱"
        width="200">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="modifier"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="审核人">-->
      <!--      </el-table-column>-->

      <el-table-column
        prop="enlicenseId"
        header-align="center"
        align="center"
        label="统一社会信用代码"
        width="175">
      </el-table-column>
      <el-table-column
        prop="audit"
        header-align="center"
        align="center"
        label="审核状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.audit === 0" size="small" type="danger">未通过</el-tag>
          <el-tag v-else size="small">已通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="600"
        header-align="center"
        align="center"
        label="信誉分">
        <template slot-scope="scope">
          <el-tag><slot>600</slot></el-tag>
        </template>
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="domicile"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="注册地址"-->
      <!--        width="147">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="enlicense"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="营业执照">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间"
        width="175">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.userId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.userId)">删除</el-button>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './logistics-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: '',
          value: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        options: [{
          value: 'name',
          label: '企业全称'
        }, {
          value: 'enId',
          label: '会员卡号'
        }, {
          value: 'headCard',
          label: '身份证'
        }]
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      exportExcel () {
        /* 从表生成工作簿对象 */
        // eslint-disable-next-line no-undef
        const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* 获取二进制字符串作为输出 */
        // eslint-disable-next-line no-undef
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
          // eslint-disable-next-line no-undef
          FileSaver.saveAs(
            new Blob([wbout], {type: 'application/octet-stream'}),
            '报表.xlsx'
          )
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/logistics/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'value': this.dataForm.value,
            'flag': 3
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.userId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/logistics/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
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
