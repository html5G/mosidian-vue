<template>
  <div class="productList">
    <el-row>
      <el-col :span="8" v-for="(items, index) in form" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="items.mainImage" class="image" />
          <div style="padding: 14px;">
            <span class="itemsspan">{{ items.name | ellipsis}}</span>
            <div class="bottom clearfix">
              <time class="time">￥{{ items.price }}</time>
              <el-button
                type="primary"
                class="button"
                @click="dialogFormVisibleButton(items,index)"
              >查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" v-for="(items, index) in forms" :key="index">
        <span class="productlist-span">敬请期待···</span>
        <el-card  class="productist-filter"  :body-style="{ padding: '0px' }" shadow="hover">
          <img :src="items.src" class="image" />
          <div style="padding: 14px;">
            <span class="itemsspan">敬请期待{{ items.name | ellipsis}}</span>
            <div class="bottom clearfix">
              <time class="time">￥{{ items.price }}</time>
              <el-button
                type="primary"
                class="button"
              >查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="选择购买" :visible.sync="dialogFormVisible">
      <div class="Iamge">
        <img class="Iamge-img" :src="dataPatu" />
        <div class="money">
          商品描述: {{ dataPatu1 }}
          <br>
          <span class="span">商品价格: ￥{{ dataPatu2 }}</span>
          <div class="ImagesButton-vue">
            <div>
              <el-button
                type="primary"
                class="IamgeButon"
                @click="cz = true"
              >充值余额</el-button>
              <el-dialog title="充值余额"
                         :visible.sync="cz"
                         width="50%"
                         :modal-append-to-body='false'>
                敬请期待
              </el-dialog>
            </div>
            <div class="ImagesButton-vue-1">
              <el-button
                type="danger"
                class="IamgeButon"
                @click="nk = true"
              >开通年费</el-button>
              <el-dialog title="开通年费"
                         :visible.sync="nk"
                         width="50%"
                         :modal-append-to-body='false'>
                敬请期待
              </el-dialog>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="提交订单" :visible.sync="dialogFormVisibleMoney">
      <div class="order-money">
        <div class="order-money-vue">
          <el-col :span="8">
            <el-card shadow="hover">
            </el-card>
          </el-col>
        </div>
        <div class="order-money-Iamge">
          <img class="order-money-img" :src="dataPatu" />
          <div class="order-money-monet">
            商品描述: {{ dataPatu1 }}
            <br>
            <span class="order-money-span">商品价格: ￥{{ dataPatu2 }}</span>
          </div>
        </div>
        <div>
          <el-button
            type="danger" round
            class="order-money-button"
            @click="createHandleTwo()"
          >提交订单</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  export default {
    activated () {
      this.getProducts()
    },
    data () {
      return {
        cz: false,
        nk: false,
        currentDate: new Date(),
        active: 0,
        dialogFormVisible: false,
        dialogFormVisibleMoney: false,
        dataPatu: null,
        dataPatu1: null,
        dataPatu2: null,
        form: [],
        forms: [
          {src: 'static/swiper/a/a2.png'},
          {src: 'static/swiper/a/a6.png'},
          {src: 'static/swiper/a/a8.png'},
          {src: 'static/swiper/a/a16.png'},
          {src: 'static/swiper/a/a12.png'}
        ]
      }
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 20) {
          return value.slice(0, 20) + '...'
        }
        return value
      }
    },
    methods: {
      // 创建订单
      createHandle () {
        this.dialogFormVisibleMoney = true
      },
      dialogFormVisibleButton (items, index) {
        this.dataPatu = items.mainImage
        this.dataPatu1 = items.name
        this.dataPatu2 = items.price
        this.dialogFormVisible = true
        console.log('222', this.dataPatu)
        console.log('222', this.dataPatu1)
      },
      getProducts () {
        this.$http({
          url: this.$http.adornUrl(`/mall/products`),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form = data.data.list
            console.log(8888)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
<style scoped>
  .time {
    font-size: 13px;
    color: red;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  /* 添加毛玻璃 */
  .productist-filter {
    filter: blur(3px);
  }
  /* 敬请期待···· */
  .productlist-span {
    position: absolute;
    color: #ffffff;
    z-index: 99;
    font-size: 25px;
    margin-top: 65px;
    margin-left: 68px;
    letter-spacing: 5px;
  }
  /*立即购买按钮*/
  .IamgeButon {
    margin-top: 12px ;
  }
  /* 选择购买页大小 */
  .image {
    width: 100%;
    display: block;
  }
  /* 购买按钮大小 */
  .ImagesButton-vue {
    display: flex;
  }
  .ImagesButton-vue-1 {
    margin-left: 10px;
  }
  /* 地址样式 */
  .order-money-vue .el-col, .order-money-vue .el-col-8 {
    width: 377px;
    margin-left: 1px;
    margin-top: 1px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .el-row {
    display: flex !important;
    flex-wrap: wrap !important;
  }
  .el-col-8 {
    margin-left: 94px;
    margin-top: 30px;
    width: 268px;
  }
  .el-dialog__body {
    display: flex !important;
  }
  .Iamge {
    display: flex;
  }
  img {
    width: 48%;
    height: 50%;
  }
  .money {
    margin-left: 10px;
  }
  .span {
    color: red;
  }
  .buttonmoney {
    display: block;
  }
  /* 订单最大盒子*/
  .order-money{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  /*  订单图片盒子*/
  .order-money-Iamge {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  /*  图片大小*/
  .order-money-img {
    width: 23%;
    height: 91%;
    border-radius: 15px;
  }
  /*  商品描述*/
  .order-money-monet {
    width: 40%;
    margin-left: 8px;
    margin-top: 5px;
  }
  /*  价格样式*/
  .order-money-span {
    color: red;
  }
</style>

<style>
  .productList .el-dialog {
    width: 34% ;
  }
</style>
<style lang="scss">
  .el-button--danger.is-disabled, .el-button--primary, .el-button--danger, .el-button--success.is-plain {
    color: #181818;
    background-color: #FFFFFF;
    border-color: #eeeeee;
  }
  .el-radio__label {
    color: #181818;
  }
  .grid-cont-right {
    color: #181818 !important;
  }
  .el-radio__input.is-disabled+span.el-radio__label {
    color: #000000;
  }
  .el-input.is-disabled .el-input__inner {
    color: #000000;
  }
</style>
