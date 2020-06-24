<template>
  <div>
    <div class="member-info-carousel">
      <el-carousel :interval="2000" :autoplay="true" :loop="true" indicator-position="none" arrow="hover" type="card">
        <!--        <el-carousel-item  v-for="(item,index) in msg2" :key="index">-->
        <!--          <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"-->
        <!--               class="member-info-carousel-img"/>-->
        <!--        </el-carousel-item>-->
        <!-- 获取到A端 -->
             
        <div v-if="flagY === 2 || flagY === '2'">
                  
          <el-carousel-item v-for="(item,index) in A"  :key="index">
                      <img v-bind:src="item.src"  @mouseleave="leave(index)"  @mouseenter="couten(index)"
                                          class="member-info-carousel-img"/>
                    
          </el-carousel-item>
                
        </div>
                <!-- 获取到B端 -->
                
        <div v-else-if="flagY === 3 || flagY === '3'">
                  
          <el-carousel-item v-for="(item,index) in B"  :key="index">
                      <img :src="item.src"  @mouseleave="leave(index)"  @mouseenter="couten(index)"
                                          class="member-info-carousel-img"/>
                    
          </el-carousel-item>
                  
        </div>
                <!-- 获取到C端 -->
                
        <div v-else-if="flagY === 4 || flagY === '4'">
                  
          <el-carousel-item v-for='(item,index) in C' :key="index">
                  <img v-bind:src="item.src"  @mouseleave="leave(index)"  @mouseenter="couten(index)"
                       class="member-info-carousel-img"/>
          </el-carousel-item>
                  
        </div>

                <!-- 获取不到flagY null -->
                
        <div v-else>
                  
          <el-carousel-item v-for="(item,index) in msg2"  :key="index">
                      <img v-bind:src="item.src"  @mouseleave="leave(index)"  @mouseenter="couten(index)"
                                          class="member-info-carousel-img"/>
                    
          </el-carousel-item>
                  
        </div>
        <div class="button" id="button" style="display: none">
          <!--         <el-button type="success" @click="open()" plain>充值</el-button>-->
        </div>
      </el-carousel>
    </div>
    <el-form :model="form" ref="dataForm" label-width="80px">
      <el-row :gutter="20" style="margin: 40px 0 10px 0;">
        <el-col :span="24">
          <el-row class="member-info-model">
            <el-col :span="8" :offset="4" style="width: auto;margin-left: inherit">
              <div class="member-information">
                <template v-if="flag === 1 || flag === '1'">
                  <img class="avatar" src="static/img/1.png">{{userName}}
                </template>
                <template v-else>
                  <img class="avatar" :src="dataForm.avatar"/>
                  <el-button style="margin-top: 20px" class="switch-button" type="success" plain @click="xgtx = true">
                    修改头像
                  </el-button>
                  <div class="member-information">
                    <el-dialog
                      title="修改头像"
                      :visible.sync="xgtx"
                      width="30%">
                      <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                               label-width="80px">
                        <el-form-item label="上传头像">
                          <el-upload
                            enctype="multipart/form-data"
                            class="avatar-uploader"
                            action="http://www.mosidian.com/mosidian/api/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                      </el-form>
                      <span slot="footer" class="dialog-footer">
                    <el-button @click="xgtx = false">取消</el-button>
                    <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
                  </span>
                    </el-dialog>
                  </div>
                </template>
              </div>
            </el-col>
<!--            <el-col :span="8" :offset-right="4">-->
<!--              <div>-->
<!--                <div style="text-align:center;margin-bottom: 15px; position:relative;">-->
<!--                  <img class="member-info-card-img" :src="cardImg">-->
<!--                </div>-->
<!--                <div style="display:flex">-->
<!--                  <el-button class="switch-button" type="primary" @click="checkCardImg()" size="medium" plain>-->
<!--                    {{changeShow==true?'正':'反'}}-->
<!--                  </el-button>-->
<!--                  <el-button class="switch-button" type="primary" @click="checkCardImgTo()" size="medium" plain>-->
<!--                    {{changeShow==true?'?':'?'}}-->
<!--                  </el-button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-col>-->
          </el-row>
        </el-col>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="昵称">
                    <el-input v-model="form.nickname" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="信誉分">
                    <el-input v-model="form.credits" disabled></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="form.mobile" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="身份证号">
                    <el-input v-model="form.card" disabled></el-input>
                  </el-form-item>
                </el-col>

                <!--                <el-col :span="8">-->
                <!--                  <el-form-item label="状态" prop="status">-->
                <!--                    <el-input v-model="form.status"></el-input>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->

                <el-col :span="8">
                  <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择状态" disabled>
                      <el-option
                        v-for="item in a_status"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="等级">
                    <el-select v-model="form.level" placeholder="请选择等级" disabled>
                      <el-option
                        v-for="item in levels"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="注册地址">
                    <el-input v-model="form.domicile" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别">
                    <el-radio v-model="form.gender" value="1" name="sex" label="1" disabled>男</el-radio>
                    <el-radio v-model="form.gender" value="0" name="sex" label="0" disabled>女</el-radio>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="余额">
                    <el-input v-model="form.balance" :readonly="form.status ? false : 'readonly'" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="消费金额">
                    <el-input v-model="form.monetary" :readonly="form.status ? false : 'readonly'" disabled></el-input>
                  </el-form-item>
                </el-col>

                <!--                <el-col :span="12">-->
                <!--                  <el-form-item>-->
                <!--                    <el-button type="primary" @click="onSubmit">立即修改</el-button>-->
                <!--                    <el-button>取消</el-button>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog
      title="提示"
      :visible.sync="accountDialogVisibleTo"
      width="30%"
      center>
      <!--      <el-col :span="8" :offset-right="4">-->
      <div>
        <div style="text-align:center;margin-bottom: 15px; position:relative;">
          <img class="member-info-card-img" :src="cardImg">
        </div>
        <div style="display:flex">
          <el-button class="switch-button" type="primary" @click="accountDialogVisibleTWO()" size="medium" plain>
            {{changeShow1==true?'正':'反'}}
          </el-button>
        </div>
      </div>
      <!--      </el-col>-->
    </el-dialog>
  </div>
