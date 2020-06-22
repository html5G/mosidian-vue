<template>
  <el-dialog
    :title="!dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="上传头像" prop="avatar">
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
<!--      <el-form-item label="会员卡" prop="memberId">-->
<!--        <el-input v-model="dataForm.memberId" placeholder="会员卡号"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="会员账号" prop="username">
        <el-input v-model="dataForm.username" placeholder="会员账号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dataForm.status" placeholder="请选择状态">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="dataForm.name" placeholder="会员真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="card">
        <el-input v-model="dataForm.card"
                  placeholder="身份证号"></el-input>
      </el-form-item>
      <!--<el-form-item label="注册地址" prop="domicile">
        <el-input v-model="dataForm.domicile" placeholder="注册地址"></el-input>
      </el-form-item>-->
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="dataForm.gender" value="1" name="sex" label="1">男</el-radio>
        <el-radio v-model="dataForm.gender" value="0" name="sex" label="0">女</el-radio>
      </el-form-item>
      <el-form-item label="等级">
        <el-select v-model="dataForm.level" placeholder="请选择等级">
          <el-option
            v-for="item in level"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信誉分" prop="credits">
        <el-input v-model="dataForm.credits" placeholder="信誉分"></el-input>
      </el-form-item>
      <el-form-item label="余额" prop="balance">
        <el-input v-model="dataForm.balance" placeholder="余额"></el-input>
      </el-form-item>
      <el-form-item label="消费金额" prop="monetary">
        <el-input v-model="dataForm.monetary" placeholder="消费金额"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        imageUrl: '',
        hideUpload: false,
        dialogImageUrl: '',
        dialogVisible: false,
        formLabelWidth: '80px',
        limitNum: 1,
        form: {},
        dialogVisible2: false,
        visible: false,
        dataForm: {
          userId: '',
          username: '',
          email: '',
          mobile: '',
          status: '',
          // memberId: '',
          name: '',
          nickname: '',
          card: '',
          /* domicile: '', */
          avatar: '',
          gender: '',
          level: '',
          credits: '',
          createTime: '',
          updateTime: '',
          balance: '',
          monetary: ''
        },
        status: [{
          value: 0,
          label: '禁用'
        }, {
          value: 1,
          label: '正常'
        }],
        level: [{
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
          label: 'MS'
        }, {
          value: 7,
          label: 'Ti'
        }],
        dataRule: {
          username: [
            {required: true, message: '会员账号不能为空', trigger: 'blur'}
          ],
          // memberId: [
          //   {required: true, message: '会员卡号不能为空', trigger: 'blur'}
          // ],
          domicile: [
            {required: true, message: '注册地址不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          balance: [
            {required: true, message: '余额不能为空', trigger: 'blur'}
          ],
          monetary: [
            {required: true, message: '消费金额不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '会员姓名不能为空', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '昵称不能为空', trigger: 'blur'}
          ],
          card: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'}
          ],
          level: [
            {
              required: true,
              message: '等级：1- Cu（铜），2-Ag（银），3-Au（金），4-Pt（铂），5-Zu（钻），6-MS（曜【白】），6-MS（曜【黑】），7-Ti（晶）不能为空',
              trigger: 'blur'
            }
          ],
          credits: [
            {required: true, message: '信誉分（默认：600）不能为空', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '状态（0-正常，1-失效）不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.imageUrl = res.imgUrl
      },
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
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
      init (id) {
        this.imageUrl = ''
        this.dataForm.userId = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/member/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.member.userId
                this.dataForm.username = data.member.username
                this.dataForm.email = data.member.email
                this.dataForm.mobile = data.member.mobile
                this.dataForm.status = data.member.status
                this.dataForm.memberId = data.member.memberId
                this.dataForm.name = data.member.name
                this.dataForm.nickname = data.member.nickname
                this.dataForm.card = data.member.card
                /* this.dataForm.domicile = data.member.domicile */
                this.dataForm.avatar = data.member.avatar
                this.dataForm.gender = data.member.gender.toString()
                this.dataForm.level = data.member.level
                this.dataForm.credits = data.member.credits
                this.dataForm.monetary = data.member.monetary
                this.dataForm.createTime = data.member.createTime
                this.dataForm.updateTime = data.member.updateTime
                this.dataForm.balance = data.member.balance
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/member/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'name': this.dataForm.name,
                'nickname': this.dataForm.nickname,
                'password': this.dataForm.password,
                'username': this.dataForm.username,
                'memberId': this.dataForm.memberId,
                'card': this.dataForm.card,
                'mobile': this.dataForm.mobile,
                'domicile': this.dataForm.domicile,
                'gender': this.dataForm.gender,
                'email': this.dataForm.email,
                'balance': this.dataForm.balance,
                'level': this.dataForm.level,
                'monetary': this.dataForm.monetary,
                'credits': this.dataForm.credits,
                'status': this.dataForm.status,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
      }
    }
  }
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
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
