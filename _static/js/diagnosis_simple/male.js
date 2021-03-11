// 男性版の質問配列
let maleQuestion = [{
      id: 1,
      type: "prince",
      text: "多少お金がかかってもオシャレには気を遣いたいと思う"
    }, {
      id: 2,
      type: "prince",
      text: "女性におごってもらうことには抵抗がある"
    }, {
      id: 3,
      type: "prince",
      text: "将来の夢やビジョンが明確である"
    }, {
      id: 4,
      type: "prince",
      text: "物事を決める時には即断即決する事が多いと思う"
    }, {
      id: 5,
      type: "prince",
      text: "家族よりも仕事を優先してしまうタイプだと思う"
    }, {
      id: 6,
      type: "prince",
      text: "家事や育児は基本的には女性の仕事だと思う"
    }, {
      id: 7,
      type: "prince",
      text: "周りから一目置かれる存在でありたいと思う"
    }, {
      id: 8,
      type: "prince",
      text: "人前に出たり、目立ってしまう事が多い"
    }, {
      id: 9,
      type: "prince",
      text: "可能な限り、頭は下げたくないと思う"
    }, {
      id: 10,
      type: "prince",
      text: "女性と次に会う約束ができたら、メールやラインは基本的には入れない。"
    }, {
      id: 11,
      type: "prince",
      text: "ノルマや競争のある仕事は嫌いではない"
    }, {
      id: 12,
      type: "prince",
      text: "これまで、リーダーやキャプテンなどの立場になる事が多かったと思う"
    }, {
      id: 13,
      type: "prince",
      text: "部下や後輩からは慕われるよりも尊敬されたいと思う"
    }, {
      id: 14,
      type: "prince",
      text: "思い立ったらすぐに行動するタイプだと思う"
    }, {
      id: 15,
      type: "prince",
      text: "デートの待ち合わせの際、女性が自分より早く来て待っていてくれたら嬉しい"
    }, {
      id: 16,
      type: "counselor",
      text: "リーダーよりも、みんなをフォローする立場の方が向いていると思う"
    }, {
      id: 17,
      type: "counselor",
      text: "部下や後輩からは、尊敬されるよりも慕われたいと思う"
    }, {
      id: 18,
      type: "counselor",
      text: "自分の主義や主張を押し通すタイプではないと思う"
    }, {
      id: 19,
      type: "counselor",
      text: "女性の望みに柔軟に対応できる方だと思う"
    }, {
      id: 20,
      type: "counselor",
      text: "相手が困っていると、つい手を差し伸べたくなる"
    }, {
      id: 21,
      type: "counselor",
      text: "人の相談に乗ることが多い方だと思う"
    }, {
      id: 22,
      type: "counselor",
      text: "デートプランを立て、喜んでもらえるように準備する"
    }, {
      id: 23,
      type: "counselor",
      text: "恋愛は一目惚れからはじまる事が多い"
    }, {
      id: 24,
      type: "counselor",
      text: "女性に振り回されてしまうことが多いと思う"
    }, {
      id: 25,
      type: "counselor",
      text: "家事や育児を協力することに抵抗はない"
    }, {
      id: 26,
      type: "counselor",
      text: "メールやラインにはできるだけ早くレスポンスしたいと思う"
    }, {
      id: 27,
      type: "counselor",
      text: "人前に出たり表に立つより、裏方の方が落ち着く"
    }, {
      id: 28,
      type: "counselor",
      text: "場を和ませるのは一番性に合っていると思う"
    }, {
      id: 29,
      type: "counselor",
      text: "先をイメージしてリスク回避を考えてしまう"
    }, {
      id: 30,
      type: "counselor",
      text: "自分の事よりも、周りの事をつい優先してしまう"
    }, {
      id: 31,
      type: "boy",
      text: "上司や先輩から可愛がられるタイプだと思う"
    }, {
      id: 32,
      type: "boy",
      text: "競争とかノルマのある仕事には出来れば就きたくない"
    }, {
      id: 33,
      type: "boy",
      text: "正直、責任が重い立場はあまり望んでいないと思う"
    }, {
      id: 34,
      type: "boy",
      text: "女性に気を許すとつい甘えたくなってしまう"
    }, {
      id: 35,
      type: "boy",
      text: "5歳以上年上の女性と付き合うことに抵抗はない"
    }, {
      id: 36,
      type: "boy",
      text: "自分より高収入の女性と付き合うことに抵抗はない"
    }, {
      id: 37,
      type: "boy",
      text: "人とのつながりを大切にしている"
    }, {
      id: 38,
      type: "boy",
      text: "1人で過ごす、自分だけの時間を自由に持てないとストレスになる"
    }, {
      id: 39,
      type: "boy",
      text: "自分は繊細な人間だと思う"
    }, {
      id: 40,
      type: "boy",
      text: "計画的にお金を使うタイプではないと思う"
    }, {
      id: 41,
      type: "boy",
      text: "家事をする環境から逃げてきたと思う"
    }, {
      id: 42,
      type: "boy",
      text: "オリジナリティーや感性を大切にしたい"
    }, {
      id: 43,
      type: "boy",
      text: "出世や成功よりも、楽しく快適に生きる事を優先したい"
    }, {
      id: 44,
      type: "boy",
      text: "女性におごってもらうことにあまり抵抗はない"
    }, {
      id: 45,
      type: "boy",
      text: "女性に対して何よりも、癒しや包容力を求めてしまう"
    }];

// 男性版の質問配列の中身をランダム化
let shuffled = maleQuestion.map(function (a) {
  return {
    weight: Math.random(),
    value: a
  }
}).sort(function (a, b) {
  return a.weight - b.weight
}).map(function (a) {
  return a.value
});

// テキスト更新用のカウンタ
let answerCount = 0;

