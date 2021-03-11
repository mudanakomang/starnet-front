<template>
  <div>
    <v-container class="text-h5 mb-2 font-weight-bold ml-2">
      {{ $t("general.page.adminList") }}
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-data-table
      :headers="headers"
      :items="displayedAdmins"
      :options.sync="options"
      :server-items-length="totalAdmins"
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
              v-model="activeFilters.name"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.email"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <g-filter-date v-model="activeFilters.created_at"></g-filter-date>
          </td>
          <td class="d-none d-md-table-cell">
            <g-filter-date v-model="activeFilters.updated_at"></g-filter-date>
          </td>
        </tr>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          @click="editAdmin(item.id)"
          small
        >
          {{ $t("general.button.edit") }}
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteAdmin(item.id)"
          :btnClass="['white--text']"
          color="grey darken-2"
          small
          >{{ $t("general.button.delete") }}</g-action-button
        >
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { destroy, getAll } from "@services/crud";
import { convArrToObj } from "@helpers";
import GActionButton from "../../_components/GActionButton.vue";
import GFilterDate from "../../_components/form_input/GFilterDate.vue";

export default {
  components: { GActionButton, GFilterDate },
  data() {
    return {
      formData: {},
      totalAdmins: 0,
      admins: [],
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
      activeFilters: {}
    };
  },
  computed: {
    displayedAdmins() {
      return this.admins.map(admin => ({
        ...admin,
        created_at: admin.created_at.replace(/-/g, "/").slice(0, -3),
        updated_at: admin.updated_at.replace(/-/g, "/").slice(0, -3)
      }));
    },
    headers() {
      return [
        {
          text: this.$t("general.admin.name"),
          value: "display_name"
        },
        {
          text: this.$t("general.admin.email"),
          value: "email"
        },
        {
          text: this.$t("general.admin.createdAt"),
          value: "created_at"
        },
        {
          text: this.$t("general.admin.updatedAt"),
          value: "updated_at"
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
        this.getAllAdmins();
      },
      deep: true
    },
    activeFilters: {
      handler() {
        this.getAllAdmins();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllAdmins();
  },
  methods: {
    getAllAdmins: async function() {
      try {
        let url = "admin/admin";
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters
        });
        this.admins = res.admins.data;
        this.totalAdmins = res.admins.total;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    deleteAdmin: function(id) {
      let cb = async function() {
        try {
          this.loading = true;
          let url = `admin/admin/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllAdmins();
          }
        } catch (err) {
          if (err.isHandled) {
            //
          }
        } finally {
          this.loading = false;
        }
      };

      return cb.bind(this);
    },
    editAdmin: function(id) {
      this.$router.push({ name: "admin.admin.edit", params: { id } });
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
