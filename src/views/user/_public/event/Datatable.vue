<template>
  <div>
    <div class="text-h4 mb-2">
      {{ $t("general.page.eventList") }}
      <v-divider></v-divider>
    </div>
    <v-data-table
      :headers="headers"
      :items="displayedEvents"
      :options.sync="options"
      :server-items-length="totalEvents"
      :loading="loading"
      class="elevation-1"
      :footer-props="footerProps"
    >
      <template v-slot:body.prepend>
        <tr>
          <td>
            <v-text-field v-model="activeFilters.category_group"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.category_name"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.name"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.owner"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.date"></v-text-field>
          </td>
          <td>
            <v-text-field v-model="activeFilters.start"></v-text-field>
          </td>
        </tr>
      </template>
      <template v-slot:item.publish="{ item }">
        <v-btn
          v-if="item.is_publish"
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          small
          >{{ $t("general.button.publicPage") }}
        </v-btn>
      </template>
      <template v-slot:item.details="{ item }">
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          @click="detailEvent(item.id)"
          small
          >{{ $t("general.button.details") }}
        </v-btn>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn
          :disabled="loading"
          color="cyan darken-2"
          class="mx-2 white--text"
          @click="editEvent(item.id)"
          small
        >
          {{ $t("general.button.edit") }}
        </v-btn>
        <g-action-button
          :disabled="loading"
          :onConfirm="deleteEvent(item.id)"
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
import { convArrToObj } from "@helpers";
import GActionButton from "../../../_components/GActionButton.vue";

export default {
  components: { GActionButton },
  data() {
    return {
      footerProps: { "items-per-page-options": [10, 20, 50, 100] },
      formData: {},
      totalEvents: 0,
      events: [],
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
    displayedEvents() {
      return this.events.map(event => ({
        ...event,
        event_date: event.event_date.replace(/-/g, "/").slice(0, -8),
        event_start: event.event_start.slice(0, -3)
      }));
    },
    headers() {
      return [
        {
          text: this.$t("general.header.events.eventCategoryGroup"),
          value: "category.category_group.name"
        },
        {
          text: this.$t("general.header.events.eventCategory"),
          value: "category.name"
        },
        {
          text: this.$t("general.header.events.eventName"),
          value: "name"
        },
        {
          text: this.$t("general.header.events.owner"),
          value: "user.display_name"
        },
        {
          text: this.$t("general.header.events.eventDate"),
          value: "event_date"
        },
        {
          text: this.$t("general.header.events.startTime"),
          value: "event_start"
        },
        {
          text: "",
          value: "publish"
        },
        {
          text: "",
          value: "details"
        },
        {
          text: "",
          value: "action",
          width: "15%"
        }
      ];
    }
  },
  watch: {
    options: {
      handler() {
        this.getAllEvents();
      },
      deep: true
    },
    activeFilters: {
      handler() {
        this.getAllEvents();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllEvents();
  },
  methods: {
    getAllEvents: async function() {
      try {
        let url = "events";
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters
        });
        this.events = res.events.data;
        this.totalEvents = res.events.total;
        this.formData = res.formData;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    deleteEvent: function(id) {
      let cb = async function() {
        try {
          this.loading = true;
          let url = `events/${id}`;
          const res = await destroy(url);
          if (res) {
            this.getAllEvents();
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
    editEvent: function(id) {
      this.$router.push({ name: "events.edit", params: { id } });
    },
    detailEvent: function(id) {
      this.$router.push({ name: "events.show", params: { id } });
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
