<template>
    <div>
        <div class="text-h4 mb-2">
            {{ $t("general.page.eventDetails") }}
            <v-divider></v-divider>
        </div>
        <v-skeleton-loader
                v-if="loadingComponent"
                type="card-avatar, article, actions"
        >
        </v-skeleton-loader>
        <v-container v-if="!loadingComponent">
            <v-row v-for="(item,index) in eventData"
                   :key="item.name"
                   no-gutters
                   class="pt-2 pb-2"
            >
                <v-col
                   cols="6"
                   md="4"
                   sm="3"
                >
                   {{ item.item }}
                </v-col>
                <v-col v-if="index===3"
                   cols="12"
                   sm="6"
                   md="8"
                >
                    <v-row class="text-left">
                        <v-col lg="3" md="2" sm="6">{{ item.value.date }}</v-col>
                        <v-col lg="2" md="2" sm="4">{{ item.value.start }}</v-col>
                        <v-col lg="2" md="2" sm="4">{{ item.value.end }}</v-col>
                    </v-row>
                </v-col>
                <v-col v-else-if="index===8"
                       cols="12"
                       sm="6"
                       md="8"
                >
                    <v-img
                            max-width="400px"
                            min-width="200px"
                            width="200px"
                            class="img-thumbnail"
                            :src="item.value"
                    ></v-img>
                </v-col>
                <v-col v-else
                       cols="12"
                       sm="6"
                       md="8"
                >
                    {{ item.value }}
                </v-col>
            </v-row>
        </v-container>
        <div class="text-h4 mb-2 pt-15">
            {{ $t("general.page.currentUser") }}
            <v-divider></v-divider>
        </div>
        <v-container v-if="!loadingComponent">
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                               {{ $t('general.event.userName') }}
                            </th>
                            <th class="text-left">
                               {{ $t('general.event.eventCategory') }}
                            </th>
                            <th class="text-left">
                                {{ $t('general.event.appliedAt') }}
                            </th>
                            <th class="text-left">
                                {{ $t('general.event.settlementMethod') }}
                            </th>
                            <th class="text-left">
                                {{ $t('general.event.ccClearingStatus') }}
                            </th>
                            <th class="text-left">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in applicationUser"
                            :key="item.user"
                        >
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.appliedAt }}</td>
                            <td>{{ item.settlementMethod }}</td>
                            <td>{{ item.ccClearingStatus }}</td>
                            <td>
                                <v-btn
                                        color="cyan darken-2"
                                        class="mx-2 white--text"
                                        @click="detailUser(item.id)"
                                        small
                                >{{ $t("general.button.details") }}
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
        <div class="text-h4 mb-2 pt-15">
            {{ $t("general.page.currentBillingStatus") }}
            <v-divider></v-divider>
        </div>
        <v-container v-if="!loadingComponent">
            <v-row class="pt-2 pb-2"
            >
                <v-col class="pr-6"
                        lg="4"
                        md="5"
                >
                   <p>{{ $t("general.event.participantNumber") }}
                       <span class="float-right">000</span>
                   </p>

                </v-col>
                <v-col
                        lg="2"
                        md="2"
                >
                    <p>{{ $t("general.event.price") }}
                        <span class="float-right">000 円</span>
                    </p>
                </v-col>
                <v-col
                        lg="2"
                        md="2"
                >
                    <p>{{ $t("general.event.total") }}
                        <span class="float-right">000 円</span>
                    </p>
                </v-col>
            </v-row>
            <v-row class="pt-2 pb-2">
                <v-col
                    lg="2"
                    md="2"
                >
                    <p>{{ $t("general.event.paymentMethods") }}</p>
                </v-col>
                <v-col
                        lg="2"
                        md="3"
                >
                    <v-col class="pt-0 pb-0"
                           lg="12"
                           md="12"
                    >
                        <p>{{ $t("general.event.creditCard") }}
                           <span class="float-right">000</span>
                        </p>
                    </v-col>
                    <v-col class="pt-0 pb-0"
                           lg="12"
                           md="12"
                    >
                        <p>{{ $t("general.event.transfer") }}
                            <span class="float-right">000</span>
                        </p>
                    </v-col>
                    <v-col class="pt-0 pb-0"
                           lg="12"
                           md="12"
                    >
                         <p>{{ $t("general.event.cash") }}
                            <span class="float-right">000</span>
                         </p>
                    </v-col>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import { show } from "@services/crud";
    export default {
        data() {
            return {
                event: {
                    category: {
                        price: ''
                    },
                    user: '',
                    event_date:'',
                    event_time_start: '',
                    event_time_finish: '',
                    prefecture:'',
                    file:'',
                    applications: []
                },
                loadingComponent: false,
            };
        },
        computed: {
            eventData(){
                let event = [];
                if (this.event){
                    event= [
                        {
                            item: this.$t('general.event.eventCategory'),
                            value: this.event.category.name
                        },
                        {
                            item: this.$t('general.event.eventName'),
                            value: this.event.name
                        },
                        {
                            item: this.$t('general.event.owner'),
                            value: this.event.user.display_name
                        },
                        {
                            item: this.$t('general.event.dateTime'),
                            value: this.formatDateTime
                        },
                        {
                            item: this.$t('general.event.price'),
                            value: this.event.category.price + " 円"
                        },
                        {
                            item: this.$t('general.event.onlineEvent'),
                            value: this.event.is_online===0 ? "No":"Yes"
                        },
                        {
                            item: this.$t('general.event.prefectures'),
                            value: this.event.prefecture.name
                        },
                        {
                            item: this.$t('general.event.addressAfterCity'),
                            value: this.event.address
                        },
                        {
                            item: this.$t('general.event.coverImage'),
                            value: this.event.file ? this.event.file.path : require('@/assets/noimage.png'),
                        },
                        {
                            item: this.$t('general.event.detail'),
                            value:this.event.description
                        },
                        {
                            item: this.$t('general.event.publicPreference'),
                            value: this.event.is_publish ? "公開":""
                        }
                    ];
                }
                return event;
            },
            formatDateTime(){
                let date = this.event.event_date.replace(/-/g,'/').slice(0,-8);
                let start =  this.event.event_time_start.slice(0,-3);
                let end = this.event.event_time_finish.slice(0,-3);
                return  {date:`${this.$t("general.event.date")} ${date}`,start:`${this.$t("general.event.start")} ${start}`,end:`${this.$t("general.event.end")} ${end}`};
            },
            applicationUser(){
                let result = [];
                if(this.event){
                   result=  this.event.applications.map((item) => {
                        return {
                            id:item.user.id,
                            name: item.user.display_name,
                            email: item.user.email,
                            appliedAt: "",
                            settlementMethod: "",
                            ccClearingStatus: "",
                        };
                    })
                }
                return result
            }
        },
        mounted() {
            this.getEventDetails()
        },
        methods: {
            getEventDetails: async function () {
                this.loadingComponent = true;
                try {
                    const id = this.$route.params.id;
                    let url = `admin/event/${id}`;
                    const res = await show(url);
                    if (!res){
                        this.$router.push({name:"errorNotFound"});
                    }
                    this.event = res;
                } catch (err) {
                    console.log(err)
                } finally {
                    this.loadingComponent =false;
                }
            },
            detailUser: function (id) {
                this.$router.push({name:'admin.user.show',params: {id} })
            }
        }
    };

</script>
<style lang="scss">
    .no-gutters{
        border-bottom: 1.5px solid rgba(0,0,0,.12);
    }
</style>