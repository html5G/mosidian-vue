<template>
  <div>
    <div class="member-info-carousel">
      <el-carousel :interval="2000" :autoplay="true" :loop="true" indicator-position="none" arrow="hover" type="card">
        <div v-if="flagY === 2 | flagY === '2'">
                  <el-carousel-item v-for="(item,index) in A" :key="index">
                    <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"
                                        class="member-info-carousel-img"/>
                  </el-carousel-item>
                  </div>
                <!-- 获取到B端 -->
                <div v-else-if="flagY === 3 | flagY === '3'">
                <el-carousel-item v-for="(item,index) in B" :key="index">
                  <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"
                                      class="member-info-carousel-img"/>
                </el-carousel-item>
                </div>
                <!-- 获取到C端 -->
                <div v-else-if="flagY === 4 | flagY === '4'">
                <el-carousel-item v-for="(item,index) in C" :key="index">
                  <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"
                       class="member-info-carousel-img"/>
                </el-carousel-item>
                </div>
            <!-- 获取不到flagY null -->
            <div v-else>
            <el-carousel-item v-for="(item,index) in msg2" :key="index">
              <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"
                                  class="member-info-carousel-img"/>
            </el-carousel-item>
            </div>
            <el-carousel-item v-for="(item,index) in msg2" :key="index">
              <img v-bind:src="item.src" @mouseleave="leave(index)" @mouseenter="couten(index)"
                                  class="member-info-carousel-img"/>
            </el-carousel-item>
        <div class="button" id="button" style="display: none">
          <!--         <el-button type="success" @click="open()" plain>充值</el-button>-->
        </div>
      </el-carousel>
    </div>
    <el-form :model="form" ref="form" label-width="80px">
      <el-row :gutter="20" style="margin: 40px 0 10px 0;">
        <el-col :span="24">
          <el-row class="member-info-model">
            <el-col :span="8" :offset="4">
              <div class="member-information">
                <img class="avatar" :src="form.avatar">
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
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card>
            <el-form ref="form" :model="form" label-width="140px">
              <el-col :span="12">
                <el-form-item label="企业名称：" prop="name">
                  <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                    <el-form-item label="官网:" prop="website">
                      <el-input v-model="form.website" disabled></el-input>
                    </el-form-item>
              </el-col>
              <el-col :span="12" style="display: flex;flex-direction: row;align-items: center">
                <el-form-item label="企业规模：">
                  <el-input v-model="form.scale" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人：" prop="corporation">
                  <el-input v-model="form.corporation" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="认证理由：" prop="reason">
                  <el-input v-model="form.reason" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提供的服务：" prop="eserver">
                  <el-input v-model="form.eserver" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: flex;flex-direction: row;align-items: center">
                <el-form-item label="企业类型：">
                  <el-radio v-model="form.companies" value="4"  label="4" disabled>企业服务公司</el-radio>
                  <el-radio v-model="form.companies" value="3"  label="3" disabled>物流服务公司</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="签约时间：">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.createTime" disabled style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门：" prop="department">
                  <el-input v-model="form.sector" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人：" prop="principal">
                  <el-input v-model="form.headName" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人身份证号：" prop="id">
                  <el-input v-model="form.headCard" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职位：" prop="position">
                  <el-input v-model="form.eposition" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人邮箱：" prop="email">
                  <el-input v-model="form.eemail" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责人电话：" prop="phone">
                  <el-input v-model="form.emobile" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-card>
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
      this.getEnterpriseInfo()
      this.getLogisticsInfo()
      this.getImage()
    },
    data () {
      return {
        accountDialogVisible: false,
        accountDialogVisibleTo: false,
        changeShow1: true,
        flagY: '',
        cardImg: 'static/img/1.1.1.2.png',
        form: {
          name: '',
          website: '暂无',
          scale: '',
          corporation: '',
          reason: '',
          eserver: '',
          companies: '',
          createTime: '',
          sector: '',
          headName: '',
          headCard: '',
          eposition: '',
          eemail: '',
          emobile: '',
          avatar: ''
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
        changeShow: true
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
      // 轮播图选择播放
      getImage () {
        let n = document.getElementsByClassName('site-navbar__brand-mini')[0].innerHTML
        if (n === 'APS') {
          this.flagY = 2
        } else if (n === 'BPS') {
          this.flagY = 3
        } else if (n === 'CPS') {
          this.flagY = 4
        } else {
          this.flagY = null
        }
        console.log(this.flagY)
      },
      open () {
        this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定'
        })
      },
      getEnterpriseInfo () {
        this.$http({
          url: this.$http.adornUrl('/enterprise/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form.name = data.enterprise.name
            this.form.website = data.enterprise.website
            this.form.scale = data.enterprise.scale
            this.form.corporation = data.enterprise.corporation
            this.form.reason = data.enterprise.reason
            this.form.eserver = data.enterprise.eserver
            this.form.companies = data.enterprise.companies
            this.form.createTime = data.enterprise.createTime
            this.form.sector = data.enterprise.sector
            this.form.headName = data.enterprise.headName
            this.form.headCard = data.enterprise.headCard
            this.form.eposition = data.enterprise.eposition
            this.form.avatar = data.enterprise.avatar
            this.form.eemail = data.enterprise.eemail
            this.form.emobile = data.enterprise.emobile
          }
        })
      },
      getLogisticsInfo () {
        this.$http({
          url: this.$http.adornUrl('/logistics/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form.name = data.logistics.name
            this.form.website = data.logistics.website
            this.form.scale = data.logistics.scale
            this.form.corporation = data.logistics.corporation
            this.form.reason = data.logistics.reason
            this.form.eserver = data.logistics.eserver
            this.form.companies = data.logistics.companies
            this.form.createTime = data.logistics.createTime
            this.form.sector = data.logistics.sector
            this.form.headName = data.logistics.headName
            this.form.headCard = data.logistics.headCard
            this.form.eposition = data.logistics.eposition
            this.form.avatar = data.logistics.avatar
            this.form.eemail = data.logistics.eemail
            this.form.emobile = data.logistics.emobile
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
  .el-input.is-disabled .el-input__inner{
    background-color: #ffffff;
    color: black;
  }
</style>

