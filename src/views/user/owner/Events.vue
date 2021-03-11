<template>
  <main>
    <h1 class="owner-event-heading">主催イベント - イベント一覧</h1>
    <div class="owner-event-table">
      <table>
        <thead>
        <tr>
          <th>イベントカテゴリ</th>
          <th>イベント名</th>
          <th>開催日</th>
          <th>開始時間</th>
          <th>参加者数</th>
          <th style="width: 159px;"></th>
          <th colspan="4">
            <button class="create-event-button" @click="$router.push({name:'user.owner.event.create'})">
              イベントを新規作成
            </button>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(event,index) in displayedEvents" :key="index">
          <td>{{ event.category.name }}</td>
          <td>{{ event.name }}</td>
          <td>{{ event.event_date }}</td>
          <td>{{ event.event_start }}</td>
          <td>{{ event.applications_count }}</td>
          <td></td>
          <td>
            <button class="public-page-button" v-if="event.is_publish">
              公開ページ
            </button>
          </td>
          <td>
            <button class="detail-button" @click="detailEvent(event.id)">
              詳細
            </button>
          </td>
          <td>
            <button class="edit-button" v-if="!event.isPast" @click="editEvent(event.id)">
              編集
            </button>
          </td>
          <td>
            <button class="delete-button" @click="deleteEvent(event.id)">
              削除
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { destroy, getAll } from "@services/crud";
export default {
  components: {},
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
  created() {
      document.title = "アエルba";
  },
  computed: {
    displayedEvents() {
      return this.events.map(event => ({
        ...event,
        event_date: event.event_date.replace(/-/g, "/").slice(0, -8),
        event_start: event.event_time_start.slice(0, -3),
        isPast: Date.parse(event.event_date) < Date.now(),
      }));
    },
  },
  mounted() {
    this.getAllEvents();
  },
  methods: {
    getAllEvents: async function() {
      try {
        let url = "user/owner/event";
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
    deleteEvent: async function(id) {
      try {
        let url = `user/owner/event/${id}`;
        const res = await destroy(url);
        if (res) {
            this.getAllEvents();
        }
      } catch (err){
          console.log(err)
      }
    },
    editEvent: function(id) {
      this.$router.push({ name: "user.owner.event.edit", params: { id } });
    },
    detailEvent: function(id) {
      this.$router.push({ name: "user.owner.event.show", params: { id } });
    }
  }
};
</script>
<style src="@static/css/user/owner/event/index.css">
</style>
