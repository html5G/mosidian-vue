<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
    <div class="site-navbar__header">
      <h1 class="site-navbar__brand" @click="$router.push({ name: 'home' })">
        <template v-if="flag === 2 || flag === '2'">
          <a class="site-navbar__brand-lg" href="javascript:;">MEOS·APS·AIC</a>
          <a class="site-navbar__brand-mini" href="javascript:;">APS</a>
        </template>
        <template v-else-if="flag === 3 || flag === '3'">
          <a class="site-navbar__brand-lg" href="javascript:;">MEOS·BPS·BIC</a>
          <a class="site-navbar__brand-mini" href="javascript:;">BPS</a>
        </template>
        <template v-else-if="flag === 4 || flag === '4'">
          <a class="site-navbar__brand-lg" href="javascript:;">MEOS·CPS·CIC</a>
          <a class="site-navbar__brand-mini" href="javascript:;">CPS</a>
        </template>
        <template v-else>
          <a class="site-navbar__brand-lg" href="javascript:;">ADMIN OS</a>
          <a class="site-navbar__brand-mini" href="javascript:;">AS</a>
        </template>
      </h1>
    </div>
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal">
        <el-menu-item class="site-navbar__switch" index="0" @click="sidebarFold = !sidebarFold">
          <icon-svg name="zhedie"></icon-svg>
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal">
        <el-menu-item index="1" @click="$router.push({ name: 'theme' })">
          <template slot="title">
            <el-badge value="new">
              <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
            </el-badge>
          </template>
        </el-menu-item>
        <el-menu-item class="site-navbar__avatar" index="3">
          <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <template v-if="flag === 1 || flag === '1'"><img src="static/img/1.png">{{userName}}</template>
              <template v-else><img :src="form.avatar">{{userName}}</template>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 弹窗, 修改密码 -->
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </nav>
</template>

<script>
  import UpdatePassword from './main-navbar-update-password'
  import {clearLoginInfo} from '@/utils'

  export default {
    created () {
      this.getMemberInfo()
    },
    activated () {
      this.getMemberInfo()
    },
    data () {
      return {
        updatePassowrdVisible: false,
        form: {
          userId: '',
          nickname: '',
          username: '',
          avatar: '',
          ok: false
        }
      }
    },
    components: {
      UpdatePassword
    },
    computed: {
      navbarLayoutType: {
        get () {
          return this.$store.state.common.navbarLayoutType
        }
      },
      sidebarFold: {
        get () {
          return this.$store.state.common.sidebarFold
        },
        set (val) {
          this.$store.commit('common/updateSidebarFold', val)
        }
      },
      mainTabs: {
        get () {
          return this.$store.state.common.mainTabs
        },
        set (val) {
          this.$store.commit('common/updateMainTabs', val)
        }
      },
      userName: {
        get () {
          return this.$store.state.user.name
        }
      },
      flag: {
        get () {
          if (this.$store.state.user.userFlag === null) {
            return sessionStorage.getItem('userFlag')
          } else {
            return this.$store.state.user.userFlag
          }
        }
      },
      avatar: {
        get () {
          return this.$store.state.user.avatar
        }
      }
    },
    methods: {
      // 修改密码
      updatePasswordHandle () {
        this.updatePassowrdVisible = true
        this.$nextTick(() => {
          this.$refs.updatePassowrd.init()
        })
      },
      // 退出
      logoutHandle () {
        this.$confirm(`确定进行[退出]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/logout'),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              clearLoginInfo()
              this.$router.push({name: 'login'})
            }
          })
        }).catch(() => {
        })
      },

      getMemberInfo () {
        this.$http({
          url: this.$http.adornUrl('/member/info'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.form.userId = data.member.userId
            this.form.username = data.member.username
            this.form.nickname = data.member.nickname
            this.form.avatar = data.member.avatar
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    watch: {
      sessionStorage: function (newQuestion, oldQuestion) {
        this.form.avatar = sessionStorage.getItem('avatar')
      }
    }
  }
</script>

<style scoped>
  .site-navbar {
    background-color: #263238 !important;
  }
</style>
