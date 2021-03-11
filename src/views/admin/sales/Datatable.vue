<template>
  <div>
    <div class="text-h4 mb-2">
      {{ $t("general.sales.billingList") }}
      <v-divider></v-divider>
    </div>
    <v-data-table
      :headers="headers"
      :items="displayedSales"
      :options.sync="options"
      :server-items-length="totalSales"
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
              v-model="activeFilters.event_category"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field 
              outlined
              dense
              v-model="activeFilters.event_name"
            ></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field
              outlined
              dense
              v-model="activeFilters.owner">
            </v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <g-filter-date v-model="activeFilters.event_date"></g-filter-date>
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field 
              outlined
              dense
              v-model="activeFilters.user">
            </v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-select 
              outlined
              dense
              v-model="activeFilters.payment_methods" 
              :items="paymentTypes" 
              item-value="id"
              item-text="type" />
          </td>
          <td class="d-none d-md-table-cell">
            <v-select 
              outlined
              dense
              v-model="activeFilters.credit_card_settled" 
              :items="paidStatus" 
              item-value="id"
              item-text="value" />
          </td>
          <td class="d-none d-md-table-cell">
            <v-text-field 
              outlined
              dense
              v-model="activeFilters.billing_price"></v-text-field>
          </td>
          <td class="d-none d-md-table-cell">
            <v-btn
              color="primary"
              elevation="2"
              class="mx-2 white--text"
              small
              @click="csvDownload(csvData)"
              >{{ $t("general.sales.csvDownload") }}</v-btn
            >
          </td>

          <td colspan="6"></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { getAll } from "@services/crud";
import GFilterDate from "../../_components/form_input/GFilterDate.vue";

export default {
  components: { GFilterDate },
  data() {
    return {
      formData: {},
      totalSales: 0,
      sales: [],
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
      headers: [
        {
          text: this.$t("general.sales.eventCategory"),
          value: "event.category.name"
        },
        {
          text: this.$t("general.sales.eventName"),
          value: "event.name"
        },
        {
          text: this.$t("general.sales.owner"),
          value: "event.user.display_name"
        },
        {
          text: this.$t("general.sales.eventDate"),
          value: "event.event_date"
        },
        {
          text: this.$t("general.sales.user"),
          value: "user.display_name"
        },
        {
          text: this.$t("general.sales.paymentMethods"),
          value: "payment_type"
        },
        {
          text: this.$t("general.sales.creditCardSettled"),
          value: "is_paid"
        },
        {
          text: this.$t("general.sales.billingPrice"),
          value: "event.category.price"
        },
        {
          text: "",
          value: "action"
        }
      ],
      paymentTypes : [
        {id: '', type: "All"},
        {id: '1', type: 'Credit Card'},
        {id: '2', type: 'Bank Transfer'},
        {id: '3', type: 'Cash payment on the spot'}
      ],
      paidStatus : [
        {id: '', value: "All"},
        {id: 0, value: "No"},
        {id: 1, value: "Yes"}
      ]
    };
  },
  computed: {
    displayedSales() {
      return this.sales.map(sales => ({
        ...sales,
        is_paid: sales.is_paid ? "Yes" : "No",
        'payment_type': sales.payment_type == 1 ? 'Credit Card' : 
          (sales.payment_type == 2 ? 'Bank Transfer' : 'Cash payment on the spot'),
        'event.category.price': '¥' + sales.event.category.price,
        'event.event_date': sales.event.event_date.replace(/-/g, "/").slice(0, -9)
      }));
    },
    csvData() {
      return this.sales.map(sales => ({
        中イベントカテゴリ: sales.event.category.name,
        イベント名: sales.event.name,
        主催者: sales.event.user.display_name,
        開催日: sales.event.event_date,
        ユーザー: sales.user.display_name,
        支払い方法: sales.payment_type == 1 ? 'Credit Card' : 
          (sales.payment_type == 2 ? 'Bank Transfer' : 'Cash payment on the spot'),
        クレカ決済済み: sales.payment_type,
        売上金額: sales.is_paid ? "Yes" : "No"
      }));
    }
  },
  watch: {
    options: {
      handler() {
        this.getAllSales();
      },
      deep: true
    },
    activeFilters: {
      handler() {
        this.getAllSales();
      },
      deep: true
    }
  },
  mounted() {
    this.getAllSales();
  },
  methods: {
    getAllSales: async function() {
      try {
        let url = "admin/sales";
        this.loading = true;
        const { itemsPerPage, page, sortBy, sortDesc } = this.options;
        const res = await getAll(url, {
          itemsPerPage,
          page,
          sortBy,
          sortDesc,
          ...this.activeFilters
        });
        this.sales = res.sales.data;
        this.totalSales = res.sales.total;
        this.formData = res.formData;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
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
      link.setAttribute("download", "Sales List.csv");
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
