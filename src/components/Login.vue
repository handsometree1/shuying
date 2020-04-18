<template>
  <div class="login">
    <el-container>
      <el-header>欢迎登陆后台管理系统</el-header>
      <el-main>
        <el-form ref="form" :model="form" label-width="80px">
          <i class="el-icon-user-solid"></i>
          <el-form-item class="el-icon-user-solid" label="用户名">
            <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <br />
          <i class="el-icon-unlock"></i>
          <el-form-item class="el-icon-unlock" label="密码">
            <el-input v-model="form.pass" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    onSubmit() {
        let _this=this;
      this.$ajax
        .get(
          "http://localhost:5560/getAdminData?userNumber=" +
            this.form.name +
            "&userPass=" +
            this.form.pass
        )
        .then(
          function(res) {
            var result = res;
            console.log(res.data);
            if (res.data.result == 1) {
              console.log("正确");
               _this.$router.push({path:'/MainPage'});
            }
          },
          function(res) {
            var result = res;
            console.log("error:" + res);
          }
        );
      console.log("submit!");
    }
  }
};
</script>
<style>
</style>