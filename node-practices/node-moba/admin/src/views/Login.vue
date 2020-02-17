<template>
  <div>
    <el-card header="请先登录">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.admin_name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
        const res = await this.$http.post('login', this.model)
        console.log(res.data)
        // sessionStorage._token = res.data.token
        localStorage._token = res.data.token
        // 登录成功后跳转到首页
        this.$router.push('/')
        this.$message({
            type: 'success',
            message: '登录成功'
        })
    }
  }
};
</script>

<style scoped>
.el-card {
  width: 30rem;
  margin: 10rem auto;
}
</style>