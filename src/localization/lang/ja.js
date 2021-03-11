/*
 * In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const ja = {
  localeLabel: "日本語",
  general: {
    auth: {
      welcome: "ようこそ",
      signInMessage: "アカウントにサインイン",
      email: "メールアドレス",
      password: "パスワード",
      showPassword: "パスワード表示",
      rememberMe: "パスワードを記録する",
      login: "ログイン",
      logout: "ログアウト",
      register: "登録",
      adminLogin: "管理者ログイン",
      forgotMyPassword: "パスワードを忘れた場合"
    },
    user: {
      firstName: "姓",
      lastName: "名",
      fullName: "名前",
      profPic: "プロフィール画像",
      name: "名前",
      email: "メールアドレス",
      created_at: "登録日時",
      counselor: "担当カウンセラー",
      owner: "主催者"
    },
    event: {
      eventCreate: "イベント作成",
      eventEdit: "イベント編集",
      eventCategory: "イベントカテゴリ",
      eventName: "イベント名",
      eventParticipating: "参加イベント",
      eventOwningList: "主催イベント一覧",
      owner: "主催者",
      openTime: "開催日時",
      date: "日付",
      start: "開始",
      end: "終了",
      onlineEvent: "オンラインイベント",
      prefectures: "都道府県",
      addressAfterCity: "市区町村以降の住所",
      coverImage: "カバー画像",
      detail: "詳細",
      publicPreference: "公開設定",
      save: "保存",
      public: "公開",
      private: "非公開",
      userName: "名前",
      userEmail: "メールアドレス",
      appliedAt: "申込日時",
      settlementMethod: "決済方法",
      ccClearingStatus: "クレカ決済状況",
      participantNumber: "参加者数",
      paymentMethods: "支払い方法",
      total: "合計",
      creditCard: "クレカ",
      transfer: "銀行振込",
      cash: "現金",
      price: "金額",
      dateTime: "開催日時"
    },
    eventCategoryGroup: {
      name: "大イベントカテゴリ名",
      displayOrder: "表示順"
    },
    eventCategories: {
      eventCategoryGroupName: "大イベントカテゴリ名",
      eventCategoryName: "中イベントカテゴリ名",
      price: "金額",
      updateTime: "更新日時",
      categoryEventNumber: "カテゴリのイベント数",
      displayOrder: "表示順",
      displayToList: "一覧への表示",
      publicPage: "公開ページ",
      edit: "編集",
      delete: "削除",
      create: "中イベントカテゴリ作成",
      name: "中イベントカテゴリ名",
      group: "大イベントカテゴリ",
      invitationalEvent: "招待用の非公開イベント",
      save: "保存",
      detail: "詳細",
      coverImage: "カバー画像"
    },
    admin: {
      adminCreate: "管理者作成",
      adminEdit: "管理者編集",
      name: "名前",
      email: "メールアドレス",
      password: "パスワード",
      save: "保存",
      createdAt: "登録日時",
      updatedAt: "更新日時",
      edit: "編集",
      delete: "削除"
    },
    sales: {
      billingList: "売上一覧",
      eventCategory: "中イベントカテゴリ",
      eventName: "イベント名",
      owner: "主催者",
      eventDate: "開催日",
      user: "ユーザー",
      paymentMethods: "支払い方法",
      creditCardSettled: "クレカ決済済み",
      billingPrice: "売上金額",
      csvDownload: "CSVダウンロード",
      delete: "削除",
      create: "中イベントカテゴリ作成",
      name: "中イベントカテゴリ名",
      group: "大イベントカテゴリ",
      invitationalEvent: "招待用の非公開イベント",
      save: "保存",
      detail: "詳細",
      coverImage: "カバー画像"
    },
    role: {
      role: "役割",
      admin: "管理者",
      user: "ユーザー"
    },
    validation: {
      required: "必須",
      optional: "任意",
      confirm: "Confirm"
    },
    demo: {
      dummyMeetings: "Dummy Meetings"
    },
    crud: {
      createNew: "新規作成",
      list: "一覧",
      add: "新規作成",
      edit: "編集",
      update: "更新",
      change: "変更",
      delete: "削除",
      search: "検索",
      all: "全部",
      createdAt: "作成日",
      updatedAt: "更新日",
      action: "編集"
    },
    time: {
      date: "Date",
      birthDate: "生年月日"
    },
    nav: {
      projectName: "Itnav-Aeruba",
      grune: "Grune",
      dashboard: "ダッシュボード",
      users: "ユーザー",
      events: "イベント",
      big_category: "大カテゴリ",
      middle_category: "中カテゴリ",
      admin: "管理者",
      billing_list: "売上一覧"
    },
    placeholder: {
      email: "sample@email.com",
      firstName: "山下",
      lastName: "太郎",
      fullName: "山下太郎"
    },
    alert: {
      youSure: "Are you sure?",
      confirmDelete: "Once the item is deleted, we cannot get it back for you.",
      cancel: "キャンセル",
      confirm: "はい"
    },
    button: {
      save: "保存",
      csvDownload: "CSVダウンロード",
      delete: "削除",
      edit: "編集",
      automaticInputAddress: "住所を自動入力",
      publicPage: "公開ページ",
      details: "詳細"
    },
    page: {
      userList: "ユーザー一覧",
      userCreate: "ユーザー作成",
      userEdit: "ユーザー編集",
      eventList: "イベント一覧",
      adminList: "管理者一覧",
      eventCategoryGroupList: "大イベントカテゴリ一覧",
      eventCategoryGroupEdit: "大イベントカテゴリ作成",
      eventCategoryGroupCreate: "大イベントカテゴリ作成",
      currentBillingStatus: "売上金額",
      currentUser: "参加ユーザー",
      eventDetails: "イベント詳細"
    },
    header: {
      events: {
        eventCategoryGroup: "大イベントカテゴリ",
        eventCategory: "中イベントカテゴリ",
        eventName: "イベント名",
        owner: "主催者",
        eventDate: "開催日",
        startTime: "開始時間"
      },
      categoryGroup: {
        name: "大イベントカテゴリ名",
        displayOrder: "表示順"
      }
    },
    form: {
      gender: "性別",
      phone: "電話番号",
      postCode: "郵便番号",
      address: "住所",
      profileImage: "プロフィール画像",
      rating: "総合評価",
      review: "口コミ",
      introduction: "自己紹介",
      carrer: "経歴",
      other: "その他",
      residence: "居住地",
      title: "保有資格",
      eventOwner: "主催者",
      availableEvent: "開催可能イベント",
      characterType: "キャラタイプ",
      diagnosisResult: "3キャラ判定結果",
      responsibleCounselor: "担当カウンセラー"
    },
    gender: {
      male: "男性",
      female: "女性"
    },
    appBar: {
      holdingEventList: "開催イベント一覧",
      ownerList: "主催者一覧",
      eventCategoryList: "イベントカテゴリ一覧",
      myPage: "マイページ",
      userInformation: "お客様情報",
      judgmentResult: "3キャラ判定結果",
      appliedEvent: "参加イベント",
      hostEventList: "主催イベント一覧",
      hostEventCreate: "主催イベント作成",
      billingList: "売上一覧"
    }
  }
};

export default ja;