// 質問番号用のカウンタ
let questionNumberCount = 1;

// 進捗用のカウンタ
let questionProguressCount = 45;

// 王子タイプのスコア
let princeScore = 0;

// カウンセラータイプのスコア
let counselorScore = 0;

// 男の子タイプのスコア
let boyScore = 0;

// 回答結果の配列
let answerArray = [];

// 簡易判定スタートボタンを押した際の表示切替
let decisionStartButton = document.getElementById("judmentStartButton");
decisionStartButton.addEventListener('click', function () {
  document.getElementById("top").style.display = "none";
  document.getElementById("question").style.display = "block";
});

// ページ読み込んだ際にHTMLに質問文を表示
window.onload = function () {
  // html表示
  // 質問番号
  document.getElementById("questionNumber").textContent = `${questionNumberCount}`;
  // 質問文
  document.getElementById("questionText").innerHTML = `<p>${shuffled[0].text}</p>`;
  // 終了までの質問数
  document.getElementById('questionProgressNumber').textContent = `${questionProguressCount}問`
}

// 選択肢のボタンを押した際に質問文,各スコアを更新
function selectOption() {

  if (shuffled[answerCount + 1]) {
    // 質問数更新
    document.getElementById("questionNumber").textContent = `${questionNumberCount + 1}`;
    // 質問文更新
    document.getElementById("questionText").innerHTML = `<p>${shuffled[answerCount + 1].text}</p>`;
    // 終了までの質問数更新
    document.getElementById('questionProgressNumber').textContent = `${questionProguressCount - 1}問`;
    // プログレスバー更新
    document.getElementById("questionProgressBar").value = questionNumberCount + 1;
  }

  // 各スコア更新機能
  if (this.id == "exactly") {
    if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return princeScore = princeScore + 10, postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return counselorScore = counselorScore + 10, postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return boyScore = boyScore + 10, postResult();
    } else if (shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return princeScore = princeScore + 10, answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return counselorScore = counselorScore + 10, answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 10
      });
      return boyScore = boyScore + 10, answerCount++, questionNumberCount++, questionProguressCount--;
    }
  } else if (this.id == "notReally") {
    if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return postResult();
    } else if (shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 0
      });
      return answerCount++, questionNumberCount++, questionProguressCount--;
    }
  } else if (this.id == "wellLikeThat") {
    if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return princeScore = princeScore + 5, postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return counselorScore = counselorScore + 5, postResult();
    } else if (answerCount == shuffled.length - 1 && shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return boyScore = boyScore + 5, postResult();
    } else if (shuffled[answerCount].type == "prince") {
      answerArray.push({
        "chara_type": 10,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return princeScore = princeScore + 5, answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "counselor") {
      answerArray.push({
        "chara_type": 20,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return counselorScore = counselorScore + 5, answerCount++, questionNumberCount++, questionProguressCount--;
    } else if (shuffled[answerCount].type == "boy") {
      answerArray.push({
        "chara_type": 40,
        "question_id": shuffled[answerCount].id,
        "score": 5
      });
      return boyScore = boyScore + 5, answerCount++, questionNumberCount++, questionProguressCount--;
    }
  }

}

let exactlyButton = document.getElementById("exactly");
exactlyButton.addEventListener('click', selectOption);

let notReallyButton = document.getElementById("notReally");
notReallyButton.addEventListener('click', selectOption);

let wellLikeThatButton = document.getElementById("wellLikeThat");
wellLikeThatButton.addEventListener('click', selectOption);

// 回答結果のフロント・送信処理
function postResult() {

  // 回答の配列をquestion_id順にソート
  answerArray.sort(function (a, b) {
    if (a.question_id < b.question_id) return -1;
    if (a.question_id > b.question_id) return 1;
    return 0;
  });

  // リザルト画面の表示切替
  document.getElementById("question").style.display = "none";
  document.getElementById("result").style.display = "block";

  // スコアテキストの更新
  document.getElementById("princeScore").textContent = princeScore;
  document.getElementById("counselorScore").textContent = counselorScore;
  document.getElementById("boyScore").textContent = boyScore;

  // スコア背景の円表示調整
  // 正答率算出
  function rateCalculation(score) {
    let rate = Math.round(score / 150 * 100);
    return rate;
  }

  // 王子タイプ
  let princeRate = rateCalculation(princeScore);
  document.getElementById("princeScoreGraph").style.background = `conic-gradient(#3C7CBF 0, #3C7CBF ${princeRate}%, #89BDF4 ${princeRate}%, #89BDF4 100%)`;

  // カウンセラータイプ
  let counselorRate = rateCalculation(counselorScore);
  document.getElementById("counselorScoreGraph").style.background = `conic-gradient(#2BA8C6 0,  #2BA8C6 ${counselorRate}%, #7CCDE1  ${counselorRate}%, #7CCDE1  100%)`;

  // 男の子タイプ
  let boyRate = rateCalculation(boyScore);
  document.getElementById("boyScoreGraph").style.background = `conic-gradient(#E58E00 0, #E58E00 ${boyRate}%, #EEB75D ${boyRate}%, #EEB75D 100%)`;

  // userID対応
  let userID = (new URL(document.location)).searchParams.get("user_id");
  userID = userID ? userID : 1;
  
  var answerJson = {
    "user_id": userID,
    "type": 1,
    "result": answerArray
  };

  // FetchAPIのオプション準備
  const param = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    // リクエストボディ
    body: JSON.stringify(answerJson)
  };
  //TODO: urlに関しては後ほど設定をお願い致します
  fetch("/fetch", param).then((res) => {
    console.log("res", res);
  }).then((data) => {
    console.log("data", data);
  }).catch((error) => {
    console.log("error", error);
  });

}