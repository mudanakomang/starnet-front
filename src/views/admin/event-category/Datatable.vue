<template>
  <div>
    <div class="text-h4 mb-2">
      {{ $t("general.page.userList") }}
      <v-divider></v-divider>
    </div>
    <v-data-table
      :headers="headers"
      :items="displayedCategories"
      :options.sync="options"
      :server-items-length="totalEventCategories"
      :loading="loading"
      class="elevation-1 "
      :footer-props="{
        'items-per-page-options': [10, 20, 50, 100]
      }"
    >
      <template v-slot:body.prepend>
        <tr>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.category_group_name"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.event_category_name"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.price"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <g-filter-date v-model="activeFilters.updated_at"></g-filter-date>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.category_event_number"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.display_order"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-select
              outlined
              dense
              v-model="activeFilters.display_to_list"
              :items="['Yes', 'No']"
            />
          </td>
        </tr>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          v-show="item.is_publish_list === 'Yes' ? true : false"
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          small
        >
          {{ $t("general.button.publicPage") }}
        </v-btn>
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          @click="editCategory(item.id)"
          small
        >
          {{ $t("general.button.edit") }}
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteCategory(item.id)"
          :btnClass="['white--text']"
          color="red darken-2"
          small
          >{{ $t("general.button.delete") }}</g-action-button
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { destroy, getAll } from "@services/crud";
import GActionButton from "../../_components/GActionButton.vue";
import GFilterDate from "../../_components/form_input/GFilterDate.vue";

export default {
  components: { GActionButton, GFilterDate },
  data() {
    return {
      formData: {},
      totalEventCategories: 0,
      eventCategories: [],
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
      showPublicPageBtn: false,
    };
  },
  computed: {
    displayedCategories() {
      return this.eventCategories.map(eventCategory => ({
        ...eventCategory,
        is_publish_list: eventCategory.is_publish_list == 1 ? "Yes" : "No",
        price: '¥' + eventCategory.price,
        updated_at: eventCategory.updated_at.replace(/-/g, "/").slice(0, -3)
      }));
    },
      headers() {
        return [
          {
            text: this.$t("general.eventCategories.eventCategoryGroupName"),
            value: "category_group.name",
          },
          {
            text: this.$t("general.eventCategories.eventCategoryName"),
            value: "name"
          },
          {
            text: this.$t("general.eventCategories.price"),
            value: "price"
          },
          {
            text: this.$t("general.eventCategories.updateTime"),
            value: "updated_at",
            width: "150"
          },
          {
            text: this.$t("general.eventCategories.categoryEventNumber"),
            value: "events_count"
          },
          {
            text: this.$t("general.eventCategories.displayOrder"),
            value: "display_order"
          },
          {
            text: this.$t("general.eventCategories.displayToList"),
            value: "is_publish_list"
          },
          {
            text: "",
            value: "action",
            width: "260",
            align: "right"
          }
        ];
      }
  },
  watch: {
    options: {
      handler() {
        this.getAllEventCategories();
      },
      deep: true
    },
    activeFilters: {
      handler() {
        this.getAllEventCategories();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllEventCategories();
  },
  methods: {
    getAllEventCategories: async function() {
      try {
        let url = "admin/event-category";
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters
        });
        this.eventCategories = res.eventCategory.data;
        this.totalEventCategories = res.eventCategory.total;
        this.formData = res.formData;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    deleteCategory: function(id) {
      let cb = async function () {
        try{
          this.loading = true;
          let url = `admin/event-category/${id}`;
          const res = await destroy(url);
          if(res){
            this.getAllEventCategories();
          }
        }catch (err){
          if(err.isHandled){
            //
          }
        } finally {
          this.loading = false;
        }
      };
      return cb.bind(this);
    },
    editCategory: function(id) {
      this.$router.push({ name: "admin.event-category.edit", params: { id } });
    }
  }
};
</script>
<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  font-weight: bold !important;
  font-size: 15px !important;
}
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  font-size: 14px !important;
}
</style>
