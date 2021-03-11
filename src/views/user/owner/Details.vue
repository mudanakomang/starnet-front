<template>
    <main class="form-chank-small center">
        <h2>主催イベント - イベント詳細</h2>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">イベントカテゴリ</label>
            <div class="right"><label for="">{{ eventCategory }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">イベント名</label>
            <div class="right"><label for="">{{ this.eventName }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">開催日時</label>
            <div class="right"><label for="">日付 {{ this.openTime.date }} 開始 {{ this.openTime.start }} 終了 {{ this.openTime.finish }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">金額</label>
            <div class="right"><label for="">{{ this.price }} 円</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">オンラインイベント</label>
            <div class="right"><label for="">{{ this.isOnline }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">都道府県</label>
            <div class="right"><label for="">{{ this.prefecture }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">市区町村以降の住所</label>
            <div class="right"><label for="">{{ this.address }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">カバー画像</label>
            <div class="right"><img :src="this.coverImage" alt=""></div>
        </div>
        <div class="form-content is-flex">
            <label for="" class="bold">詳細</label>
            <div class="right"><label for="" class="sentence">{{ this.detail }}</label></div>
        </div>
        <div class="form-content is-flex vertical-center">
            <label for="" class="bold">公開設定</label>
            <div class="right"><label for="">{{ this.isPublish }}</label></div>
        </div>
        <h2>参加ユーザー</h2><div class="owner-event-user">
        <table>
            <thead>
            <tr>
                <th>名前</th>
                <th>性別</th>
                <th>タイプ</th>
                <th>簡易判定</th>
                <th>完全判定</th>
                <th>理想判定</th>
                <th>決済方法</th>
                <th>クレカ決済状況</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in users" :key="item.user">
                <td>{{ item.name }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.simpleJudgement }}</td>
                <td>{{ item.completeJudgement }}</td>
                <td>{{ item.idealJudgement }}</td>
                <td>{{ item.settlementMethod}}</td>
                <td>{{ item.ccClearingStatus }}</td>
                <td>
                    <button class="detail-button">
                        詳細
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
        <h2>売上金額</h2>
        <div class="tables is-flex">
            <table>
                <tbody>
                <tr>
                    <td class="bold">参加者数</td>
                    <td></td>
                    <td>000</td>
                </tr>
                <tr>
                    <td class="bold">支払い方法</td>
                    <td class="small bold">クレカ</td>
                    <td>000</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="small bold">銀行振込</td>
                    <td>000</td>
                </tr>
                <tr>
                    <td></td>
                    <td class="small bold">現金</td>
                    <td>000</td>
                </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                <tr>
                    <td class="bold">単価</td>
                    <td>0000 円</td>
                </tr>
                </tbody>
            </table>
            <table>
                <tbody>
                <tr>
                    <td class="bold">合計</td>
                    <td>0000 円</td>
                </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>
<script>
import { show } from "@services/crud";
export default {
    data() {
        return {
            event: {
                category: {
                    price: ""
                },
                user: "",
                event_date: "",
                event_time_start: "",
                event_time_finish: "",
                file: "",
                prefecture: "",
                applications: [],
            },
            diagnosisType:{
                1: "姫",
                2: "秘書",
                4: "母",
                10: "王子",
                20: "カウンセラー",
                40: "男の子"
            },
            settlementMethods:{
                1 : "クレジット",
                2 : "銀行振込",
                3 : "現金支払い"
            }
        };
    },
    created(){
      document.title = "主催イベント - イベント詳細";
    },
    computed: {
        eventCategory(){
            return this.event.category.name;
        },
        eventName() {
            return this.event.name;
        },
        openTime() {
            return {
                date: this.event.event_date.replace(/-/g,'/').slice(0,-8),
                start: this.event.event_time_start.slice(0,-3),
                finish: this.event.event_time_finish.slice(0,-3)
            }
        },
        price() {
            return this.event.category.price;
        },
        isOnline() {
            return this.event.is_online ? "Yes":"No";
        },
        prefecture() {
            return this.event.prefecture.name
        },
        address() {
            return this.event.address;
        },
        coverImage() {
            let noImage = require('@/assets/noimage.png');
            let path = this.event.file ? this.event.file.path:"";
            if (path){
                return path
            }else{
                return noImage
            }
        },
        detail() {
            return this.event.description
        },
        isPublish() {
            return this.event.is_publish ? "公開":"";
        },
        users() {
            const results =  this.event.applications.map((item) => {
                return {
                    id: item.user.id,
                    name: item.user.display_name,
                    gender: item.user.gender ? "男性":"女性",
                    type: item.user.selected_diagnosis_type ? this.diagnosisType[item.user.selected_diagnosis_type]:"",
                    simpleJudgement: item.user.user_diagnosis.simple_evaluate_date ? "済":"未",
                    completeJudgement: item.user.user_diagnosis.complete_evaluate_date ? "済":"未",
                    idealJudgement: item.user.user_diagnosis.ideal_evaluate_date ? "済":"未",
                    settlementMethod: item.payment_type ? this.settlementMethods[item.payment_type]:"",
                    ccClearingStatus: ""
                };
            });
            return results;
        }

    },
    mounted() {
        this.getEventDetails();
    },
    methods: {
        getEventDetails: async function () {
            try {
                const id = this.$route.params.id;
                let url = `user/owner/event/${id}`;
                const res = await show(url);
                this.event = res;
            } catch (err) {
                console.log(err)
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style src="@static/css/user/owner/event/detail/index.css">
</style>