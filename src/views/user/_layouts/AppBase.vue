<template>
  <div>
    <base-app-bar></base-app-bar>
    <v-main>
      <base-notification-snackbar></base-notification-snackbar>
      <v-progress-linear v-if="loadingPage" indeterminate></v-progress-linear>
      <v-container class="px-0 mb-10" fluid>
        <router-view :key="$route.path"></router-view>
      </v-container>
      <base-footer></base-footer>
    </v-main>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BaseAppBar from "./BaseAppBar.vue";
import BaseFooter from "./BaseFooter";
import BaseNotificationSnackbar from "./BaseNotificationSnackbar.vue";
export default {
  computed: mapState({
    loadingPage: state => state.global.loadingPage
  }),
  components: {
    BaseFooter,
    BaseAppBar,
    BaseNotificationSnackbar
  }
};
</script>

<style src="@static/css/common.css"></style>
<style src="@static/css/reset.css"></style>
