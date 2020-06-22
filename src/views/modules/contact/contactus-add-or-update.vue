<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="dataForm.name" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="dataForm.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="dataForm.phone" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="反馈消息" prop="feedbackMessage">
      <el-input v-model="dataForm.feedbackMessage" placeholder="反馈消息"></el-input>
    </el-form-item>
    <el-form-item label="提交时间" prop="createdate">
      <el-input v-model="dataForm.createdate" placeholder="提交时间"></el-input>
    </el-form-item>
    <el-form-item label="记录状态" prop="recordstatus">
      <el-input v-model="dataForm.recordstatus" placeholder="记录状态"></el-input>
    </el-form-item>
    <el-form-item label="状态 0 正常" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态 0 正常"></el-input>
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
        dataForm: {
          id: 0,
          name: '',
          email: '',
          phone: '',
          feedbackMessage: '',
          createdate: '',
          recordstatus: '',
          status: ''
        },
        dataRule: {
          name: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          feedbackMessage: [
            { required: true, message: '反馈消息不能为空', trigger: 'blur' }
          ],
          createdate: [
            { required: true, message: '提交时间不能为空', trigger: 'blur' }
          ],
          recordstatus: [
            { required: true, message: '记录状态不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态 0 正常不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/contact/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.contactUs.name
                this.dataForm.email = data.contactUs.email
                this.dataForm.phone = data.contactUs.phone
                this.dataForm.feedbackMessage = data.contactUs.feedbackMessage
                this.dataForm.createdate = data.contactUs.createdate
                this.dataForm.recordstatus = data.contactUs.recordstatus
                this.dataForm.status = data.contactUs.status
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
              url: this.$http.adornUrl(`/contact/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'email': this.dataForm.email,
                'phone': this.dataForm.phone,
                'feedbackMessage': this.dataForm.feedbackMessage,
                'createdate': this.dataForm.createdate,
                'recordstatus': this.dataForm.recordstatus,
                'status': this.dataForm.status
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
