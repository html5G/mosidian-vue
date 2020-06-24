<template>
  <div class="wuliu">
    <el-row >
      <el-col :span="24">
        <el-row :gutter="20"  class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-4">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <!-- <div class="grid-num">2.7W+</div> -->
                  <div class="grid-text" @click="InquiryExpress()">查询快递
                    <i class="el-icon-search"></i>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
<!--          <el-col :span="8">-->
<!--            <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--              <div class="grid-content grid-con-1">-->
<!--                <i class="el-icon-lx-people grid-con-icon"></i>-->
<!--                <div class="grid-cont-right">-->
<!--                  <div class="grid-num">2.3W+</div>-->
<!--                  <div>收件量</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--              <div class="grid-content grid-con-2">-->
<!--                <i class="el-icon-lx-notice grid-con-icon"></i>-->
<!--                <div class="grid-cont-right">-->
<!--                  <div class="grid-num">1.7W+</div>-->
<!--                  <div>运输中</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-card shadow="hover" :body-style="{padding: '0px'}">-->
<!--              <div class="grid-content grid-con-3">-->
<!--                <i class="el-icon-lx-goods grid-con-icon"></i>-->
<!--                <div class="grid-cont-right">-->
<!--                  <div class="grid-num">2.7W+</div>-->
<!--                  <div>已送达</div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-card>-->
<!--          </el-col>-->
        </el-row>
      </el-col>
    </el-row>
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="8">-->
<!--        <el-card shadow="hover" class="daily-sales">-->
<!--          <h1 class="daily-sales-title">每日销量</h1>-->
<!--          <div class="floating-index">-->
<!--            <span>浮动指数</span>-->
<!--          </div>-->
<!--          <h1 class="daily-sales-num">9999</h1>-->
<!--          <div class="daily-sale-ring">-->
<!--            <el-progress type="circle" :percentage="25"></el-progress>-->
<!--          </div>-->
<!--          <div class="daily-sale-box">-->
<!--            <ul class="daily-sale-yesterday">-->
<!--              <li class="daily-sale-li">-->
<!--                <p class="daily-sale-title">今日销量</p>-->
<!--                <span class="daily-sale-num">7948</span>-->
<!--              </li>-->
<!--              <li class="daily-sale-line"></li>-->
<!--              <li class="daily-sale-li">-->
<!--                <p class="daily-sale-title">昨日销量</p>-->
<!--                <span class="daily-sale-num">3858</span>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--      <el-col :span="16">-->
<!--        <el-card shadow="hover" class="mb-20" style="height:261px;">-->
<!--          <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>-->
<!--        </el-card>-->
<!--        <el-card shadow="hover" class="mb-20" style="height:261px;">-->
<!--          <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-dialog title="快递查询" :visible.sync="dialogFormVisibleIE">
      <div class="Wuliu-input">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="WaybillNoButton()"></el-button>
          </el-input>
        </div>
      </div>
      <div></div>
    </el-dialog>
  </div>
</template>

