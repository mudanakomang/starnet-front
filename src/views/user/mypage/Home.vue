<template>
  <div>
    <v-form ref="eventForm" @submit.prevent="submit">
    <main class="form-chank-small center">
      <h2>お客様情報</h2>
      <!-- Name -->
      <div class="form-content is-flex vertical-center">
        <label for="">名前<span class="requied">必須</span></label>
        <input type="text" id="" class="short" v-model="item.name">
      </div>

      <!-- Email -->
      <div class="form-content is-flex vertical-center">
        <label for="">メールアドレス<span class="requied">必須</span></label>
        <input type="text" id="" class="short" v-model="item.email">
      </div>

      <!-- Password -->
      <div class="form-content is-flex vertical-center">
        <label for="">パスワード<span class="requied">必須</span></label>
        <input v-if="showPasswordInput" type="password" id="" class="short" v-model="item.password">
        <input v-else type="button" value="変更する" class="file-button" @click="showPasswordInput = true">
      </div>

      <!-- Gender -->
      <div class="form-content is-flex vertical-center">
        <label for="">性別<span class="requied">必須</span></label>
        <div class="right is-flex vertical-center">
          <input type="radio" name="gender" value="woman" id="Inq1" class="radio-input" v-model="item.gender">
          <label for="Inq1">女性</label>
          <input type="radio" name="gender" value="man" id="Inq2" class="radio-input" v-model="item.gender">
          <label for="Inq2">男性</label>
        </div>
      </div>

      <!-- Birth Date -->
      <div class="form-content is-flex vertical-center">
        <label for="">生年月日</label>
        <div class="born is-flex vertical-center">
          <input type="text" class="right-year" v-model="item.birthDate.year"><p>年</p>
          <input type="text" class="right-month" v-model="item.birthDate.month"><p>月</p>
          <input type="text" class="right-day" v-model="item.birthDate.day"><p>日</p>
        </div>
      </div>

      <!-- Tel -->
      <div class="form-content is-flex vertical-center">
        <label for="">電話番号（ハイフンなし）</label>
        <input type="text" id="" class="short" v-model="item.tel">
      </div>

      <!-- Post Code -->
      <div class="form-content is-flex vertical-center">
        <label for="">郵便番号</label>
        <input type="text" id="" class="post-code" v-model="item.postCode">
        <input type="submit" value="住所を自動入力" class="file-button">
      </div>

      <!-- Street Address -->
      <div class="form-content is-flex vertical-center">
        <label for="">住所</label>
        <input type="text" v-model="item.prefecture">
      </div>
      <p class="under-area">※以下のエリアについては、主催者一覧ページから主催者情報として掲載される内容となりますので、自己紹介として正しい情報を記載いただくようお願いいたします。記載項目は自由で、必須ではございません。<br>※プロフィールページを作成された後、本部によりクチコミ評価や開催可能イベントが登録されますのでご了承ください。</p>
      
      <!-- Profile Image -->
      <div class="form-content is-flex vertical-center" v-if="item.eventOwner">
        <label for="">プロフィール画像</label>
        <input type="button" value="ファイルを選択" class="file-button">
      </div>

      <!-- Self-introduction -->
      <div class="form-content is-flex" v-if="item.introduction !== ''">
        <label for="">自己紹介</label>
        <div class="right">
          <textarea name="" id="" v-model="item.introduction"></textarea>
          <div class="annotation"><small>※冒頭60文字が主催者一覧画面に表示されます</small></div>
        </div>
      </div>

      <!-- Career -->
      <div class="form-content is-flex" v-if="item.career !== ''">
        <label for="">経歴</label>
        <textarea name="" id="" v-model="item.career"></textarea>
      </div>

      <!-- Other -->
      <div class="form-content is-flex" v-if="item.other !== ''">
        <label for="">その他</label>
        <textarea name="" id="" v-model="item.other"></textarea>
      </div>

      <!-- Residence -->
      <div class="form-content is-flex" v-if="item.residence !== ''">
        <label for="">居住地</label>
        <textarea name="" id="" class="small" v-model="item.residence"></textarea>
      </div>

      <!-- Owned Qualification -->
      <div class="form-content is-flex" v-if="item.ownedQualification !== ''">
        <label for="">保有資格</label>
        <textarea name="" id="" class="small" v-model="item.ownedQualification"></textarea>
      </div>
      <div class="form-content is-flex vertical-center">
        <label for="">開催可能イベントカテゴリ</label>
        <div class="right">
          <label for="">中イベントカテゴリ名, 中イベントカテゴリ名, 中イベントカテゴリ名</label>
        </div>
      </div>
      <div class="is-flex button-wrapper center">
        <input type="submit" value="保存" class="button">
        <a href=""></a>
      </div>
    </main>
    </v-form>
  </div>
</template>
<script>
import { getForm, update } from "@services/crud";
export default {
  data() {
    return {
      item: {
        name: "",
        email: "",
        password: "",
        gender: "",
        birthDate: {
          day: "",
          month: "",
          year: "",
        },
        tel: "",
        postCode: "",
        autoInput: "",
        prefecture: "",
        profileImage: "",
        introduction: "",
        career: "",
        other: "",
        residence: "",
        ownedQualification: "",
        organizableEvent: "",
        eventOwner: "",
      },
      formData: {},
      showPasswordInput: false,
    }
  },
  methods: {
    async submit() {
      let payload = new FormData();
      let options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      if (this.$refs.eventForm.validate()) {
        payload.append("display_name", this.item.name);
        payload.append("email", this.item.email);
        if(this.showPasswordInput){
          payload.append("password", this.item.password);
        }
        payload.append("gender", this.item.gender);
        payload.append("phone", this.item.tel);
        payload.append("post_code", this.item.postCode);
        payload.append("address", this.item.prefecture);
        payload.append("introduction", this.item.introduction);
        payload.append("carrer", this.item.career);
        payload.append("other", this.item.other);
        payload.append("residence", this.item.residence);
        payload.append("title", this.item.ownedQualification);
        payload.append("birth_date", this.item.birthDate.year + '-' + this.item.birthDate.month + '-' + this.item.birthDate.day);
      }

      await update('/user/mypage', payload, options);
    }
  },
  async created() {
    try{
      const form = await getForm(this.$route.path);
      let {item} = form;
      this.item = {
        ...this.item,
        name: item.display_name,
        email: item.email,
        password: item.password,
        gender: item.gender ? "man" : "woman",
        tel: item.phone ? item.phone : "",
        postCode: item.post_code ? item.post_code : "",
        prefecture: item.address ? item.address : "",
        introduction: item.introduction ? item.introduction : "",
        career: item.carrer ? item.carrer : "",
        other: item.other ? item.other : "",
        residence: item.residence ? item.residence : "",
        ownedQualification: item.title ? item.title : "",
        eventOwner: item.event_owner
      }
      this.item.birthDate.year = item.birth_date.replace(/-/g, "/").slice(0, -15); // get year
      this.item.birthDate.month = item.birth_date.replace(/-/g, "/").slice(5, -12); // get month
      this.item.birthDate.day = item.birth_date.replace(/-/g, "/").slice(8, -9); //get day
    }catch (err) {
      console.log(err);
    }
  }
}
</script>
