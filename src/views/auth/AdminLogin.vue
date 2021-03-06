<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card :loading="isLoading" width="374">
          <v-alert v-model="showAlert" dense type="error">
            The email or password you entered are incorrect.
            {{ errorLoginMessage }}
          </v-alert>
          <template slot="progress">
            <v-progress-linear height="10" indeterminate></v-progress-linear>
          </template>
          <v-card-title class="d-flex justify-center">{{
            $t("general.auth.adminLogin")
          }}</v-card-title>
          <v-form ref="loginForm" class="ma-3" @submit.prevent="login">
            <v-text-field
              label="Username"
              v-model="username"
              placeholder=""
              :rules="usernameRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              :label="$t('general.auth.password')"
              v-model="password"
              type="password"
              placeholder=""
              :rules="passwordRules"
              outlined
              required
            ></v-text-field>
            <v-card-text class="py-1 px-1 yellow">
              (debug) TEST LOGIN<br />
              - [admin] admin@system.com 12345678<br />
              - [user login is preparing...] <br />
            </v-card-text>
            <v-card-actions>
              <v-checkbox
                v-model="rememberMe"
                :label="$t('general.auth.rememberMe')"
              >
              </v-checkbox>
              <v-row class="d-flex justify-end mr-1 card-white-space">
                <v-btn class="pa-2" color="primary" type="submit">
                  {{ $t("general.auth.login") }}
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
      <v-container class="d-flex justify-center">
        <v-card width="374" elevation="0">
          <a href="#" class="text-decoration-none">{{
            $t("general.auth.adminLogin")
          }}</a>
        </v-card>
      </v-container>
      <v-container>
        <locale-selector style="width:150px"></locale-selector>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import LocaleSelector from "@components/LocaleSelector.vue";
export default {
  components: { LocaleSelector },
  data: () => ({
    username: "",
    password: "",
    remember: false,
    rememberMe: false,
    usernameRules: [
      v => !!v || "E-mail is required",
    ],
    passwordRules: [v => !!v || "Password is required"]
  }),

  computed: mapState({
    isLoading: state => state.auth.isLoading,
    showAlert: state => state.auth.showAlert,
    errorLoginMessage: state => state.auth.errorLoginMessage
  }),
  mounted() {
    if (localStorage.getItem("credentials")) {
      let credentials = JSON.parse(localStorage.getItem("credentials"));
      this.username = credentials.username;
      this.password = credentials.password;
      this.rememberMe = credentials.rememberMe;
    }
  },
  methods: {
    login() {
      if(this.$refs.loginForm.validate()){
        let credentials = {
          username: this.username,
          password: this.password,
          remember: this.remember,
          rememberMe: this.rememberMe
        };
        let guard = "admin";
        this.$store.dispatch("auth/login", { credentials, guard });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
