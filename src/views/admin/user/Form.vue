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
          ? $t("general.page.userEdit")
          : $t("general.page.userCreate")
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
        <v-form ref="userForm" @submit.prevent="submit">
          <g-input-group required :title="$t('general.user.fullName')">
            <v-text-field
              :rules="rules.name"
              :placeholder="$t('general.user.fullName')"
              outlined
              v-model="item.displayName"
            ></v-text-field>
          </g-input-group>
          <g-input-group required :title="$t('general.auth.email')">
            <v-text-field
              :rules="emailUsed ? rules.emailUsedMessage : rules.email"
              :placeholder="$t('general.auth.email')"
              outlined
              v-model="item.email"
              @change="emailUsed = false"
            ></v-text-field>
          </g-input-group>
          <g-input-group
            v-if="showPassword"
            required
            :title="$t('general.auth.password')"
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
          <g-input-group required :title="$t('general.form.gender')">
            <v-radio-group v-model="item.gender" :rules="rules.gender" row>
              <v-radio :label="$t('general.gender.male')" :value="1"></v-radio>
              <v-radio
                :label="$t('general.gender.female')"
                :value="2"
              ></v-radio>
            </v-radio-group>
          </g-input-group>
          <g-input-group :title="$t('general.time.birthDate')">
            <g-date-picker v-model="item.date"></g-date-picker>
          </g-input-group>
          <g-input-group :title="$t('general.form.phone')">
            <v-text-field
              :placeholder="$t('general.form.phone')"
              outlined
              v-model="item.phone"
            ></v-text-field>
          </g-input-group>
          <g-input-group :title="$t('general.form.postCode')">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  :placeholder="$t('general.form.postCode')"
                  outlined
                  maxlength="7"
                  v-model="item.postCode"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-btn @click="searchAddress(item.postCode)">{{
                  $t("general.button.automaticInputAddress")
                }}</v-btn>
              </v-col>
            </v-row>
          </g-input-group>
          <g-input-group :title="$t('general.form.address')">
            <v-text-field
              :placeholder="$t('general.form.address')"
              outlined
              v-model="item.address"
            ></v-text-field>
          </g-input-group>
          <g-input-group :title="$t('general.form.profileImage')">
            <g-image-input v-model="item.profileImage"></g-image-input>
          </g-input-group>
          <g-input-group :title="$t('general.form.rating')">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  :rules="rules.rating"
                  :placeholder="$t('general.form.rating')"
                  outlined
                  maxlength="2"
                  v-model="item.rating"
                ></v-text-field>
              </v-col>
            </v-row>
          </g-input-group>
          <g-input-group :title="$t('general.form.review')">
            <v-textarea
              :placeholder="$t('general.form.review')"
              outlined
              v-model="item.review"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.introduction')">
            <v-textarea
              :placeholder="$t('general.form.introduction')"
              outlined
              v-model="item.introduction"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.carrer')">
            <v-textarea
              :placeholder="$t('general.form.carrer')"
              outlined
              v-model="item.carrer"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.other')">
            <v-textarea
              :placeholder="$t('general.form.other')"
              outlined
              v-model="item.other"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.residence')">
            <v-textarea
              :placeholder="$t('general.form.residence')"
              outlined
              v-model="item.residence"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.title')">
            <v-textarea
              :placeholder="$t('general.form.title')"
              outlined
              v-model="item.title"
            ></v-textarea>
          </g-input-group>
          <g-input-group :title="$t('general.form.eventOwner')">
            <v-checkbox
              v-model="item.eventOwner"
              label="主催者として扱う"
              class="ma-0 pa-0"
            ></v-checkbox>
          </g-input-group>
          <g-input-group :title="$t('general.form.availableEvent')">
            <v-row>
              <v-col
                v-for="category in formData.categories"
                :key="category.value"
                cols="12"
                sm="12"
                md="4"
                class="py-0"
              >
                <v-checkbox
                  multiple
                  v-model="item.selectedCategories"
                  :label="category.text"
                  :value="category.value"
                  class="ma-0 pa-0"
                ></v-checkbox>
              </v-col>
            </v-row>
          </g-input-group>
          <g-input-group
            v-if="editPage"
            :title="$t('general.form.characterType')"
          >
            <v-select
              v-if="item.gender == 1"
              v-model="item.selectedDiagnosisType"
              :items="formData.diagnosis_type_male"
              outlined
            ></v-select>
            <v-select
              v-else
              v-model="item.selectedDiagnosisType"
              :items="formData.diagnosis_type_female"
              outlined
            ></v-select>
          </g-input-group>
          <g-input-group
            v-if="editPage"
            :title="$t('general.form.diagnosisResult')"
          >
            <v-row>
              <v-col cols="12" sm="12" md="3">
                簡易
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <template v-if="item.gender == 1">王子: </template>
                <template v-else>姫: </template>

                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.simple_type_a
                }}</template>
                <template v-else>0</template>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <template v-if="item.gender == 1">カウンセラー: </template>
                <template v-else>秘書: </template>

                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.simple_type_b
                }}</template>
                <template v-else>0</template>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                <template v-if="item.gender == 1">男の子: </template>
                <template v-else>母: </template>

                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.simple_type_c
                }}</template>
                <template v-else>0</template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="3">
                完全
              </v-col>
              <v-col cols="12" sm="12" md="3">
                プラス:
                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.complete_plus
                }}</template>
                <template v-else>0</template>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                マイナス:
                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.complete_minus
                }}</template>
                <template v-else>0</template>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="3">
                理想
              </v-col>
              <v-col cols="12" sm="12" md="3">
                A:
                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.ideal_type_a
                }}</template>
                <template v-else>0</template>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                B:
                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.ideal_type_b
                }}</template>
                <template v-else>0</template>
              </v-col>
              <v-col cols="12" sm="12" md="3">
                C:
                <template v-if="item.latestDiagnosis">{{
                  item.latestDiagnosis.ideal_type_c
                }}</template>
                <template v-else>0</template>
              </v-col>
            </v-row>
          </g-input-group>
          <g-input-group :title="$t('general.form.responsibleCounselor')">
            <v-select
              v-model="item.counselor"
              :items="formData.councelors"
              outlined
            ></v-select>
          </g-input-group>
          <v-container class="d-flex justify-center mt-6">
            <v-btn
              type="submit"
              color="primary"
              class="px-12"
              :loading="loadingBtn"
              :disabled="loadingBtn"
              >{{ $t("general.button.save") }}</v-btn
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
import GDatePicker from "../../_components/form_input/GDatePicker.vue";
import GImageInput, {
  imageInitial
} from "../../_components/form_input/GImageInput.vue";
import { handleApiError } from "@/plugins/axios";
export default {
  data() {
    return {
      rules: {
        name: [v => !!v || "Name is required"],
        password: [
          v => !!v || "Password is required",
          v => v.length >= 8 || "Password must be at least 8 characters"
        ],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        gender: [v => !!v || "Gender is required"],
        rating: [v => v <= 50 || "Max rating should be 50"],
        emailUsedMessage: ["E-mail already used"]
      },
      item: {
        id: null,
        email: "",
        displayName: "",
        password: "",
        gender: "",
        date: "",
        phone: "",
        postCode: "",
        address: "",
        profileImage: imageInitial(),
        rating: "",
        review: "",
        introduction: "",
        carrer: "",
        other: "",
        residence: "",
        title: "",
        eventOwner: false,
        selectedDiagnosisType: "",
        counselor: "",
        selectedCategories: []
      },
      formData: {},
      editPage: false,
      submitUrl: "",
      loadingComponent: false,
      showPassword: true,
      loadingBtn: false,
      emailUsed: false,
      currentUserId: 0
    };
  },
  methods: {
    async submit() {
      this.loadingBtn = true;
      if (this.$refs.userForm.validate()) {
        let options = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };

        // append user data for axios
        let payload = new FormData();
        if (this.editPage) {
          payload.append("id", this.item.id);
        }
        payload.append("email", this.item.email);
        payload.append("display_name", this.item.displayName);
        payload.append("password", this.item.password);
        payload.append("gender", this.item.gender);
        payload.append("birth_date", this.item.date);
        payload.append("phone", this.item.phone);
        payload.append("post_code", this.item.postCode);
        payload.append("address", this.item.address);
        payload.append(
          "profile_image_modified",
          this.item.profileImage.isModified ? 1 : 0
        );
        if (this.item.profileImage.file) {
          payload.append("profile_image", this.item.profileImage.file);
        }
        payload.append("rating", this.item.rating);
        payload.append("review", this.item.review);
        payload.append("introduction", this.item.introduction);
        payload.append("carrer", this.item.carrer);
        payload.append("other", this.item.other);
        payload.append("residence", this.item.residence);
        payload.append("title", this.item.title);
        payload.append("event_owner", this.item.eventOwner);
        payload.append(
          "selected_diagnosis_type",
          this.item.selectedDiagnosisType
        );
        payload.append("counselor_id", this.item.counselor);
        payload.append("categories", this.item.selectedCategories);

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
          // store/update user data to API
          const res = this.editPage
            ? await update(this.submitUrl, payload, options)
            : await store(this.submitUrl, payload, options);
          if (res) {
            this.loadingBtn = false;
            this.$router.push({ name: "admin.user" });
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

    // Method for checking email if already used
    checkEmailUsed: async function() {
      try {
        let url = "/admin/user/check/email";
        const email = this.item.email;
        if (this.editPage) {
          const id = this.currentUserId;
          const res = await getAll(url, { email, id });
          return res.email_used;
        } else {
          const res = await getAll(url, { email });
          return res.email_used;
        }
      } catch (err) {
        console.log(err);
      }
    },

    // Method for automatic input address based on Post Code
    searchAddress: async function(postCode) {
      try {
        let url = "/admin/user/search/address";
        const postcode = postCode;
        const res = await getAll(url, { postcode });
        this.item.address = res.address;
      } catch (err) {
        throw handleApiError(err, true);
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

        // get user and form data
        let { formData, submitUrl, item, categories } = form;
        this.item = {
          ...this.item,
          displayName: item.display_name,
          email: item.email,
          gender: item.gender == 1 ? 1 : 2,
          date: item.birth_date
            ? new Date(item.birth_date).toISOString().substr(0, 10)
            : "",
          phone: item.phone ? item.phone : "",
          postCode: item.post_code ? item.post_code : "",
          address: item.address ? item.address : "",
          rating: item.rating ? item.rating : "",
          review: item.review ? item.review : "",
          introduction: item.introduction ? item.introduction : "",
          carrer: item.carrer ? item.carrer : "",
          other: item.other ? item.other : "",
          residence: item.residence ? item.residence : "",
          title: item.title ? item.title : "",
          eventOwner: item.event_owner ? item.event_owner : false,
          selectedDiagnosisType: item.selected_diagnosis_type
            ? item.selected_diagnosis_type
            : "",
          latestDiagnosis: item.latest_diagnosis,
          counselor: item.counselor_id ? item.counselor_id : ""
        };
        this.item.selectedCategories = categories ? categories : [];
        if (item.image_url) {
          this.item.profileImage.url = item.image_url;
        }
        this.formData = formData;
        this.submitUrl = submitUrl;
        this.currentUserId = item.id;
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
    GPasswordInput,
    GDatePicker,
    GImageInput
  }
};
</script>
