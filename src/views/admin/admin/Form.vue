<template>
  <div>
    <v-skeleton-loader
      v-if="loadingComponent"
      type="card-avatar, article, actions"
    >
    </v-skeleton-loader>
    <v-container class="text-h5 mb-2 font-weight-bold ml-2">
      {{
        $route.meta.editPage
          ? $t("general.admin.adminEdit")
          : $t("general.admin.adminCreate")
      }}
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-sheet
      v-if="!loadingComponent"
      elevation="1"
      min-height="70vh"
      width="100%"
      :rounded="'sm'"
    >
      <v-container class="px-10">
        <v-form ref="eventForm" @submit.prevent="submit">
          <g-input-group required :title="$t('general.admin.name')">
            <v-text-field
              :rules="rules.name"
              v-model="item.name"
              :placeholder="$t('general.admin.name')"
              outlined
            ></v-text-field>
          </g-input-group>
          <g-input-group required :title="$t('general.admin.email')">
            <v-text-field
              :rules="emailUsed ? rules.emailUsedMessage : rules.email"
              v-model="item.email"
              :placeholder="$t('general.admin.name')"
              @change="emailUsed = false"
              outlined
            ></v-text-field>
          </g-input-group>
          <g-input-group
            v-if="showPassword"
            required
            :title="$t('general.admin.password')"
          >
            <g-password-input
              :rules="rules.password"
              outlined
              v-model="item.password"
            ></g-password-input>
          </g-input-group>
          <g-input-group v-else :title="$t('general.auth.password')">
            <v-btn @click="showPassword = true">{{
              $t("general.auth.showPassword")
            }}</v-btn>
          </g-input-group>
          <v-container class="d-flex justify-center mt-6">
            <v-btn
              type="submit"
              :loading="loadingBtn"
              :disabled="loadingBtn"
              color="primary"
              class="px-12"
              >{{ $t("general.event.save") }}</v-btn
            >
          </v-container>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
import { store, getForm, update, getAll } from "@services/crud";
import GInputGroup from "@components/form_input/GInputGroup.vue";
import GPasswordInput from "@components/form_input/GPasswordInput.vue";
export default {
  data() {
    return {
      rules: {
        name: [v => !!v || "Name is required"],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [
          v => !!v || "Password is required",
          v => v.length >= 8 || "Password must be at least 8 characters"
        ],
        emailUsedMessage: ["E-mail already used"]
      },
      item: {
        id: null,
        name: "",
        email: "",
        password: ""
      },
      formData: {},
      editPage: false,
      submitUrl: "",
      loadingComponent: false,
      showPassword: true,
      emailUsed: false,
      loadingBtn: false,
      currentAdminId: 0
    };
  },
  methods: {
    async submit() {
      let payload = new FormData();
      this.loadingBtn = true;
      if (this.$refs.eventForm.validate()) {
        payload.append("display_name", this.item.name);
        payload.append("email", this.item.email);
        if (this.showPassword) {
          payload.append("password", this.item.password);
        }

        // Check if email already used
        let checkEmail = await this.checkEmailUsed();
        if (checkEmail) {
          this.emailUsed = checkEmail;
          // if form validation failed
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
          this.loadingBtn = false;
        } else {
          const res = this.editPage
            ? await update(this.submitUrl, payload)
            : await store(this.submitUrl, payload);
          if (res) {
            this.loadingBtn = false;
            this.$router.push({ name: "admin.admin" });
          }
        }
      } else {
        // if form validation failed
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        this.loadingBtn = false;
      }
    },
    checkEmailUsed: async function() {
      try {
        let url = "/admin/admin/check-email-used";
        const email = this.item.email;
        if (this.editPage) {
          const id = this.currentAdminId;
          const res = await getAll(url, { email, id });
          return res.email_used;
        } else {
          const res = await getAll(url, { email });
          return res.email_used;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  async created() {
    this.loadingComponent = true;
    try {
      const form = await getForm(this.$route.path);
      if (this.$route.meta.editPage) {
        this.editPage = true;
        this.showPassword = false;
        let { formData, submitUrl, item } = form;
        this.item = {
          ...this.item,
          name: item.display_name,
          email: item.email,
          password: item.password
        };
        this.formData = formData;
        this.submitUrl = submitUrl;
        this.currentAdminId = item.id;
      } else {
        let { formData, submitUrl } = form;
        this.formData = formData;
        this.submitUrl = submitUrl;
      }
    } catch (err) {
      console.log(err);
    }
    this.loadingComponent = false;
  },
  components: {
    GInputGroup,
    GPasswordInput
  }
};
</script>
