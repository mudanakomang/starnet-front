// 質問配列
let question = [
      "何事も自分で決めるよりも、他の人に決めてもらう方が楽だ", 
      "頭をなでられたり、触れられるのは苦手", 
      "褒められると、素直に嬉しい（裏を読んだり、抵抗がでたりしない）", 
      "後輩が敬語を使わずに話しかけてきたら腹がたつ", 
      "人のために、多少無理をしてでも頑張ったりはしたくない", 
      "食事に行った際メニューは、フィーリングですぐ決めてしまう", 
      "待ち時間が長いとイライラしてしまう", 
      "自撮りをよくする", 
      "人の話をじっくり聞くのは苦手", 
      "自分の弱点はできれば人に知られたくない", 
      "猫より犬が好き", 
      "負けると分かっている勝負はしたくない", 
      "ついついテレビにつっこみを入れてしまう", 
      "排水溝の掃除は嫌い、できるだけ自分以外の誰かに任せたい", 
      "急に予定が変わったり、ドタキャンされると腹が立つ", 
      "夜の男女関係で尽くすことを求められると違和感を感じる", 
      "自分はマイペースだと思う　or人から言われる", 
      "好き嫌いがはっきりしている", 
      "イタズラ、サプライズをするのがとても好きだ", 
      "「料理を作る」は人の上に立つイメージよりは人の下に立つイメージ", 
      "仲直りをする際、できれば相手に先に謝ってほしい", 
      "裏表はあまりない方だと思う", 
      "歩くペースが違う場合、合わせようと努力はしたくない", 
      "相手からデートに誘われる方が楽だ", 
      "重要な事を決める際は、自分に合わせてほしい。or自分に合わせてもらえるようにもっていく。"
    ];

// 質問配列の中身をランダム化
let shuffled = question.map(function (a) {
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
let questionProguressCount = 25;

// プラススコア
let plusScore = 0;

// マイナススコア
let minusScore = 0;

// 簡易判定スタートボタンを押した際の表示切替
let decisionStartButton = document.getElementById("judmentStartButton");
decisionStartButton.addEventListener('click', function () {
  console.log("click");
  document.getElementById("top").style.display = "none";
  document.getElementById("question").style.display = "block";
});

// ページ読み込んだ際にHTMLに質問文を表示
window.onload = function () {
  // html表示
  // 質問番号
  document.getElementById("questionNumber").textContent = `${questionNumberCount}`;
  // 質問文
  document.getElementById("questionText").innerHTML = `<p>${shuffled[0]}</p>`;
  // 終了までの質問数
  document.getElementById('questionProgressNumber').textContent = `${questionProguressCount}問`;
}

// 選択肢のボタンを押した際に質問文,各スコアを更新
function selectOption() {

  if (shuffled[answerCount + 1]) {
    document.getElementById("questionNumber").textContent = `${questionNumberCount + 1}`;
    document.getElementById("questionText").innerHTML = `<p>${shuffled[answerCount + 1]}</p>`;
    document.getElementById('questionProgressNumber').textContent = `${questionProguressCount - 1}問`;
    document.getElementById("questionProgressBar").value = questionNumberCount + 1;
  }
  if (this.id == "yes") {
    if (answerCount == shuffled.length - 1) {
      return plusScore++, postResult();
    } else {
      return plusScore++, answerCount++, questionNumberCount++, questionProguressCount--;
    }
  } else if (this.id == "no") {
    if (answerCount == shuffled.length - 1) {
      return minusScore++, postResult();
    } else {
      return minusScore++, answerCount++, questionNumberCount++, questionProguressCount--;
    }
  }

}
let yesButton = document.getElementById("yes");
yesButton.addEventListener('click', selectOption);

let noButton = document.getElementById("no");
noButton.addEventListener('click', selectOption);

// 回答結果のフロント・送信処理
function postResult() {

  // リザルト画面の表示切替
  document.getElementById("question").style.display = "none";
  document.getElementById("result").style.display = "block";

  // スコアテキストの更新
  document.getElementById("plusScore").textContent = plusScore;
  document.getElementById("minusScore").textContent = minusScore;

  // スコア背景の円表示調整
  // 正答率算出
  function rateCalculation(score) {
    let rate = Math.round(score / 25 * 100);
    return rate;
  }

  // プラス
  let plusRate = rateCalculation(plusScore);
  document.getElementById("plusScoreGraph").style.background = `conic-gradient(#F57325 0, #F57325 ${plusRate}%, #FFA360 ${plusRate}%, #FFA360 100%)`;
  
  // マイナス
  let minusRate = rateCalculation(minusScore);
  document.getElementById("minusScoreGraph").style.background = `conic-gradient(#E58E22 0,  #E58E22 ${minusRate}%, #EEB75D  ${minusRate}%, #EEB75D  100%)`;
  
  // userID対応
  let userID = (new URL(document.location)).searchParams.get("user_id");
  userID = userID ? userID : 1;
  
  var answerJson = {
    "user_id": userID,
    "type": 2,
    "result": {
      "plus_score": plusScore,
      "minus_score": minusScore
    }
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