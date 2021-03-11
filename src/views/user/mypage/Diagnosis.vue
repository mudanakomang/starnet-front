<template>
  <div>
    <main class="mypage-diagnosis center">
      <h2>3キャラ判定結果</h2>
      <div class="tables center">
        <div class="table-group is-flex">
          <h3>簡易判定（判定日{{ item.simpleEvaluateDate }}）</h3>
          <table>
            <tbody>
              <tr>
                <td>姫</td>
                <td class="large">{{ item.simpleTypeA }}</td>
              </tr>
              <tr>
                <td>秘書</td>
                <td class="large">{{ item.simpleTypeB }}</td>
              </tr>
              <tr>
                <td>母</td>
                <td class="large">{{ item.simpleTypeC }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-group is-flex">
          <h3>完全判定（判定日{{ item.completeEvaluateDate }}）</h3>
          <table>
            <tbody>
              <tr>
                <td>プラス</td>
                <td class="large">{{ item.completePlus }}</td>
              </tr>
              <tr>
                <td>マイナス</td>
                <td class="large">{{ item.completeMinus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="table-group is-flex">
          <h3>理想判定（判定日{{ item.idealEvaluateDate }}）</h3>
          <table>
            <tbody>
              <tr>
                <td>A</td>
                <td class="large">{{ item.idealTypeA }}</td>
              </tr>
              <tr>
                <td>B</td>
                <td class="large">{{ item.idealTypeB }}</td>
              </tr>
              <tr>
                <td>C</td>
                <td class="large">{{ item.idealTypeC }}</td>
              </tr>
            </tbody>
          </table>
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
      item : {
        simpleTypeA: "",
        simpleTypeB: "",
        simpleTypeC: "",
        simpleEvaluateDate: "",
        completePlus: "",
        completeMinus: "",
        completeEvaluateDate: "",
        idealTypeA: "",
        idealTypeB: "",
        idealTypeC: "",
        idealEvaluateDate: "",
      }
    }
  },
  mounted() {
    this.getChracterJudgmentResult();
  },
  methods: {
    getChracterJudgmentResult: async function() {
      // get character judgment result from user diagnosis result
      try {
        let url = 'user/mypage/diagnosis';
        const res = await getAll(url);
        let { item } = res;

        this.item = {
          ...this.item,
          simpleTypeA: item.simple_type_a,
          simpleTypeB: item.simple_type_b,
          simpleTypeC: item.simple_type_c,
          simpleEvaluateDate: item.simple_evaluate_date.replace(/-/g, "/").slice(0, -9),
          completePlus: item.complete_plus,
          completeMinus: item.complete_minus,
          completeEvaluateDate: item.complete_evaluate_date.replace(/-/g, "/").slice(0, -9),
          idealTypeA: item.ideal_type_a,
          idealTypeB: item.ideal_type_b,
          idealTypeC: item.ideal_type_c,
          idealEvaluateDate: item.ideal_evaluate_date.replace(/-/g, "/").slice(0, -9)
        };

      } catch (err) {
        console.log(err);
      } finally {
        //
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import url(~static_css/user/mypage/diagnosis/index.css);
</style>