const questions = [
  {
    question: "与“桃李春风一杯酒”组成对偶最恰当的一句是：",
    answers: [
      { text: "树头花落未成荫", correct: false},
      { text: "万草千花一晌开", correct: false},
      { text: "江湖夜雨十年灯", correct: true},
      { text: "风光不与四时同", correct: false},
    ]
  },
  {
    question: "“天下第一行书”指的是：",
    answers: [
      { text: "《寒食帖》", correct: false},
      { text: "《祭侄文稿》", correct: false},
      { text: "《伯远帖》", correct: false},
      { text: "《兰亭序》", correct: true},
    ]
  },
  {
    question: "下列不是莎士比亚作品的是：",
    answers: [
      { text: "《威尼斯商人》", correct: false},
      { text: "《仲夏夜之梦》", correct: false},
      { text: "《茶花女》", correct: true},
      { text: "《第十二夜》", correct: false},
    ]
  },
  {
    question: "下列不是婉约派代表人物的是：",
    answers: [
      { text: "岑参", correct: true},
      { text: "李清照", correct: false},
      { text: "李煜", correct: false},
      { text: "柳永", correct: false},
    ]
  },
  {
    question: "“诗中有画，画中有诗”，是苏轼对哪位诗人的评价？",
    answers: [
      { text: "陶渊明", correct: false},
      { text: "王维", correct: true},
      { text: "孟浩然", correct: false},
      { text: "张籍", correct: false},
    ]
  },
  {
    question: "下列不属于波普艺术流派的艺术家是：",
    answers: [
      { text: "安迪·沃霍尔", correct: false},
      { text: "草间弥生", correct: false},
      { text: "大卫·霍克尼", correct: false},
      { text: "杰克逊·波洛克", correct: true},
    ]
  },
  {
    question: "巴黎圣母院属于西方艺术史上哪种风格的建筑？",
    answers: [
      { text: "罗马式", correct: false},
      { text: "巴洛克式", correct: false},
      { text: "哥特式", correct: true},
      { text: "拜占庭式", correct: false},
    ]
  },
  {
    question: "“林暗草惊风，将军夜引弓。平明寻白羽，没在石棱中”诗中运用了那个典故？",
    answers: [
      { text: "辛弃疾的故事", correct: false},
      { text: "岳飞的故事", correct: false},
      { text: "霍去病的故事", correct: false},
      { text: "李广的故事", correct: true},
    ]
  },
  {
    question: "意大利文艺复兴（文学）三杰没有：",
    answers: [
      { text: "乔万尼·薄伽丘", correct: false},
      { text: "弗朗西斯科·彼特拉克", correct: false},
      { text: "托夸多·塔索", correct: true},
      { text: "但丁·阿利吉耶里", correct: false},
    ]
  },
  {
    question: "黄河流域半坡彩陶纹饰最多的是：",
    answers: [
      { text: "兽面纹", correct: false},
      { text: "凤鸟纹", correct: false},
      { text: "鱼纹", correct: true},
      { text: "几何纹", correct: false},
    ]
  }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion
  .question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});


startQuiz();
