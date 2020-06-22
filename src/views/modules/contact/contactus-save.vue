<template>
  <div class="feedback">
    <!-- 头文件 -->
    <div class="feedbackText">
      <div class="feedbackText-1">
        <h2>联系我们</h2>
        <h6>如果你是一个有实力、有品牌梦想的公司，请与我们联系！</h6>
      </div>
    </div>

    <div class="feedbackInput">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="inputname">
          <!-- 输入名字 -->
          <div class="inputname-1">
            <el-form-item prop="name">
              <el-input style="width: 402px;" v-model="ruleForm.name" placeholder="请输入你的名字"></el-input>
            </el-form-item>
          </div>

          <!-- 邮箱地址 -->
          <div class="inputname-1 inputname-2">
            <el-form-item prop="email">
              <el-input style="width: 402px;" v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
            </el-form-item>
          </div>
        </div>

        <div class="inputmt">
          <!-- <div class="inputm"></div> -->
          <div class="inputmobile">
            <!-- 输入手机号 -->
            <el-form-item prop="phone">
              <el-input style="width: 600px" v-model="ruleForm.phone" placeholder="请输入你的手机号"></el-input>
            </el-form-item>

            <!-- 选择菜单 -->
            <div class="inputmobileselect">
              <el-select
                style="width: 206px"
                v-model="ruleForm.clients"
                slot="prepend"
                placeholder="请选择">
                <el-option label="A客户端" value="1"></el-option>
                <el-option label="B客户端" value="2"></el-option>
                <el-option label="C客户端" value="3"></el-option>
              </el-select>
            </div>
          </div>
          <!-- 遇到的问题 -->
          <div>
            <el-form-item prop="textarea">
              <el-input class="inputtext" type="textarea" v-model="ruleForm.feedbackMessage" placeholder="遇到的问题"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 提交表单数据 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        seen: false,
        ruleForm: {
          name: '',
          email: '',
          phone: '',
          feedbackMessage: '',
          clients: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            {
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个名字长度',
              trigger: 'blur'
            }
          ],
          phone: [
            { required: true, message: '请输入你的手机号', trigger: 'blur' },
            { size: 11, message: '长度在11位手机号 ', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          feedbackMessage: [
            { required: true, message: '请输入你的问题', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (ruleForm) {
        const that = this
        that.$refs[ruleForm].validate(valid => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/contact/save`),
              method: 'post',
              data: this.$http.adornData({
                'name': this.ruleForm.name,
                'email': this.ruleForm.email,
                'phone': this.ruleForm.phone,
                'feedbackMessage': this.ruleForm.feedbackMessage,
                'clients': this.ruleForm.clients
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      resetForm (ruleForm) {
        this.$refs[ruleForm].resetFields()
      },
      // 判断选择的菜单，路由跳转
      // append (ruleForm) {
      //   var that = this
      //   console.log(that.ruleForm.select)
      //   let select = that.ruleForm.select
      //   if (select == null) {
      //     that.$message('请选择你的菜单')
      //   } else if (select === 1) {
      //     that.$router.push('/HelloWorld1')
      //   } else if (select === 2) {
      //     that.$router.push('/HelloWorld1')
      //   } else if (select === 3) {
      //     that.$router.push('/HelloWorld1')
      //   }
      // },
      onMouseOut () {
        this.seen = true
      }
    }
  }
</script>
<style scoped>
  .show {
    z-index: 99999;
    background-color: red;
  }
  .feedbackText-1 {
    display: flex;
    justify-content: center;
    /* border: 2px solid red; */
    flex-direction: column;
    text-align: center;
  }
  feedbackInput {
    justify-content: center;

  }
  .inputname {
    display: flex;
    justify-content: center;
    /* width: 782px; */
  }
  .inputmobileselect {
    margin-left: 10px;
  }
  .inputmobile {
    display: flex;
    justify-content: center;
  }
  .inputname-2 {
    margin-left: 14px;
  }
  .inputtext {
    text-align:center;
    vertical-align:middle;
    width: 51rem;
  }
  .el-form-item {
    text-align: center;
  }
</style>
