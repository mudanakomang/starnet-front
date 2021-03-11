<template>
  <header class="is-flex vertical-center">
    <div class="wrapper is-flex vertical-center center">
      <div class="header-nav-wrap is-flex">
        <div class="logo">
          <img :src="require('@static/images/header-logo.png')" alt="Logo">
        </div>
        <div class="is-sp" id="Hamburger">
          <span id="line1"></span>
          <span id="line2"></span>
          <span id="line3"></span>
        </div>
        <div class="is-sp" id="SpNav" >
          <div class="logo is-flex vertical-center">
            <img class="center" :src="require('@static/images/header-logo.png')" alt="Logo">
          </div>
          <ul>
            <li><a href="/event">開催イベント一覧</a></li>
            <li><a href="/owner">主催者一覧</a></li>
            <li><a href="/event-category">イベントカテゴリ一覧</a></li>
          </ul>
          <div class="header-button-wrap is-flex" v-if="!isAuthenticated">
            <a class="login is-flex vertical-center" href="/login">
              <div class="center">ログイン</div>
            </a>
            <a class="register is-flex vertical-center" href="/signup">
              <div class="center">新規登録</div>
            </a>
          </div>
        </div>
        <nav class="is-pc is-flex vertical-center" >
          <ul class="is-flex vertical-center">
            <li><a href="/event">開催イベント一覧</a></li>
            <li><a href="/owner">主催者一覧</a></li>
            <li><a href="/event-category">イベントカテゴリ一覧</a></li>
          </ul>
        </nav>
      </div>
      <div class="is-pc header-button-wrap is-flex" v-if="!isAuthenticated">
        <a class="login is-flex vertical-center" href="/login">
          <div class="center">ログイン</div>
        </a>
        <a class="register is-flex vertical-center" href="/signup">
          <div class="center">新規登録</div>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
        exit: true,
      accountMenus: [
        {
          id: "owner.event",
          title: "general.event.eventOwningList",
          icon: "mdi-logout",
          action: () => {
            this.$router.push({ name: "user.owner.event" });
          }
        },
        {
          id: "logout",
          title: "general.auth.logout",
          icon: "mdi-logout",
          action: () => {
            this.$store.dispatch("auth/logout");
          }
        }
      ]
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: store =>
        store.auth.info.status && store.auth.info.guard === "",
      locale: store => store.global.locale,
      languages: store => store.global.languages
    }),
    myMenus (){
        return [
            {
                title: this.$t("general.appBar.userInformation"),
                action:  () => {
                    this.$router.push({ name: "user.mypage" });
                }
            },
            {
                title: this.$t("general.appBar.judgmentResult"),
                action:  () => {
                    this.$router.push({ name: "user.mypage.diagnosis" });
                }
            },
            {
                title: this.$t("general.appBar.appliedEvent"),
                action: () => {
                    this.$router.push({ name: "user.mypage.event"})
                }
            },
            {
                title: this.$t("general.appBar.hostEventList"),
                action: () => {
                    this.$router.push({ name: "user.owner.event"})
                }
            },
            {
                title: this.$t("general.appBar.hostEventCreate"),
                action: () => {
                    this.$router.push({ name: "user.owner.event.create"})
                }
            },{
                title: this.$t("general.appBar.billingList"),
                action: () => {
                    this.$router.push({ name: "user.owner.sales"})
                }
            }
        ]
    }
  },
  methods: {
    ...mapActions({
      setLocale: "global/setLocale"
    })
  },
  mounted(){
   require('@static/js/common.js')
  },
  created() {}
};
</script>
