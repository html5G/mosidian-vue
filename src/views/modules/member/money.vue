<template>
  <div class="money">
    <el-card>
      <div class="money-1">
        <h2>账户余额</h2>
        <el-row :gutter="12">
          <el-col :span="4">
            <div class="money-text">{{ balance }} ·ZTB</div>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain @click="cz = true">立即充值</el-button>
            <el-dialog
              title="充值系统"
              :visible.sync="cz"
              width="70%">
              <!--    支付模块-->
              <!--    v-model="activeName"-->
              <!--    @tab-click="handleClick"-->
              <el-tabs type="card" >
                <el-tab-pane>
                  <span slot="label"><img src="static/img/zfb.png" style="width: 30px;height: 30px"  alt=""/>支付宝</span>
                  <div>
                    <div style="text-align: center">
                      <el-form ref="moneyForm">
                        <P>请输入要充值的金额</P>
                        <el-input v-model="money" placeholder="请输入金额" style="width: 250px"><template slot="append">ZTB</template></el-input>
                        <el-form-item>
                          <el-button type="primary" @click="recharge(money)">立即充值</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane><span slot="label"><img src="static/img/wx.png" style="width: 30px;height: 30px"  alt=""/>微信</span>
                    <div style="text-align: center">
                      <span>敬请期待</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane><span slot="label"><img src="static/img/yl.png" style="width: 30px;height: 30px" />银联</span>
                    <div style="text-align: center">
                      <span>敬请期待</span>
                  </div>
                </el-tab-pane>
                <el-tab-pane><span slot="label">线下支付</span>
                  <div>
                    <div style="text-align: center">
                      <h2>线下付款</h2>
                      <template>
                        <el-table
                          :data="tableData"
                          style="width: 100%;text-align: center" class="el-table-cell">
                          <el-table-column
                            prop="account"
                            label="账户名称11"
                            width="550">
                          </el-table-column>
                          <el-table-column
                            prop="openingBank"
                            label="开户行"
                            width="550" >
                          </el-table-column>
                          <el-table-column
                            prop="YhCid"
                            label="账号">
                          </el-table-column>
                        </el-table>
                      </template>
                    </div>
                    <div>
                      <h3>说明</h3>
                      <p>在转账或汇款后，请您将以下信息，通过邮件发送给ticzuo@mosidian.cn</p>
                      <p>我们将在1-2个工作日内，为您的账号完成充值</p>
                      <ul>
                        <li>汇款信息:单位名称、汇款y银行、汇款账户、汇款金额或直接提供“汇款底单”.</li>
                        <li>账号信息:手机号码</li>
                      </ul>
                      <p>特别提醒请企业客户线下汇款时、尽可能通过“公司y银行账户”h汇款，并确保与开具发票公司名称一致，以便您能更方便地开具发票</p>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-dialog>

          </el-col>
          <el-col :span="4">
            <el-button type="success" plain @click="invoice = true">申请发票</el-button>
            <el-dialog
              title="发票系统"
              :visible.sync="invoice"
              width="30%">
              <span>敬请期待</span>
            </el-dialog>
          </el-col>
        </el-row>
        <div class="moneytext">
          {{ monetary }}
          <div class="text">消费积分</div>
        </div>
      </div>
    </el-card>
    <el-card class="card2">

    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'money',
    activated () {
      this.getMemberInfo()
    },
    data () {
      return {
        balance: '0.00',
        userId: null,
        cz: false,
        money: null,
        monetary: 0,
        invoice: false,
        cardImg: 'static/img/1.1.1.2.png',
        tableData: [{
          account: '莫斯蒂恩网络科技有限公司',
          openingBank: 'xxxxxxxxx',
          YhCid: 'xxxxxxxxxxxxxxxxxxxx'
        }]
      }
    },

    methods: {
      recharge (money) {
        window.location.href = 'http://www.mosidian.com/mosidian/mall/recharge?recharge=' + money + '&userId=' + this.userId
      },
      getMemberInfo () {
        this.$http({
          url: this.$http.adornUrl('/member/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.balance = data.member.balance.toString()
            this.monetary = data.member.monetary
            this.userId = data.member.userId
          } else {
            this.$message.error(data.msg)
          }
        })
      }

    }
  }
</script>

<style scoped>
  li {
    list-style: none;
  }

  li:before {
    content: "";
    width: 6px;
    height: 6px;
    display: inline-block;
    border-radius: 50%;
    background: #4F8EFF;
    vertical-align: middle;
    margin-right: 14px;
  }

  .el-button--medium {
    margin-top: 20px;
  }

  .money-1 {
    border-radius: 10px;
    width: 100%;
  }

  .money-text {
    color: #ff0000;
    font-size: 20px;
    padding-top: 10px;
  }

  .moneytext {
    margin-top: 20px;
    display: flex;
    font-size: 20px;
  }

  .text {
    margin-left: 16rem;
  }

  .card2 {
    margin-top: 30px;
  }
</style>
<style>
  .el-tabs-card .el-table th > .cell {
    text-align: center !important;
  }
</style>
