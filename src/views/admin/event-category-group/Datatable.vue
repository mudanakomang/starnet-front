<template>
    <div>
        <div class="text-h4 mb-2">
            {{ $t("general.page.eventCategoryGroupList") }}
            <v-divider></v-divider>
        </div>
        <v-data-table
            :headers="headers"
            :items="displayedEventCategoryGroup"
            :options.sync="options"
            :server-items-length="totalEventCategoryGroup"
            :loading="loading"
            class="elevation-1"
            :footer-props="footerProps"
        >
            <template v-slot:body.prepend>
                <tr>
                    <td class="d-none d-md-table-cell">
                        <v-text-field
                                outlined
                                dense
                                maxlength="256"
                                v-model="activeFilters.name"
                        ></v-text-field>
                    </td>
                    <td  class="d-none d-md-table-cell">
                        <v-text-field
                                outlined
                                dense
                                maxlength="256"
                                v-model="activeFilters.display_order"
                        ></v-text-field>
                    </td>
                </tr>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn
                    :disabled="loading"
                    color="cyan darken-2"
                    class="mx-2 white--text"
                    @click="editEventCategoryGroup(item.id)"
                    small
                >
                    {{ $t("general.button.edit") }}
                </v-btn>
                <g-action-button
                    :disabled="loading"
                    :onConfirm="deleteEventCategoryGroup(item.id)"
                    :btnClass="['white--text']"
                    color="grey darken-2"
                    small
                >
                    {{ $t("general.button.delete") }}
                </g-action-button>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    import { destroy, getAll } from "@services/crud";
    import GActionButton from "../../_components/GActionButton.vue";

    export default {
        components: { GActionButton },
        data() {
            return {
                footerProps: { "items-per-page-options": [10, 20, 50, 100] },
                formData: {},
                totalEventCategoryGroup: 0,
                eventCategoryGroups: [],
                loading: true,
                options: {
                    groupBy: [],
                    groupDesc: [],
                    itemsPerPage: 10,
                    multiSort: false,
                    mustSort: false,
                    page: 1,
                    sortBy: [],
                    sortDesc: []
                },
                activeFilters: {},
                timer: null,
            };
        },
        computed: {
            displayedEventCategoryGroup(){
                return this.eventCategoryGroups.map(eventCategoryGroup =>({
                    ...eventCategoryGroup,
                }));
            },
            headers() {
                return [
                    {
                        text: this.$t("general.header.categoryGroup.name"),
                        value: "name"
                    },
                    {
                        text: this.$t("general.header.categoryGroup.displayOrder"),
                        value: "display_order"
                    },
                    {
                        text: "",
                        value: "action"
                    }
                ];
            }
        },
        watch: {
            options: {
                handler() {
                    this.getAllEventCategoryGroup()
                },
                deep:true
            },
            activeFilters: {
                handler() {
                    if (this.timer) {
                        clearTimeout(this.timer);
                        this.timer = null;
                    }
                    this.timer = setTimeout(() => {
                        this.getAllEventCategoryGroup();
                    }, 800);
                },
                deep: true
            }
        },
        mounted() {
            this.getAllEventCategoryGroup()
        },
        methods: {
            getAllEventCategoryGroup: async function(){
                try {
                    let url = "admin/event-category-group";
                    this.loading = true;
                    const { itemsPerPage, page, sortBy, sortDesc } = this.options;
                    const res = await getAll(url, {
                        itemsPerPage,
                        page,
                        sortBy,
                        sortDesc,
                        ...this.activeFilters
                    });
                    this.eventCategoryGroups = res.eventCategoryGroup.data;
                    this.totalEventCategoryGroup = res.eventCategoryGroup.total;
                    this.formData = res.formData;
                } catch (err) {
                    console.log(err);
                } finally {
                    this.loading = false;
                }
            },
            deleteEventCategoryGroup: function (id) {
                let cb = async function () {
                    try {
                        this.loading = true;
                        let url = `admin/event-category-group/${id}`;
                        const res = await destroy(url);
                        if (res) {
                            this.getAllEventCategoryGroup();
                        }
                    } catch (err) {
                        if (err.isHandled){
                            //
                        }
                    } finally {
                        this.loading = false;
                    }
                };
                return cb.bind(this);
            },
            editEventCategoryGroup: function(id) {
                this.$router.push({ name: "admin.event-category-group.edit", params: { id } });
            },
        }
    };
</script>