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
          ? $t("general.event.eventEdit")
          : $t("general.event.eventCreate")
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
          <g-input-group required :title="$t('general.event.eventCategory')">
            <v-select
              :rules="rules.eventCategory"
              v-model="item.eventCategory"
              :items="listCategories"
              item-value="id"
              item-text="name"
              @change="changeCategory"
              outlined
            ></v-select>
          </g-input-group>
          <g-input-group required :title="$t('general.event.eventName')">
            <v-text-field
              :rules="rules.eventName"
              v-model="item.eventName"
              :placeholder="$t('general.event.eventName')"
              outlined
            ></v-text-field>
          </g-input-group>
          <g-input-group required :title="$t('general.event.owner')">
            <v-select
              :rules="rules.owner"
              v-model="item.owner"
              :items="listEventOwners"
              item-value="id"
              item-text="display_name"
              @change="changeUser"
              :loading="isSelectLoading"
              outlined
            ></v-select>
          </g-input-group>
          <g-input-group required :title="$t('general.event.openTime')">
            <v-row>
              <v-col cols="12" sm="4">
                <g-date-picker
                  :tf-label="$t('general.event.date')"
                  :tf-rules="rules.date"
                  v-model="item.date"
                >
                </g-date-picker>
              </v-col>
              <v-col cols="12" sm="4">
                <g-time-picker
                  :tf-label="$t('general.event.start')"
                  :tf-rules="rules.start"
                  v-model="item.start"
                >
                </g-time-picker>
              </v-col>
              <v-col cols="12" sm="4">
                <g-time-picker
                  :tf-label="$t('general.event.end')"
                  :tf-rules="rules.end"
                  v-model="item.end"
                >
                </g-time-picker>
              </v-col>
            </v-row>
          </g-input-group>
          <g-input-group optional :title="$t('general.event.onlineEvent')">
            <v-checkbox
              v-model="item.onlineEvent"
              label="オンラインイベントとして扱う"
            ></v-checkbox>
          </g-input-group>
          <g-input-group required :title="$t('general.event.prefectures')">
            <v-select
              :rules="rules.prefecture"
              v-model="item.prefecture"
              :items="listPrefectures"
              item-value="id"
              item-text="name"
              @change="changePrefecture"
              outlined
            ></v-select>
          </g-input-group>
          <g-input-group :title="$t('general.event.addressAfterCity')">
            <v-text-field
              :placeholder="$t('general.event.addressAfterCity')"
              v-model="item.addressAfterCity"
              outlined
              :messages="
                '※こちらに掲載した住所はグーグルマップで表示されますので入力の際には正式な情報をお願いします。'
              "
            ></v-text-field>
            <label></label>
          </g-input-group>
          <g-input-group required :title="$t('general.event.coverImage')">
            <g-image-input v-model="item.coverImage"></g-image-input>
            <p
              v-if="validateImage.showImageMessage"
              style="color:red;"
              class="caption ml-4"
            >
              {{ this.validateImage.imageValidateMessage }}
            </p>
            <label style="color:red;"
              >画像をアップロードして下さい。JPEG、JPG、PNG、およびGIFファイルのみが許可されて、<br />容量は25MBまでです。
              <br />
              アップロード後、画像は幅600px、高さ400pxに変換されます。</label
            >
          </g-input-group>
          <g-input-group required :title="$t('general.event.detail')">
            <v-textarea
              :rules="rules.detail"
              :placeholder="$t('general.event.detail')"
              v-model="item.description"
              outlined
            ></v-textarea>
          </g-input-group>
          <g-input-group required :title="$t('general.event.publicPreference')">
            <v-radio-group
              row
              v-model="item.isPublish"
              @change="changePublicPreference"
            >
              <v-radio :label="$t('general.event.public')" value="1"></v-radio>
              <v-radio :label="$t('general.event.private')" value="0"></v-radio>
            </v-radio-group>
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
import GDatePicker from "../../_components/form_input/GDatePicker.vue";
import GTimePicker from "../../_components/form_input/GTimePicker.vue";
import GImageInput, {
  imageInitial
} from "../../_components/form_input/GImageInput.vue";
export default {
  data() {
    return {
      rules: {
        eventCategory: [v => !!v || "Event Category is required"],
        eventName: [v => !!v || "Event Name is required"],
        owner: [v => !!v || "Owner is required"],
        date: [v => !!v || "Date is required"],
        start: [v => !!v || "Start is required"],
        end: [v => !!v || "End is required"],
        prefecture: [v => !!v || "Prefecture is required"],
        detail: [v => !!v || "Detail is required"],
        coverImageRequired: "Cover Image is required",
        coverImageMaxSize: "File size max is 25MB"
      },
      item: {
        id: null,
        eventCategory: "",
        eventName: "",
        owner: "",
        date: "",
        start: "",
        end: "",
        onlineEvent: "",
        prefecture: "",
        addressAfterCity: "",
        coverImage: imageInitial(),
        description: "",
        isPublish: "1"
      },
      validateImage: {
        coverImageReady: false,
        showImageMessage: false,
        fileIsMaxSize: false,
        imageValidateMessage: ""
      },
      formData: {},
      editPage: false,
      submitUrl: "",
      loadingComponent: false,
      listCategories: [],
      listEventOwners: [],
      listPrefectures: [],
      checkAllValidate: false,
      loadingBtn: false,
      isSelectLoading: false
    };
  },
  methods: {
    async submit() {
      this.loadingBtn = true;
      let payload = new FormData();
      let options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      if (this.$refs.eventForm.validate()) {
        payload.append("category_id", this.item.eventCategory);
        payload.append("owner_user_id", this.item.owner);
        payload.append("name", this.item.eventName);
        payload.append("event_date", this.item.date);
        payload.append("event_time_start", this.item.start);
        payload.append("event_time_finish", this.item.end);
        payload.append("is_online", this.item.onlineEvent ? 1 : 0);
        payload.append("prefecture_id", this.item.prefecture);
        payload.append("address", this.item.addressAfterCity);
        //payload.append("image_id", this.item.coverImage);
        payload.append("description", this.item.description);
        payload.append("is_publish", this.item.isPublish);
        payload.append(
          "location_image_modified",
          this.item.coverImage.isModified ? 1 : 0
        );
        if (this.item.coverImage.file) {
          payload.append("cover_image", this.item.coverImage.file);
          if (!this.validateImage.fileIsMaxSize) {
            this.validateImage.showImageMessage = false;
            this.validateImage.coverImageReady = true;
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

      // Validate image input
      if (!this.editPage) {
        if (!this.item.coverImage.file) {
          this.validateImage.imageValidateMessage = this.rules.coverImageRequired;
          this.validateImage.showImageMessage = true;
          this.validateImage.coverImageReady = false;
        }
      } else {
        if (this.item.coverImage.isModified) {
          if (!this.item.coverImage.file) {
            this.validateImage.imageValidateMessage = this.rules.coverImageRequired;
            this.validateImage.showImageMessage = true;
            this.validateImage.coverImageReady = false;
          }
        }
      }
      if (this.validateImage.coverImageReady) {
        this.checkAllValidate = true;
      }
      //----------------------
      if (this.checkAllValidate) {
        const res = this.editPage
          ? await update(this.submitUrl, payload, options)
          : await store(this.submitUrl, payload, options);
        if (res) {
          this.loadingBtn = false;
          this.$router.push({ name: "admin.event" });
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
    changeCategory(category) {
      this.eventCategory = category.id;
      this.getEventOwner(category);
    },
    changeUser(user) {
      this.owner = user.id;
    },
    changePrefecture(prefecture) {
      this.prefecture = prefecture.id;
    },
    changePublicPreference(preference) {
      this.item.isPublish = preference;
    },
    checkCurrentFile(fileSize) {
      // Check size of file
      // 25 => 25 MB
      if (fileSize > 25) {
        this.validateImage.imageValidateMessage = this.rules.coverImageMaxSize;
        this.validateImage.showImageMessage = true;
        this.validateImage.fileIsMaxSize = true;
        this.validateImage.coverImageReady = false;
      } else {
        this.validateImage.showImageMessage = false;
        this.validateImage.fileIsMaxSize = false;
        this.validateImage.coverImageReady = true;
      }
    },
    getEventOwner: async function(categoryId){
      // Refresh event owner list related of selected category
      try{
        let url = "admin/event/create";
        if(this.editPage){
          url = this.submitUrl + '/edit';
        }
        this.isSelectLoading = true;
        const res = await getAll(url, {
          categoryId
        });
        this.listEventOwners = res.users;
      } catch (err) {
        console.log(err);
      } finally {
        this.isSelectLoading = false;
      }
    }
  },
  watch: {
    item: {
      handler: function(val) {
        if (val.coverImage.file) {
          this.validateImage.fileIsMaxSize = false;
          this.validateImage.coverImageReady = true;
          let fileSize = (val.coverImage.file.size / (1024 * 1024)).toFixed(0);
          this.checkCurrentFile(fileSize);
        }
      },
      deep: true
    }
  },
  async created() {
    this.loadingComponent = true;
    try {
      const form = await getForm(this.$route.path);
      if (this.$route.meta.editPage) {
        this.editPage = true;
        let {
          formData,
          submitUrl,
          categories,
          users,
          prefectures,
          item
        } = form;
        this.item = {
          ...this.item,
          eventCategory: item.category,
          eventName: item.name,
          owner: item.user,
          date: item.event_date,
          start: item.event_time_start,
          end: item.event_time_finish,
          onlineEvent: item.is_online,
          prefecture: item.prefecture,
          addressAfterCity: item.address ? item.address : "",
          description: item.description,
          isPublish: item.is_publish ? "1" : "0"
        };
        this.formData = formData;
        this.submitUrl = submitUrl;
        this.listCategories = categories;
        this.listEventOwners = users;
        this.listPrefectures = prefectures;
        this.validateImage.coverImageReady = true;
        this.validateImage.showImageMessage = false;
        if (item.cover_image_url) {
          this.item.coverImage.url = item.cover_image_url;
        }

        this.item.eventCategory = item.category.id;
        this.item.prefecture = item.prefecture.id;
        this.item.owner = item.user.id;
      } else {
        let { formData, submitUrl, categories, users, prefectures } = form;
        this.formData = formData;
        this.submitUrl = submitUrl;
        this.listCategories = categories;
        this.listEventOwners = users;
        this.listPrefectures = prefectures;
      }
    } catch (err) {
      console.log(err);
    }
    this.loadingComponent = false;
  },
  components: {
    GInputGroup,
    GDatePicker,
    GImageInput,
    GTimePicker
  }
};
</script>
