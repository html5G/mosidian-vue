<template>
  <el-dialog
    :title="!dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
<!--      <el-form-item label="会员卡号" prop="enId">-->
<!--        <el-input v-model="dataForm.enId" placeholder="会员卡号" disabled></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="企业全称" prop="name">
        <el-input v-model="dataForm.name" placeholder="企业全称"></el-input>
      </el-form-item>
      <el-form-item label="企业官网" prop="website">
        <el-input v-model="dataForm.website" placeholder="企业官网"></el-input>
      </el-form-item>
      <el-form-item label="企业规模" prop="scale">
        <el-input v-model="dataForm.scale" placeholder="企业规模"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="synopsis">
        <el-input v-model="dataForm.synopsis" placeholder="企业简介"></el-input>
      </el-form-item>
      <el-form-item label="法人" prop="corporation">
        <el-input v-model="dataForm.corporation" placeholder="法人"></el-input>
      </el-form-item>
      <el-form-item label="会员账号" prop="username">
        <el-input v-model="dataForm.username" placeholder="会员账号"></el-input>
      </el-form-item>
      <el-form-item label="认证理由" prop="reason">
        <el-input v-model="dataForm.reason" placeholder="认证理由"></el-input>
      </el-form-item>
      <el-form-item label="提供的服务" prop="eserver">
        <el-input v-model="dataForm.eserver" placeholder="提供的服务"></el-input>
      </el-form-item>
      <!--      <el-form-item label="企业类型" prop="companies">-->
      <!--        <el-input v-model="dataForm.companies" placeholder="企业类型"></el-input>-->
      <!--      </el-form-item>-->
      <el-form-item label="企业类型">
        <el-select v-model="dataForm.companies" placeholder="企业类型">
          <el-option
            v-for="item in companies"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="headName">
        <el-input v-model="dataForm.headName" placeholder="负责人"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="sector">
        <el-input v-model="dataForm.sector" placeholder="部门"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="eposition">
        <el-input v-model="dataForm.eposition" placeholder="职位"></el-input>
      </el-form-item>
      <el-form-item label="负责人身份证号" prop="headCard">
        <el-input v-model="dataForm.headCard" placeholder="负责人身份证号"></el-input>
      </el-form-item>
      <el-form-item label="负责人电话" prop="emobile">
        <el-input v-model="dataForm.emobile" placeholder="负责人电话"></el-input>
      </el-form-item>
      <el-form-item label="负责人邮箱" prop="eemail">
        <el-input v-model="dataForm.eemail" placeholder="负责人邮箱"></el-input>
      </el-form-item>
      <el-form-item label="审核人" prop="modifier">
        <el-input v-model="dataForm.modifier" placeholder="审核人"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="dataForm.audit" placeholder="请选择状态">
          <el-option
            v-for="item in audit"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信誉分" prop="credits">
        <el-input v-model="dataForm.credits" placeholder="信誉分"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码" prop="enlicenseId">
        <el-input v-model="dataForm.enlicenseId" placeholder="统一社会信用代码"></el-input>
      </el-form-item>
      <el-form-item label="上传LOGO">
        <el-upload
          enctype="multipart/form-data"
          class="avatar-uploader"
          action="http://localhost:8080/mosidian/api/upload"
          :show-file-list="false"
          :on-success="handleLogoSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="logo" :src="logo" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="更新时间" prop="updateTime">
         <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
       </el-form-item>-->
      <el-form-item label="上传执照">
        <el-upload
          enctype="multipart/form-data"
          class="avatar-uploader"
          action="http://localhost:8080/mosidian/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        visible: false,
        logo: '',
        imageUrl: '',
        dataForm: {
          username: '',
          // enId: '',
          userId: '',
          name: '',
          website: '',
          scale: '',
          synopsis: '',
          corporation: '',
          reason: '',
          eserver: '',
          companies: '',
          headName: '',
          sector: '',
          eposition: '',
          headCard: '',
          emobile: '',
          eemail: '',
          modifier: '',
          credits: '',
          enlicenseId: '',
          avatar: '',
          domicile: '',
          audit: '',
          enlicense: '',
          updateTime: ''
        },
        companies: [{
          value: '3',
          label: '物流类型'
        }, {
          value: '4',
          label: '企业类型'
        }],
        audit: [{
          value: 0,
          label: '未通过'
        }, {
          value: 1,
          label: '已通过'
        }],
        dataRule: {
          userId: [
            {required: true, message: '登录ID不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '企业全称不能为空', trigger: 'blur'}
          ],
          website: [
            {required: true, message: '企业官网不能为空', trigger: 'blur'}
          ],
          scale: [
            {required: true, message: '企业规模不能为空', trigger: 'blur'}
          ],
          synopsis: [
            {required: true, message: '企业简介不能为空', trigger: 'blur'}
          ],
          corporation: [
            {required: true, message: '法人不能为空', trigger: 'blur'}
          ],
          reason: [
            {required: true, message: '认证理由不能为空', trigger: 'blur'}
          ],
          eserver: [
            {required: true, message: '提供的服务不能为空', trigger: 'blur'}
          ],
          companies: [
            {required: true, message: '企业类型不能为空', trigger: 'blur'}
          ],
          headName: [
            {required: true, message: '负责人不能为空', trigger: 'blur'}
          ],
          sector: [
            {required: true, message: '部门不能为空', trigger: 'blur'}
          ],
          eposition: [
            {required: true, message: '职位不能为空', trigger: 'blur'}
          ],
          headCard: [
            {required: true, message: '负责人身份证号不能为空', trigger: 'blur'}
          ],
          emobile: [
            {required: true, message: '负责人电话不能为空', trigger: 'blur'}
          ],
          eemail: [
            {required: true, message: '负责人邮箱不能为空', trigger: 'blur'}
          ],
          modifier: [
            {required: true, message: '  审核人不能为空', trigger: 'blur'}
          ],
          credits: [
            {required: true, message: '信誉分不能为空', trigger: 'blur'}
          ],
          enlicenseId: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          avatar: [
            {required: true, message: '企业LOGO不能为空', trigger: 'blur'}
          ],
          domicile: [
            {required: true, message: '注册地址不能为空', trigger: 'blur'}
          ],
          enlicense: [
            {required: true, message: '营业执照不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/enterprise/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.enterprise.userId
                this.dataForm.enId = data.enterprise.enId
                this.dataForm.name = data.enterprise.name
                this.dataForm.username = data.enterprise.username
                this.dataForm.website = data.enterprise.website
                this.dataForm.scale = data.enterprise.scale
                this.dataForm.audit = data.enterprise.audit
                this.dataForm.synopsis = data.enterprise.synopsis
                this.dataForm.corporation = data.enterprise.corporation
                this.dataForm.reason = data.enterprise.reason
                this.dataForm.eserver = data.enterprise.eserver
                this.dataForm.companies = data.enterprise.companies
                this.dataForm.headName = data.enterprise.headName
                this.dataForm.sector = data.enterprise.sector
                this.dataForm.eposition = data.enterprise.eposition
                this.dataForm.headCard = data.enterprise.headCard
                this.dataForm.emobile = data.enterprise.emobile
                this.dataForm.eemail = data.enterprise.eemail
                this.dataForm.modifier = data.enterprise.modifier
                this.dataForm.credits = data.enterprise.credits
                this.dataForm.enlicenseId = data.enterprise.enlicenseId
                this.dataForm.avatar = data.enterprise.avatar
                this.dataForm.domicile = data.enterprise.domicile
                this.dataForm.enlicense = data.enterprise.enlicense
                this.dataForm.updateTime = data.enterprise.updateTime
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
              url: this.$http.adornUrl(`/enterprise/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'enId': this.dataForm.enId,
                'username': this.dataForm.username,
                'name': this.dataForm.name,
                'website': this.dataForm.website,
                'scale': this.dataForm.scale,
                'synopsis': this.dataForm.synopsis,
                'corporation': this.dataForm.corporation,
                'reason': this.dataForm.reason,
                'eserver': this.dataForm.eserver,
                'companies': this.dataForm.companies,
                'headName': this.dataForm.headName,
                'sector': this.dataForm.sector,
                'audit': this.dataForm.audit,
                'eposition': this.dataForm.eposition,
                'headCard': this.dataForm.headCard,
                'emobile': this.dataForm.emobile,
                'eemail': this.dataForm.eemail,
                'modifier': this.dataForm.modifier,
                'credits': this.dataForm.credits,
                'enlicenseId': this.dataForm.enlicenseId,
                'avatar': this.logo,
                'domicile': this.dataForm.domicile,
                'enlicense': this.imageUrl
                // 'updateTime': this.dataForm.updateTime
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
      handleLogoSuccess (res, file) {
        // this.imageUrl = URL.createObjectURL(file.raw)
        this.logo = res.imgUrl
      },
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
      }
    }
  }
</script>
<style>
  /*头像*/
  .avatar-uploader .el-upload {
    width: 300px;
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
