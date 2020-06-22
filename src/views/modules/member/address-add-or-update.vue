<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
<!--      <el-form-item label="用户id" prop="userId">-->
<!--        <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="收货姓名" prop="receiverName">
        <el-input v-model="dataForm.receiverName" placeholder="收货姓名"></el-input>
      </el-form-item>
      <el-form-item label="收货固定电话" prop="receiverPhone">
        <el-input v-model="dataForm.receiverPhone" placeholder="收货固定电话"></el-input>
      </el-form-item>
      <el-form-item label="收货移动电话" prop="receiverMobile">
        <el-input v-model="dataForm.receiverMobile" placeholder="收货移动电话"></el-input>
      </el-form-item>
      <el-form-item label="省份" prop="receiverProvince">
        <el-input v-model="dataForm.receiverProvince" placeholder="省份"></el-input>
      </el-form-item>
      <el-form-item label="城市" prop="receiverCity">
        <el-input v-model="dataForm.receiverCity" placeholder="城市"></el-input>
      </el-form-item>
      <el-form-item label="区/县" prop="receiverDistrict">
        <el-input v-model="dataForm.receiverDistrict" placeholder="区/县"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="receiverAddress">
        <el-input v-model="dataForm.receiverAddress" placeholder="详细地址"></el-input>
      </el-form-item>
      <el-form-item label="邮编" prop="receiverZip">
        <el-input v-model="dataForm.receiverZip" placeholder="邮编"></el-input>
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
        dialogVisible: false,
        formLabelWidth: '80px',
        limitNum: 1,
        dialogVisible2: false,
        visible: false,
        dataForm: {
          id: '',
          userId: '',
          receiverName: '',
          receiverPhone: '',
          receiverMobile: '',
          receiverProvince: '',
          receiverCity: '',
          receiverDistrict: '',
          receiverAddress: '',
          receiverZip: ''
        },
        dataRule: {
          receiverName: [
            {required: true, message: '收获人不能为空', trigger: 'blur'}
          ],
          receiverPhone: [
            {required: true, message: '收货固定电话不能为空', trigger: 'blur'}
          ],
          receiverMobile: [
            {required: true, message: '收货移动电话不能为空', trigger: 'blur'}
          ],
          receiverProvince: [
            {required: true, message: '省份不能为空', trigger: 'blur'}
          ],
          receiverCity: [
            {required: true, message: '城市不能为空', trigger: 'blur'}
          ],
          receiverDistrict: [
            {required: true, message: '区,县不能为空', trigger: 'blur'}
          ],
          receiverAddress: [
            {required: true, message: '详细地址不能为空', trigger: 'blur'}
          ],
          receiverZip: [
            {required: true, message: '邮编不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || ''
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/mall/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
                this.dataForm.id = data.shipping.id
                // this.dataForm.userId = data.shipping.userId
                this.dataForm.receiverName = data.shipping.receiverName
                this.dataForm.receiverPhone = data.shipping.receiverPhone
                this.dataForm.receiverMobile = data.shipping.receiverMobile
                this.dataForm.receiverProvince = data.shipping.receiverProvince
                this.dataForm.receiverCity = data.shipping.receiverCity
                this.dataForm.receiverDistrict = data.shipping.receiverDistrict
                this.dataForm.receiverAddress = data.shipping.receiverAddress
                this.dataForm.receiverZip = data.shipping.receiverZip
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.dataForm.id) {
              this.$http({
                url: this.$http.adornUrl(`/mall/shippings/${this.dataForm.id}`),
                method: 'post',
                data: this.$http.adornData({
                  // 'id': this.dataForm.id,
                  // 'userId': this.dataForm.userId,
                  'receiverName': this.dataForm.receiverName,
                  'receiverPhone': this.dataForm.receiverPhone,
                  'receiverMobile': this.dataForm.receiverMobile,
                  'receiverProvince': this.dataForm.receiverProvince,
                  'receiverCity': this.dataForm.receiverCity,
                  'receiverDistrict': this.dataForm.receiverDistrict,
                  'receiverAddress': this.dataForm.receiverAddress,
                  'receiverZip': this.dataForm.receiverZip
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
            } else {
              this.$http({
                url: this.$http.adornUrl(`/mall/shippings/save`),
                method: 'post',
                data: this.$http.adornData({
                  // 'id': this.dataForm.id || '',
                  // 'userId': this.dataForm.userId,
                  'receiverName': this.dataForm.receiverName,
                  'receiverPhone': this.dataForm.receiverPhone,
                  'receiverMobile': this.dataForm.receiverMobile,
                  'receiverProvince': this.dataForm.receiverProvince,
                  'receiverCity': this.dataForm.receiverCity,
                  'receiverDistrict': this.dataForm.receiverDistrict,
                  'receiverAddress': this.dataForm.receiverAddress,
                  'receiverZip': this.dataForm.receiverZip
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