</template>

<script>
  export default {
    activated () {
      this.getMemberInfo()
      this.getImage()
    },
    data () {
      return {
        imageUrl: '',
        xgtx: false,
        accountDialogVisible: false,
        accountDialogVisibleTo: false,
        changeShow1: true,
        flag: '',
        flagY: '',
        cardImg: 'static/img/1.1.1.2.png',
        dataForm: {
          userId: '',
          avatar: ''
        },
        form: {
          nickname: '',
          memberId: '',
          username: '',
          email: '',
          mobile: '',
          status: '',
          name: '',
          card: '',
          domicile: '',
          gender: '',
          level: '2',
          credits: '',
          balance: '',
          monetary: '',
          avatar: '',
          ok: false
        },
        msg2: [
          {src: 'static/img/1.png'},
          {src: 'static/img/1.1.png'},
          {src: 'static/img/2.png'},
          {src: 'static/img/2.1.png'},
          {src: 'static/img/3.png'},
          {src: 'static/img/3.1.png'}
        ],
        A: [
          // {src: 'static/swiper/a/a1.png'},
          // {src: 'static/swiper/a/a2.png'},
          {src: 'static/swiper/a/a3.png'},
          {src: 'static/swiper/a/a4.png'},
          // {src: 'static/swiper/a/a5.png'},
          // {src: 'static/swiper/a/a6.png'},
          {src: 'static/swiper/a/a7.png'},
          {src: 'static/swiper/a/a8.png'},
          // {src: 'static/swiper/a/a9.png'},
          // {src: 'static/swiper/a/a10.png'},
          // {src: 'static/swiper/a/a11.png'},
          // {src: 'static/swiper/a/a12.png'},
          {src: 'static/swiper/a/a13.png'},
          {src: 'static/swiper/a/a14.png'}
          // {src: 'static/swiper/a/a15.png'},
          // {src: 'static/swiper/a/a16.png'}
        ],
        B: [
          // {src: 'static/swiper/b/b1.png'},
          // {src: 'static/swiper/b/b2.png'},
          {src: 'static/swiper/b/b3.png'},
          {src: 'static/swiper/b/b4.png'},
          // {src: 'static/swiper/b/b5.png'},
          // {src: 'static/swiper/b/b6.png'},
          {src: 'static/swiper/b/b7.png'},
          {src: 'static/swiper/b/b8.png'},
          // {src: 'static/swiper/b/b9.png'},
          // {src: 'static/swiper/b/b10.png'},
          // {src: 'static/swiper/b/b11.png'},
          // {src: 'static/swiper/b/b12.png'},
          {src: 'static/swiper/b/b13.png'},
          {src: 'static/swiper/b/b14.png'}
          // {src: 'static/swiper/b/b15.png'},
          // {src: 'static/swiper/b/b16.png'}
        ],
        C: [
          // {src: 'static/swiper/c/c1.png'},
          // {src: 'static/swiper/c/c2.png'},
          {src: 'static/swiper/c/c3.png'},
          {src: 'static/swiper/c/c4.png'},
          // {src: 'static/swiper/c/c5.png'},
          // {src: 'static/swiper/c/c6.png'},
          {src: 'static/swiper/c/c7.png'},
          {src: 'static/swiper/c/c8.png'},
          // {src: 'static/swiper/c/c9.png'},
          // {src: 'static/swiper/c/c10.png'},
          // {src: 'static/swiper/c/c11.png'},
          // {src: 'static/swiper/c/c12.png'},
          {src: 'static/swiper/c/c13.png'},
          {src: 'static/swiper/c/c14.png'}
          // {src: 'static/swiper/c/c15.png'},
          // {src: 'static/swiper/c/c16.png'}
        ],
        changeShow: true,
        a_status: [{
          value: 0,
          label: '禁用'
        }, {
          value: 1,
          label: '正常'
        }],
        levels: [{
          value: 1,
          label: 'Cu'
        }, {
          value: 2,
          label: 'Ag'
        }, {
          value: 3,
          label: 'Au'
        }, {
          value: 4,
          label: 'Pt'
        }, {
          value: 5,
          label: 'Zu'
        }, {
          value: 6,
          label: 'MS·耀白'
        }, {
          value: 7,
          label: 'MS·耀黑'
        }, {
          value: 8,
          label: 'Ti'
        }]
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
      }
    },
    methods: {
      getImage () {
        let n = document.getElementsByClassName('site-navbar__brand-mini')[0].innerHTML
        if (n === 'APS') {
          this.flagY = 2
        } else if (n === 'BPS') {
          this.flagY = 3
        } else if (n === 'CPS') {
          this.flagY = 4
        } else if (n === 'AS') {
          this.flagY = null
        }
        console.log(this.flagY)
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = res.imgUrl
        this.dataForm.avatar = res.imgUrl
        sessionStorage.setItem('avatar', this.form.avatar)
      },
      beforeAvatarUpload (file) {
        const testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!testmsg) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return testmsg && isLt2M
      },
      // 修改头像提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/member/updateById`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId,
                'avatar': this.imageUrl
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
      open () {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定'
        })
      },
      getMemberInfo () {
        this.$http({
          url: this.$http.adornUrl('/member/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form.username = data.member.username
            this.form.email = data.member.email
            this.form.mobile = data.member.mobile
            this.form.status = data.member.status
            this.form.memberId = data.member.memberId
            this.form.name = data.member.name
            this.form.nickname = data.member.nickname
            this.form.card = data.member.card
            this.form.domicile = data.member.domicile
            this.form.avatar = data.member.avatar
            this.form.gender = data.member.gender.toString()
            this.form.level = data.member.level
            this.form.credits = data.member.credits
            this.form.monetary = data.member.monetary
            this.form.balance = data.member.balance
            this.dataForm.userId = data.member.userId
            this.dataForm.avatar = data.member.avatar
            sessionStorage.setItem('avatar', data.member.avatar)
            if (data.member.accountStatus === 0) {
              this.accountDialogVisible = true
              this.$message.warning('您的账户未激活')
            }
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      onSubmit () {
        console.log('submit!')
      },
      checkCardImg () {
        if (this.cardImg === 'static/img/1.1.1.2.png') {
          this.cardImg = 'static/img/1.1.1.1.png'
          this.changeShow = false
          return false
        } else {
          this.cardImg = 'static/img/1.1.1.2.png'
          this.changeShow = true
        }
      },
      accountDialogVisibleTWO () {
        if (this.cardImg === 'static/img/1.1.1.2.png') {
          this.cardImg = 'static/img/1.1.1.1.png'
          this.changeShow1 = false
          return false
        } else {
          this.cardImg = 'static/img/1.1.1.2.png'
          this.changeShow1 = true
        }
      },
      checkCardImgTo () {
        this.accountDialogVisibleTo = true
      },
      couten (index) {
        var obj = document.getElementById('button')
        obj.style.display = 'inline'
      },
      leave (index) {
        var obj = document.getElementById('button')
        obj.style.display = 'none'
      }
    }
  }
</script>

<style lang="scss" scoped>
  //会员信息走马灯样式
  .member-info-carousel {
    width: 100%;
    height: 330px;
    text-align: center;
    margin: 0 auto;
    background-color: #f5f5f7;
    padding: 15px;
    border-radius: 5px;

    .member-info-carousel-img {
      width: 60%;
      height: 100%;
    }
  }

  //卡片样式
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    margin-top: 20px;
    padding: 20px 10px 0 0;
  }

  //文本样式区
  .name-role {
    font-size: 16px;
    padding: 5px;
    text-align: center;
  }

  .sender {
    text-align: center;
  }

  .registe-info {
    text-align: center;
    padding-top: 10px;
  }

  .personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
    width: 100%
  }

  .relation-item {
    padding: 12px;

  }

  .dialog-footer {
    padding-top: 10px;
    padding-left: 10%;
  }

  //布局样式区
  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 0 5px 5px #fff, /*关键的一行*/
    0 0 50px 10px #8c939d;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }

  /*  切换按钮样式*/
  .switch-button {
    display: flex;
    margin: 0 auto;
    margin-top: 30px;
  }

  /*  修改的会员信息样式*/
  .member-info-model {
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    justify-content: center;
  }

  .member-information {
    display: flex;
    flex-direction: row;
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    /*margin-left: -100px;*/
    margin-bottom: 20px;
  }

  .member-information .avatar {
    margin-right: 8px;
  }

  .member-info-card-img {
    width: 400px;
    height: 250px;
  }

  // 充值样式
  .button {
    position: absolute;
    // background: red;
    z-index: 99999;
    opacity: 1;
    pointer-events: none
  }

  .buttonA {
    border-radius: 6px;
  }

  /*头像*/
  .avatar-uploader .el-upload {
    border: 1px dashed black;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
</style>
