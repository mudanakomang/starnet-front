<template>
  <main class="form-chank login-content center">
    <h2>ログイン</h2>
    <p>はじめてご利用の方は<a href="/signup" class="register">新規登録</a></p>
      <input type="email" v-model="email" name="email" placeholder="メールアドレス" class="textbox center" required>
      <input type="password" v-model="password" name="password"  placeholder="パスワード" class="textbox center" required>
      <input type="submit" value="ログイン" class="button center" @click="login">
    <a href="#" class="link">パスワードをお忘れですか？</a>
  </main>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: { },
  data: () => ({
    email: "",
    password: "",
    remember: false
  }),
  created() {
      document.title = "ログイン";
  },
  computed: mapState({
    isLoading: state => state.auth.isLoading
  }),

  methods: {
    login() {
      let credentials = {
        email: this.email,
        password: this.password,
        remember: this.remember
      };
      this.$store.dispatch("auth/login", { credentials });
    }
  }
};
</script>

<style scoped src="@static/css/login/index.css">
</style>
