<template>
  <div>
    <main class="mypage-event center">
      <h2>参加予定イベント</h2>
      <div v-for="item in items" :key="item.id" :item="item">
        <div class="event-contents">
          <div class="event-content">
            <div class="event-date">
              {{ item.event_date.replace(/-/g, "/").slice(5, -12) }}月<br>
              <span>{{ item.event_date.replace(/-/g, "/").slice(8, -9) }}</span>
            </div>
            <div class="event-detail">
              <div class="event-time">
                {{getDayName(item.event_date)}} {{ item.event_time_start.replace(/-/g, "/").slice(0, -3) }}
              </div>
              <div class="event-prefecture">
                {{ item.prefecture.name }}
              </div>
              <div class="event-category">
                {{ item.category.name }}
              </div>
              <div class="event-title">
                {{ item.name }}
              </div>
            </div>
            <div class="event-owner">
              <div class="event-owner-img">
                <img :src="item.user.file ? image_path+'/'+item.user.file.path : noImageUrl" alt="owner-img">
              </div>
              <div class="event-owner-name">
                {{ item.user.display_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { getAll } from "@services/crud";

export default {
  data() {
    return {
      items : {},
      image_path : '',
      noImageUrl : require("@/assets/noimage.png")
    }
  },
  mounted() {
    this.getParticipationEvent();
  },
  methods: {
    getParticipationEvent: async function() {
      try {
        let url = 'user/mypage/event';
        const res = await getAll(url);

        this.items = res.items;
        this.image_path = res.image_path;
      } catch (err) {
        console.log(err);
      } finally {
        //
      }
    },
    getDayName(date){
      // Convert from date to day name
      var days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
      var d = new Date(date);
      var dayName = days[d.getDay()];
      return dayName;
    }
  }
};
</script>
<style lang="scss" scoped>
@import url(~static_css/user/mypage/event/index.css);
</style>
