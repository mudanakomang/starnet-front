<template>
  <div class="form-chank-small center">
    <h2>{{$route.meta.editPage ? "主催イベント - イベント編集": "主催イベント - イベント作成" }}</h2>
    <div class="form-content is-flex">
      <label for="MiddleCategory">イベントカテゴリ<span>必須</span></label>
      <select name="MiddleCategory" id="Middlecategory" v-model="item.eventCategory" @change="changeCategory">
        <option v-for="option in listCategories"  v-bind:key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
    <div class="form-content is-flex">
      <label for="EventTitle">イベント名</label>
      <input type="text" id="EventTitle" v-model="item.eventName">
    </div>
    <div class="form-content is-flex">
      <label for="">開催日時<span>必須</span></label>
      <p>日付</p><input type="date" v-model="item.date">
      <p>開始</p><input type="time" v-model="item.start">
      <p>終了</p><input type="time" v-model="item.end">
    </div>
    <div class="form-content is-flex">
      <label for="">オンラインイベント</label>
      <input type="checkbox"  v-model="item.onlineEvent">
    </div>
    <div class="form-content is-flex">
      <label for="">都道府県<span>必須</span></label>
      <select name="pref_id" v-model="item.prefecture" @change="changePrefecture">
        <option v-for="prefecture in listPrefectures" v-bind:key="prefecture.id" :value="prefecture.id">
          {{ prefecture.name }}
        </option>
      </select>
    </div>
    <div class="form-content is-flex">
      <label for="">市区町村以降の住所</label>
      <div class="right">
        <input type="text" v-model="item.addressAfterCity">
        <p>
          <small>※こちらに掲載した住所はグーグルマップで表示されますので入力の際には正式な情報をお願いします。</small>
        </p>
      </div>
    </div>
    <div class="form-content is-flex">
      <label for="">カバー画像<span>必須</span></label>
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
    </div>
    <div class="form-content is-flex">
      <label for="">詳細<span>必須</span></label>
      <textarea name="" id="" v-model="item.description"></textarea>
    </div>
    <div class="form-content is-flex">
      <label for="radiobutton">公開設定</label>
        <input type="radio" name="publishPref" value="1" id="publish" class="radio-input" checked v-model="item.isPublish">
        <label for="publish">公開</label>
        <input type="radio" name="publishPref" value="0" id="private" class="radio-input" v-model="item.isPublish">
        <label for="private">非公開</label>
    </div>
    <div class="form-content is-flex">
      <input type="" value="下書きとして保存">
      <input type="submit" value="公開" @click="submit">
    </div>
  </div>
</template>
<script>
    import { store, getForm, update } from "@services/crud";
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
                listPrefectures: [],
                checkAllValidate: false
            };
        },
        methods: {
            async submit() {
                let payload = new FormData();
                let options = {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                };

                    payload.append("category_id", this.item.eventCategory);
                    payload.append("name", this.item.eventName);
                    payload.append("event_date", this.item.date);
                    payload.append("event_time_start", this.item.start);
                    payload.append("event_time_finish", this.item.end);
                    payload.append("is_online", this.item.onlineEvent ? 1 : 0);
                    payload.append("prefecture_id", this.item.prefecture);
                    payload.append("address", this.item.addressAfterCity);
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
                        this.$router.push({ name: "user.owner.event" });
                    }
                }
            },
            changeCategory(category) {
                this.eventCategory = category.id;
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
            document.title =  this.editPage ? "主催イベント - イベント編集" : "主催イベント - イベント作成";
            this.loadingComponent = true;
            try {
                const form = await getForm(this.$route.path);
                if (this.$route.meta.editPage) {
                    this.editPage = true;
                    let {
                        formData,
                        submitUrl,
                        categories,
                        prefectures,
                        item
                    } = form;
                    this.item = {
                        ...this.item,
                        eventCategory: item.category,
                        eventName: item.name,
                        date: item.event_date.slice(0,-9),
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
                    this.listPrefectures = prefectures;
                    this.validateImage.coverImageReady = true;
                    this.validateImage.showImageMessage = false;
                    if (item.cover_image_url) {
                        this.item.coverImage.url = item.cover_image_url;
                    }

                    this.item.eventCategory = item.category.id;
                    this.item.prefecture = item.prefecture.id;
                } else {
                    let { formData, submitUrl, categories, prefectures } = form;
                    this.formData = formData;
                    this.submitUrl = submitUrl;
                    this.listCategories = categories;
                    this.listPrefectures = prefectures;
                }
            } catch (err) {
                console.log(err);
            }
            this.loadingComponent = false;
        },
        components: {
         //   GInputGroup,
           // GDatePicker,
            GImageInput,
         //   GTimePicker
        }
    };
</script>
<style lang="scss" scoped>
  /*@import url(~static_css/user/owner/event/create/index.css);*/
</style>

