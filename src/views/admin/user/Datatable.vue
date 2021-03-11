<template>
  <div>
    <v-container class="text-h5 mb-2 font-weight-bold ml-2">
      {{ $t("general.page.userList") }}
    </v-container>
    <v-divider class="mb-4"></v-divider>
    <v-data-table
      :headers="headers"
      :items="displayedUsers"
      :options.sync="options"
      :server-items-length="totalUsers"
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
              maxlength="256"
              v-model="activeFilters.name"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              maxlength="256"
              v-model="activeFilters.email"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <g-filter-date v-model="activeFilters.created_at"></g-filter-date>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              maxlength="256"
              v-model="activeFilters.counselor"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-select
              outlined
              :items="[{text:'All', value:''}, 'Yes', 'No']"
              dense
              v-model="activeFilters.event_owner"
            ></v-select>
          </td>
          <td class="d-none d-md-table-cell">
            <v-btn
              color="primary"
              elevation="2"
              class="mx-2 white--text"
              small
              @click="csvDownload(csvData)"
              >{{ $t("general.button.csvDownload") }}</v-btn
            >
          </td>
        </tr>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          @click="editUser(item.id)"
          small
        >
          {{ $t("general.button.edit") }}
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteUser(item.id)"
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
      totalUsers: 0,
      users: [],
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
    displayedUsers() {
      return this.users.map(user => ({
        ...user,
        event_owner: user.event_owner ? "Yes" : "No",
        created_at: user.created_at.replace(/-/g, "/").slice(0, -3)
      }));
    },
    headers() {
      return [
        {
          text: this.$t("general.user.name"),
          value: "display_name"
        },
        {
          text: this.$t("general.user.email"),
          value: "email"
        },
        {
          text: this.$t("general.user.created_at"),
          value: "created_at"
        },
        {
          text: this.$t("general.user.counselor"),
          value: "user.display_name"
        },
        {
          text: this.$t("general.user.owner"),
          value: "event_owner"
        },
        {
          text: "",
          value: "action"
        }
      ];
    },
    /**
     *
     * Generate csv from user data
     *
     * */

    csvData() {
      return this.users.map(user => ({
        名前: user.display_name,
        メールアドレス: user.email,
        登録日時: user.created_at.replace(/-/g, "/").slice(0, -3),
        担当カウンセラー: user.user === null ? "" : user.user.display_name,
        主催者: user.event_owner ? "Yes" : "No"
      }));
    }
  },
  watch: {
    options: {
      handler() {
        this.getAllUsers();
      },
      deep: true
    },
    activeFilters: {
      handler() {
        if (this.timer) {
           clearTimeout(this.timer);
           this.timer = null;
          }
        this.timer = setTimeout(() => {
           this.getAllUsers();
        }, 800);
      },
      deep: true
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    getAllUsers: async function() {
      try {
        let url = "admin/user";
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters
        });
        this.users = res.users.data;
        this.totalUsers = res.users.total;
        this.formData = res.formData;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    deleteUser: function(id) {
      let cb = async function() {
        try {
          this.loading = true;
          let url = `admin/user/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllUsers();
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
    editUser: function(id) {
      this.$router.push({ name: "admin.user.edit", params: { id } });
    },
    /**
     *
     * CSV download
     * */

    csvDownload: function(arrData) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(arrData[0]).join(","),
        ...arrData.map(item => Object.values(item).join(","))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");
      const data = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", data);
      link.setAttribute("download", "User List.csv");
      link.click();
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
