<template>
  <div>
    <el-row :gutter="20" >
      <el-col :span="24">
        <el-row :gutter="20" class="mgb20">

          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-lx-people grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">5681</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-lx-notice grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">321</div>
                  <div>成交额</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-lx-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1324</div>
                  <div>好评率</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card>
          <el-form ref="form" :model="form" label-width="140px">
            <el-col :span="12">
              <el-form-item label="企业名称：" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="21">
                  <el-form-item label="官网：" prop="website">
                    <el-input v-model="form.website"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2" offset="1">
                  <el-radio-group v-model="form.resource" style="margin-bottom:18px;">
                    <el-radio label="无" style="line-height: 36px;"></el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" style="display: flex;flex-direction: row;align-items: center">
              <el-form-item label="企业规模："></el-form-item>
              <el-radio-group v-model="form.resource" style="margin-bottom:18px;">
                <el-radio label="0-20"></el-radio>
                <el-radio label="20-50"></el-radio>
                <el-radio label="50-100"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-form-item label="法人：" prop="person">
                <el-input v-model="form.person"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="认证理由：" prop="reason">
                <el-input v-model="form.reason"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="提供的服务：" prop="provide">
                <el-input v-model="form.provide"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="display: flex;flex-direction: row;align-items: center">
              <el-form-item label="企业类型："></el-form-item>
              <el-radio-group v-model="form.resource" style="margin-bottom:18px;">
                <el-radio label="企业服务公司"></el-radio>
                <el-radio label="企业物流公司"></el-radio>
              </el-radio-group>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签约时间：">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="width:12px;height:3px;background-color: #000;margin:15px 20px;"></el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="部门：" prop="department">
                <el-input v-model="form.department"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人：" prop="principal">
                <el-input v-model="form.principal"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人身份证号：" prop="id">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职位：" prop="position">
                <el-input v-model="form.position"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人邮箱：" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人电话：" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Schart from 'vue-schart'
  // import bus from '../common/bus'

  export default {
    name: 'dashboard',
    data () {
      return {
        name: localStorage.getItem('ms_username'),
        todoList: [
          {
            title: '618活动大促销',
            status: false
          },
          {
            title: '爆款预售抢先购',
            status: false
          },
          {
            title: '血拼等你来',
            status: false
          },
          {
            title: '定金膨胀超5倍',
            status: false
          },
          {
            title: '抢10亿红包',
            status: true
          },
          {
            title: '提前发车预售付款',
            status: true
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
        form: {
          name: '',
          website: '',
          company: '',
          resource: '',
          person: '',
          reason: '',
          provide: '',
          department: '',
          principal: '',
          id: '',
          position: '',
          email: '',
          phone: '',

          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          desc: ''
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
</style>
