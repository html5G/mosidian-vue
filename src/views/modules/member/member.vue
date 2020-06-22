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
        <el-button v-if="isAuth('member:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('member:delete')" type="danger" @click="deleteHandle()">批量删除</el-button>
        <!--:disabled="dataListSelections.length <= 0"-->
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
        prop="memberId"
        header-align="center"
        align="center"
        label="会员卡号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="nickname"
        header-align="center"
        align="center"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="真实姓名">
      </el-table-column>
      <el-table-column
        prop="card"
        header-align="center"
        align="center"
        label="身份证号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="gender"
        header-align="center"
        align="center"
        label="性别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gender === 0" size="small" type="danger">女</el-tag>
          <el-tag v-else size="small" type="success">男</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱"
        width="200">
      </el-table-column>
      <el-table-column
        prop="level"
        header-align="center"
        align="center"
        label="等级">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1" size="small" type="danger">Cu</el-tag>
          <el-tag v-if="scope.row.level === 2" size="small" type="danger">Ag</el-tag>
          <el-tag v-if="scope.row.level === 3" size="small" type="danger">Au</el-tag>
          <el-tag v-if="scope.row.level === 4" size="small" type="danger">Pt</el-tag>
          <el-tag v-if="scope.row.level === 5" size="small" type="danger">Zu</el-tag>
          <!--根据男女判断曜黑曜白-->
          <el-tag v-if="scope.row.level === 6 && scope.row.gender === 0" size="small" type="danger">MS-白</el-tag>
          <el-tag v-if="scope.row.level === 6 && scope.row.gender === 1" size="small" type="danger">MS-黑</el-tag>
          <el-tag v-if="scope.row.level === 7" size="small" type="danger">Ti</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="credits"
        header-align="center"
        align="center"
        label="信誉分">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="balance"
        header-align="center"
        align="center"
        label="余额"
        width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.balance === 0">
            <slot>{{scope.row.balance}}·ZTB</slot>
          </el-tag>
          <el-tag v-if="scope.row.balance === 288">
            <slot>{{scope.row.balance}}·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 1218">
            <slot>{{scope.row.balance}}·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 12180">
            <slot>1.218W·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 121800">
            <slot>12.18W·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 1218000">
            <slot>121.8W·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 12180000">
            <slot>1218W·ZTB</slot>
          </el-tag>
          <el-tag v-else-if="scope.row.balance === 1218000000">
            <slot>12.18T·ZTB</slot>
          </el-tag><!--十二亿-->
        </template>
      </el-table-column>
      <el-table-column
        prop="monetary"
        header-align="center"
        align="center"
        label="消费金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="monetary"
        header-align="center"
        align="center"
        label="消费积分"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
        width="100">
      </el-table-column>
      <!--        fixed="right"-->
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
    <!-- 弹窗, 查看 / 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import AddOrUpdate from './member-add-or-update'

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
          value: 'member_id',
          label: '会员卡号'
        }, {
          value: 'mobile',
          label: '手机号'
        }, {
          value: 'nickname',
          label: '昵称'
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
      // 定义导出Excel表格事件
      exportExcel () {
        /* 从表生成工作簿对象 */
        const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* 获取二进制字符串作为输出 */
        const wbout = XLSX.write(wb, {
          bookType: 'xlsx',
          bookSST: true,
          type: 'array'
        })
        try {
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
          url: this.$http.adornUrl('/member/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key,
            'value': this.dataForm.value
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.total = 0
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
            url: this.$http.adornUrl('/member/delete'),
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
