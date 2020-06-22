<template>
  <div class="mod-demo-echarts mod-home-vue">

    <el-row :gutter="20">
      <template v-if="flag === 1 || flag === '1'">
        <el-col :span="24">
          <el-card>
            <div id="J_chartLineBox" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card>
            <div id="J_chartBarBox" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div id="J_chartPieBox" class="chart-box"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <div id="J_chartScatterBox" class="chart-box"></div>
          </el-card>
        </el-col>
      </template>
      <template v-else-if="flag === 2 || flag === '2'">
<!--        @tab-click="handleClick"-->
        <el-tabs v-model="activeName">
          <el-tab-pane label="财富榜" name="second">
            <h2 style="text-align: center">财富榜</h2>
            <el-table :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
              <el-table-column
                prop="moneyid"
                header-align="center"
                align="center"
                label="排名"
                width="150"
                id="index"
              ></el-table-column>
              <el-table-column prop="nickname" header-align="center" align="center" label="昵称"></el-table-column>
              <el-table-column prop="monetary" header-align="center" align="center" label="财富榜"></el-table-column>
            </el-table>
            <el-pagination
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="我的财富" name="first">
            <h3 style="text-align: center">我的财富</h3>
            <el-table :data="mydata" border style="width: 100%;">
              <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
              <el-table-column
                prop="moneyid"
                header-align="center"
                align="center"
                label="排名"
                width="150"
              ></el-table-column>
              <el-table-column prop="nickname" header-align="center" align="center" label="昵称"></el-table-column>
              <el-table-column prop="monetary" header-align="center" align="center" label="财富榜"></el-table-column>
            </el-table>
            {{form.nickname}}{{form.monetary}}{{form.moneyid}}
            <el-pagination
              @size-change="sizeChangeHandle"
              @current-change="currentChangeHandle"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pageSize"
              :total="totalPage"
              layout="total, sizes, prev, pager, next, jumper"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="25%"
      :before-close="handleClose">
      <span>尊敬的用户，您好！<br>您的账户尚未激活, 是否选择立即激活?</span>
      <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="active_member()">立即激活</el-button>
              </span>
    </el-dialog>
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        dialogVisible: false,
        chartLine: null,
        activeName: 'second',
        chartBar: null,
        chartPie: null,
        chartScatter: null,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        mydata: [],
        form: {
          moneyid: '',
          nickname: '',
          monetary: ''
        }
      }
    },
    mounted () {
      this.initChartLine()
      this.initChartBar()
      this.initChartPie()
      this.initChartScatter()
    },
    activated () {
      this.getMemberInfo()
      this.getDataList()
      this.getmoneybyid()
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartLine) {
        this.chartLine.resize()
      }
      if (this.chartBar) {
        this.chartBar.resize()
      }
      if (this.chartPie) {
        this.chartPie.resize()
      }
      if (this.chartScatter) {
        this.chartScatter.resize()
      }
    },
    methods: {
      // 折线图
      initChartLine () {
        var option = {
          'title': {
            'text': '发展趋势折线图'
          },
          'tooltip': {
            'trigger': 'axis'
          },
          'legend': {
            'data': [ '线下营销', '视频广告', '直接访问', '互联网营销' ]
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'category',
            'boundaryGap': false,
            'data': [ '2000', '2005', '2008', '2010', '2015', '2019', '2020' ]
          },
          'yAxis': {
            'type': 'value'
          },
          'series': [
            {
              'name': '线下营销',
              'type': 'line',
              'stack': '总量',
              'data': [ 120, 132, 101, 134, 90, 230, 210 ]
            },
            {
              'name': '视频广告',
              'type': 'line',
              'stack': '总量',
              'data': [ 220, 182, 191, 234, 290, 330, 310 ]
            },
            {
              'name': '直接访问',
              'type': 'line',
              'stack': '总量',
              'data': [ 320, 332, 301, 334, 390, 330, 320 ]
            },
            {
              'name': '互联网营销',
              'type': 'line',
              'stack': '总量',
              'data': [ 0, 127, 549, 934, 1290, 1330, 1420 ]
            }
          ]
        }
        this.chartLine = echarts.init(document.getElementById('J_chartLineBox'))
        this.chartLine.setOption(option)
        window.addEventListener('resize', () => {
          this.chartLine.resize()
        })
      },
      // 柱状图
      initChartBar () {
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '广告',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '广告',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '广告',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  normal: {
                    type: 'dashed'
                  }
                },
                data: [
                  [{ type: 'min' }, { type: 'max' }]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: '谷歌',
              type: 'bar',
              stack: '搜索引擎',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: '必应',
              type: 'bar',
              stack: '搜索引擎',
              data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
              name: '其他',
              type: 'bar',
              stack: '搜索引擎',
              data: [62, 82, 91, 84, 109, 110, 120]
            }
          ]
        }
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
        this.chartBar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      },
      // 饼状图
      initChartPie () {
        var option = {
          backgroundColor: '#2c343c',
          title: {
            text: '客户来源占比',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#ccc'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 274, name: '联盟广告' },
                { value: 235, name: '视频广告' },
                { value: 400, name: '搜索引擎' }
              ].sort(function (a, b) { return a.value - b.value }),
              roseType: 'radius',
              label: {
                normal: {
                  textStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20
                }
              },
              itemStyle: {
                normal: {
                  color: '#c23531',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200
              }
            }
          ]
        }
        this.chartPie = echarts.init(document.getElementById('J_chartPieBox'))
        this.chartPie.setOption(option)
        window.addEventListener('resize', () => {
          this.chartPie.resize()
        })
      },
      // 散点图
      initChartScatter () {
        var option = {
          backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
            { offset: 0, color: '#f7f8fa' },
            { offset: 1, color: '#cdd0d5' }
          ]),
          title: {
            text: '物流企业 与 服务企业 各个国家入驻情况'
          },
          legend: {
            right: 10,
            data: ['2015', '2020']
          },
          xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            scale: true
          },
          series: [
            {
              name: '2015',
              data: [
                [28604, 77, 17096869, 'Australia', 1990],
                [31163, 77.4, 27662440, 'Canada', 1990],
                [1516, 68, 1154605773, 'China', 1990],
                [13670, 74.7, 10582082, 'Cuba', 1990],
                [28599, 75, 4986705, 'Finland', 1990],
                [29476, 77.1, 56943299, 'France', 1990],
                [31476, 75.4, 78958237, 'Germany', 1990],
                [28666, 78.1, 254830, 'Iceland', 1990],
                [1777, 57.7, 870601776, 'India', 1990],
                [29550, 79.1, 122249285, 'Japan', 1990],
                [2076, 67.9, 20194354, 'North Korea', 1990],
                [12087, 72, 42972254, 'South Korea', 1990],
                [24021, 75.4, 3397534, 'New Zealand', 1990],
                [43296, 76.8, 4240375, 'Norway', 1990],
                [10088, 70.8, 38195258, 'Poland', 1990],
                [19349, 69.6, 147568552, 'Russia', 1990],
                [10670, 67.3, 53994605, 'Turkey', 1990],
                [26424, 75.7, 57110117, 'United Kingdom', 1990],
                [37062, 75.4, 252847810, 'United States', 1990]
              ],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3]
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(120, 36, 50, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                    { offset: 0, color: 'rgb(251, 118, 123)' },
                    { offset: 1, color: 'rgb(204, 46, 72)' }
                  ])
                }
              }
            },
            {
              name: '2020',
              data: [
                [44056, 81.8, 23968973, 'Australia', 2015],
                [43294, 81.7, 35939927, 'Canada', 2015],
                [13334, 76.9, 1376048943, 'China', 2015],
                [21291, 78.5, 11389562, 'Cuba', 2015],
                [38923, 80.8, 5503457, 'Finland', 2015],
                [37599, 81.9, 64395345, 'France', 2015],
                [44053, 81.1, 80688545, 'Germany', 2015],
                [42182, 82.8, 329425, 'Iceland', 2015],
                [5903, 66.8, 1311050527, 'India', 2015],
                [36162, 83.5, 126573481, 'Japan', 2015],
                [1390, 71.4, 25155317, 'North Korea', 2015],
                [34644, 80.7, 50293439, 'South Korea', 2015],
                [34186, 80.6, 4528526, 'New Zealand', 2015],
                [64304, 81.6, 5210967, 'Norway', 2015],
                [24787, 77.3, 38611794, 'Poland', 2015],
                [23038, 73.13, 143456918, 'Russia', 2015],
                [19360, 76.5, 78665830, 'Turkey', 2015],
                [38225, 81.4, 64715810, 'United Kingdom', 2015],
                [53354, 79.1, 321773631, 'United States', 2015]
              ],
              type: 'scatter',
              symbolSize: function (data) {
                return Math.sqrt(data[2]) / 5e2
              },
              label: {
                emphasis: {
                  show: true,
                  formatter: function (param) {
                    return param.data[3]
                  },
                  position: 'top'
                }
              },
              itemStyle: {
                normal: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(25, 100, 150, 0.5)',
                  shadowOffsetY: 5,
                  color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                    { offset: 0, color: 'rgb(129, 227, 238)' },
                    { offset: 1, color: 'rgb(25, 183, 207)' }
                  ])
                }
              }
            }
          ]
        }
        this.chartPie = echarts.init(document.getElementById('J_chartScatterBox'))
        this.chartPie.setOption(option)
        window.addEventListener('resize', () => {
          this.chartPie.resize()
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/member/moneylist'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 2
          }
          this.dataListLoading = false
          const n = document.getElementsByTagName('li')[0]
          n.getElementsByTagName('tr')[0].style.color = 'red'
          n.getElementsByTagName('tr')[1].style.color = 'red'
          n.getElementsByTagName('tr')[2].style.color = 'red'
        })
      },
      getmoneybyid () {
        this.$http({
          url: this.$http.adornUrl('/member/moneybyid'),
          method: 'get',
          params: this.$http.adornParams({
            'userid': this.userid
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.mydata = data.page.list
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 查询账户是否激活
      getMemberInfo () {
        this.$http({
          url: this.$http.adornUrl('/member/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            if (data.member.accountStatus === 0) {
              this.accountDialogVisible = true
              this.dialogVisible = true
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      // 激活账户
      active_member () {
        // window.location.href = 'http://www.mosidian.com/mosidian/mall/activate?userId=' + this.userid
        window.location.href = 'http://localhost:8080/mosidian/mall/activate?userId=' + this.userid
      },
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
      }
    },
    computed: {
      flag: {
        get () {
          if (this.$store.state.user.userFlag === null) {
            return sessionStorage.getItem('userFlag')
          } else {
            return this.$store.state.user.userFlag
          }
        }
      },
      userid: {
        get () {
          return this.$store.state.user.id
        }
      }
    }
  }
</script>

<style lang="scss">
.mod-demo-echarts {
  > .el-alert {
    margin-bottom: 10px;
  }
  > .el-row {
    margin-top: -10px;
    margin-bottom: -10px;
    .el-col {
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }
  .chart-box {
    min-height: 400px;
  }
}
// .el-table {
//   background-color: rgb(12, 1, 1) !important;
// }
// .el-table .el-table--fit .el-table--border .el-table--enable-row-hover .el-table--enable-row-transition .el-table--medium {
//   background-color: rgb(12, 1, 1) !important;
// }
/*.el-table th,*/
/*.el-table tr {*/
/*  background-color: rgb(12, 1, 1);*/
/*}*/
</style>
<!--<style>-->
<!--  .mod-home-vue .el-table th, .mod-home-vue .el-table tr {-->
<!--    background-color: rgba(12, 1, 1, 0.9)-->
<!--  }-->
<!--</style>-->