<script>
  import Schart from 'vue-schart'
  // import bus from '../common/bus'

  export default {
    name: 'dashboard',
    data () {
      return {
        dialogFormVisibleIE: false,
        input: '',
        name: localStorage.getItem('ms_username'),
        todoList: [
          {
            title: '感恩回馈不负信赖，低至1元发快递',
            status: false
          },
          {
            title: '千万红包寄递你的热爱',
            status: false
          },
          {
            title: '传递温暖的爱',
            status: false
          },
          {
            title: '代收货款新体验，安心发货更优选',
            status: false
          }
        ],
        data: [
          {
            name: '2018/09/04',
            value: 1083
          },
          {
            name: '2018/09/05',
            value: 941
          },
          {
            name: '2018/09/06',
            value: 1139
          },
          {
            name: '2018/09/07',
            value: 816
          },
          {
            name: '2018/09/08',
            value: 327
          },
          {
            name: '2018/09/09',
            value: 228
          },
          {
            name: '2018/09/10',
            value: 1065
          }
        ],
        options: {
          type: 'bar',
          title: {
            text: '最近一周各类商品快递'
          },
          xRorate: 25,
          labels: ['周一', '周二', '周三', '周四', '周五'],
          datasets: [
            {
              label: '衣服',
              data: [7350, 6479, 9453, 7741, 6994]
            },
            {
              label: '家电',
              data: [1175, 755, 1327, 1104, 799]
            },
            {
              label: '零食',
              data: [3175, 4505, 3027, 2104, 2799]
            },
            {
              label: '日常生活用品',
              data: [1148, 1005, 1337, 1184, 1270]
            }
          ]
        },
        options2: {
          type: 'line',
          title: {
            text: '最近几个月各家快递公司趋势图'
          },
          labels: ['6月', '7月', '8月', '9月', '10月'],
          datasets: [
            {
              label: '顺丰',
              data: [45724545, 27428923, 24786521, 21989362, 34218564]
            },
            {
              label: '京东',
              data: [41629823, 26733214, 22197526, 19776241, 29754413]
            },
            {
              label: '中通',
              data: [39245816, 23862646, 20438174, 16384361, 25793264]
            },
            {
              label: '其他',
              data: [72848955, 48927451, 57293714, 48927436, 68927467]
            }
          ]
        },
        options3: {
          type: 'ring',
          title: {
            text: '最近各家快递公司趋势图'
          },
          labels: ['6月', '7月', '8月', '9月', '10月'],
          datasets: [
            {
              label: '顺丰',
              data: [45724545, 27428923, 24786521, 21989362, 34218564]
            },
            {
              label: '京东',
              data: [41629823, 26733214, 22197526, 19776241, 29754413]
            },
            {
              label: '中通',
              data: [39245816, 23862646, 20438174, 16384361, 25793264]
            },
            {
              label: '其他',
              data: [72848955, 48927451, 57293714, 48927436, 68927467]
            }
          ]
        }
      }
    },
    components: {
      Schart
    },
    computed: {
      role () {
        return this.name === 'admin' ? '普通用户' : '超级管理员'
      }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
      changeDate () {
        const now = new Date().getTime()
        this.data.forEach((item, index) => {
          const date = new Date(now - (6 - index) * 86400000)
          item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
        })
      },
      InquiryExpress () {
        this.dialogFormVisibleIE = true
        // console.log('8888')
      },
      WaybillNoButton () {
        // console.log(this.input)
      }
      // handleListener() {
      //     bus.$on('collapse', this.handleBus);
      //     // 调用renderChart方法对图表进行重新渲染
      //     window.addEventListener('resize', this.renderChart);
      // },
      // handleBus(msg) {
      //     setTimeout(() => {
      //         this.renderChart();
      //     }, 200);
      // },
      // renderChart() {
      //     this.$refs.bar.renderChart();
      //     this.$refs.line.renderChart();
      // }
    }
  }
</script>


<style scoped>
  li {
    list-style: none;
  }
  .el-row {
    margin-bottom: 20px;
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
  }

  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  .grid-num {
    font-size: 30px;
    font-weight: bold;
  }

  .grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
  }

  .grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
  }

  .grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
  }

  .grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
  }

  .grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
  }

  .grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
  }
  .grid-con-4 .grid-con-icon {
    background: rgb(217, 215, 219);
  }
  .grid-text {
    font-size: 20px;
    /* color: red; */
  }
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }
  .mgb20 .el-col-8 {
    width: 25%;
  }
  .daily-vue .el-col-8 {
    width: 29.4%;
  }
  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  .schart {
    width: 100%;
    height: 300px;
  }
  .mb-20 {
    margin-bottom:20px;
  }
  /*今日销量*/
  .daily-sales {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .daily-sales-title {
    font-size: 20px;
    color:#101010;
    font-weight: 700;
  }
  .floating-index {
    width:180px;
    text-align: center;
    line-height: 30px;
    border-radius: 40px;
    border:1px solid #55C7A2;
  }
  .floating-index span {
    font-size: 14px;
    color:#101010;
  }
  .daily-sales {
    position: relative;
    padding-bottom:130px;
    text-align: center;
  }
  .daily-sales-num {
    font-size: 48px;
    color:#101010;
    font-weight: 500;
  }
  .daily-sale-ring {
    padding:20px;
    border-radius: 50%;
    box-shadow:0px 0px 10px #ccc;
  }
  .daily-sale-box {
    position: absolute;
    bottom: 10px;
    left: 15px;
    right: 15px;
    border-radius: 5px;
  }
  .daily-sale-yesterday {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0px 8px 0px;
    box-shadow:0px 0px 10px #ccc;
  }
  .daily-sale-li {
    width: 50%;
  }
  .daily-sale-line {
    width:1px;
    height:20px;
    background-color: #ccc;
  }
  .daily-sale-title {
    font-size: 14px;
    color:#101010;
  }
  .daily-sale-num {
    font-size: 18px;
    color:#4689CD;
  }
</style>

<style>
  .wuliu .el-dialog {
    height: 40% !important;
  }
</style>
