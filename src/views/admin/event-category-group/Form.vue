<template>
    <div>
        <v-skeleton-loader
            v-if="loadingComponent"
            type="card-avatar, article, actions"
        ></v-skeleton-loader>
        <v-container class="text-h5 mb-2 font-weight-bold ml-2">
            {{
                $route.meta.editPage
                ? $t("general.page.eventCategoryGroupEdit")
                : $t("general.page.eventCategoryGroupCreate")
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
                <v-form ref="eventCategoryGroupForm" @submit.prevent="submit">
                    <g-input-group required :title="$t('general.eventCategoryGroup.name')">
                        <v-text-field
                            :rules="rules.name"
                            v-model="item.name"
                            :placeholder="$t('general.eventCategoryGroup.name')"
                            outlined
                        ></v-text-field>
                    </g-input-group>
                    <g-input-group required :title="$t('general.eventCategoryGroup.displayOrder')">
                        <v-text-field
                                :rules="rules.displayOrder"
                                v-model.number="item.displayOrder"
                                :placeholder="$t('general.eventCategoryGroup.displayOrder')"
                                outlined
                        ></v-text-field>
                    </g-input-group>
                    <v-container class="d-flex justify-center mt-6">
                        <v-btn
                           type="submit"
                           color="primary"
                           class="px-12"
                           :loading="loadingBtn"
                           :disabled="loadingBtn"
                        >
                            {{$t("general.button.save") }}
                        </v-btn>
                    </v-container>
                </v-form>
            </v-container>
        </v-sheet>
    </div>
</template>
<script>
    import { store, getForm, update } from "@services/crud";
    import GInputGroup from "@components/form_input/GInputGroup.vue";
    export default {
        data (){
            return {
                rules: {
                    name: [v => !!v || "Event Category Group Name is required"],
                    displayOrder: [
                        v => !!v || "Event Category Group Display Order is required",
                        v => Number.isInteger(v) || 'The value must be an integer',
                    ],
                },
                item: {
                    id: null,
                    name: "",
                    displayOrder: ""
                },
                formData: {},
                editPage: false,
                submitUrl: "",
                loadingComponent: false,
                loadingBtn: false,
            };
        },
        methods: {
            async submit() {
                this.loadingBtn = true;
                let payload = new FormData;
                let options = {};

                if (this.$refs.eventCategoryGroupForm.validate()){
                    payload.append('name', this.item.name);
                    payload.append('display_order', this.item.displayOrder);

                    const res = this.editPage
                        ? await update(this.submitUrl, payload, options)
                        : await store(this.submitUrl, payload, options);
                    if (res) {
                        this.loadingBtn = false;
                        this.$router.push({ name: "admin.event-category-group" });
                    }
                } else {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                    this.loadingBtn = false;
                }
            }
        },
        async created() {
            this.loadingComponent = true;
            try {
                const form = await getForm(this.$route.path);
                if (this.$route.meta.editPage){
                    this.editPage = true;
                    let {
                        formData,
                        submitUrl,
                        item
                    } = form;
                    this.item = {
                        ...this.item,
                        name: item.name,
                        displayOrder: item.display_order
                    };
                    this.formData = formData;
                    this.submitUrl = submitUrl;
                } else {
                    let { formData, submitUrl} = form;
                    this.formData = formData;
                    this.submitUrl = submitUrl;
                }
            } catch (err) {
                console.log(err)
            }
            this.loadingComponent = false;
        },
        components: {
            GInputGroup,
        }
    };
</script>