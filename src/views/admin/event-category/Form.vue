<template>
  <div>
    <v-skeleton-loader
      v-if="loadingComponent"
      type="card-avatar, article, actions"
    >
    </v-skeleton-loader>
    <v-container class="text-h5 mb-2 font-weight-bold ml-2">
      {{
        $route.meta.editPage ? $t("general.eventCategories.edit")
        : $t("general.eventCategories.create")
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
        <v-form ref="eventCategoryForm" @submit.prevent="submit">
          <g-input-group required :title="$t('general.eventCategories.name')">
            <v-text-field
                    :rules="rules.eventCategoryName"
                    v-model="item.eventCategoryName"
                    :placeholder="$t('general.eventCategories.name')"
                    outlined
            ></v-text-field>
          </g-input-group>
          <g-input-group required :title="$t('general.eventCategories.group')">
            <v-select
                    :rules="rules.eventCategoryGroup"
                    v-model="item.eventCategoryGroup"
                    :items="listEventCategoryGroups"
                    item-value="id"
                    item-text="name"
                    @change="changeEventCategoryGroup"
                    outlined
            ></v-select>
          </g-input-group>
          <g-input-group required :title="$t('general.eventCategories.price')">
            <v-text-field
                    :rules="rules.price"
                    v-model.number="item.price"
                    :placeholder="$t('general.eventCategories.price')"
                    outlined
            >
              <template v-slot:append>
                <span>円</span>
              </template>
            </v-text-field>
          </g-input-group>
          <g-input-group required :title="$t('general.eventCategories.coverImage')">
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
          <g-input-group required :title="$t('general.eventCategories.detail')">
            <v-textarea
                    :rules="rules.detail"
                    :placeholder="$t('general.eventCategories.detail')"
                    v-model="item.description"
                    outlined
            ></v-textarea>
          </g-input-group>
          <g-input-group required :title="$t('general.eventCategories.displayOrder')">
            <v-text-field
                    :rules="displayOrderExists ? rules.displayOrderExistsMessage:rules.displayOrder"
                    v-model.number="item.displayOrder"
                    :placeholder="$t('general.eventCategories.displayOrder')"
                    @change="displayOrderExists = false"
                    outlined
            ></v-text-field>
          </g-input-group>
          <g-input-group optional :title="$t('general.eventCategories.invitationalEvent')">
            <v-checkbox v-model="item.invitationalEvent"></v-checkbox>
          </g-input-group>
          <v-container class="d-flex justify-center mt-6">
            <v-btn type="submit" color="primary" class="px-12">{{
                $t("general.eventCategories.save")
              }}</v-btn>
          </v-container>
        </v-form>
      </v-container>
    </v-sheet>
  </div>
</template>
<script>
  import { store, getForm, getAll, update} from "@services/crud";
  import GInputGroup from "@components/form_input/GInputGroup.vue";
  import GImageInput, {
      imageInitial
  } from "../../_components/form_input/GImageInput.vue";
  export default {
      components: {
          GInputGroup,
          GImageInput,
      },
      data() {
          return {
              rules: {
                  eventCategoryName: [v => !!v || "Event Category Name is required"],
                  eventCategoryGroup: [v => !!v || "Event Category Group is required"],
                  price:  [
                      v => !!v || "Price is required",
                      v => Number.isInteger(Number(v)) || "The value must be an integer number"
                  ],
                  coverImageRequired: "Cover Image is required",
                  coverImageMaxSize: "File size max is 25MB",
                  detail: [v => !!v || "Detail is required"],
                  displayOrder: [
                      v => !!v || "Display Order is required",
                      v => Number.isInteger(Number(v)) || "The value must be an integer number"
                  ],
                  displayOrderExistsMessage: ["Display order has been taken"]
              },
              item: {
                  id: null,
                  eventCategoryName: "",
                  price:"",
                  coverImage: imageInitial(),
                  displayOrder:"",
                  invitationalEvent: "",
                  description: "",
                  isPublish: "1"
              },
              validateImage: {
                  coverImageReady: false,
                  showImageMessage: false,
                  fileIsMaxSize: false,
                  imageValidateMessage: "",
                  detail: "",
                  isPublish: 1,
              },
              formData: {},
              editPage: false,
              submitUrl: "",
              loadingComponent: false,
              listEventCategoryGroups: [],
              displayOrderExists: false,
          };
      },
      methods: {
          async submit(){
              let payload = new FormData();
              let options = {
                  headers: {
                      "Content-Type": "multipart/form-data"
                  }
              };
              if(this.$refs.eventCategoryForm.validate()){
                  payload.append("name",this.item.eventCategoryName);
                  payload.append("category_group_id",this.item.eventCategoryGroup);
                  payload.append("price",this.item.price);
                  payload.append("description", this.item.description);
                  payload.append("display_order", this.item.displayOrder);
                  payload.append('is_invitational_event', this.item.invitationalEvent ? 1 : 0);
                  payload.append('is_publish_list',this.item.isPublish);
                  payload.append(
                      "cover_image_modified",
                      this.item.coverImage.isModified ? 1 : 0
                  );
                  if (this.item.coverImage.file) {
                      payload.append("cover_image", this.item.coverImage.file);
                      if (!this.validateImage.fileIsMaxSize) {
                          this.validateImage.showImageMessage = false;
                          this.validateImage.coverImageReady = true;
                      }
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
              let  displayOrderUsed = await this.checkDisplayOrder();
              if (displayOrderUsed){
                  this.displayOrderExists = displayOrderUsed;
              }else{
                  if (this.checkAllValidate) {
                      const res = this.editPage
                          ? await update(this.submitUrl, payload, options)
                          : await store(this.submitUrl, payload, options);
                      if (res) {
                          this.$router.push({ name: "admin.event-category" });
                      }
                  }
              }
          },
          checkDisplayOrder: async function(){
              try{
                  let url = "admin/event-category/check-display-order";
                  const displayOrder = this.item.displayOrder;
                  if(this.editPage){
                      const id = this.item.id;
                      const res = await getAll(url, {displayOrder, id});
                      return res.display_order;
                  }else{
                      const res = await getAll(url, { displayOrder });
                      return res.display_order;
                  }
              }catch(err){
                  console.log(err)
              }
          },
          changeEventCategoryGroup(category){
              this.eventCategoryGroup = category.id;
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
              handler: function (val) {
                  if (val.coverImage.file){
                      this.validateImage.fileIsMaxSize = false;
                      this.validateImage.coverImageReady = true;
                      let fileSize = (val.coverImage.file.size / (1024 * 1024)).toFixed(0);
                      this.checkCurrentFile(fileSize);
                  }
              },
              deep:true
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
                      eventGroups,
                      item
                  } = form;
                  this.item = {
                      ...this.item,
                      id: item.id,
                      eventCategoryName: item.name,
                      eventCategoryGroup: item.category_group_id,
                      price: item.price,
                      description: item.description,
                      displayOrder: item.display_order,
                      invitationalEvent: item.is_invitational_event,
                      isPublish: item.is_publish_list
                  };
                  this.formData = formData;
                  this.submitUrl = submitUrl;
                  this.listEventCategoryGroups = eventGroups;
                  this.validateImage.coverImageReady = true;
                  this.validateImage.showImageMessage = false;
                  if (item.cover_image_url) {
                      this.item.coverImage.url = item.cover_image_url;
                  }
                  this.item.eventCategoryGroup = item.category_group.id;
              } else {
                  let {formData, submitUrl, eventGroups} = form;
                  this.formData = formData;
                  this.submitUrl = submitUrl;
                  this.listEventCategoryGroups = eventGroups;
              }
          }catch (err){
              //console.log(err)
          }
          this.loadingComponent = false;
      }
  };
</script>