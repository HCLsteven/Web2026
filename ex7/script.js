const wordArea = document.getElementById("word-area");
const inputBox = document.getElementById("input-box");
const submitBtn = document.getElementById("submit-btn");
const msg = document.getElementById("msg");
const statusDiv = document.getElementById("status");

let words = [];
let wrongCount = 0;

// 產生亂數字串
function randomString(length = 4) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }
  return result;
}

// 新增一個字串
function addOneWord() {
  words.push(randomString());
  renderWords();
}

// 一次新增多個字串
function addMultipleWords(count) {
  for (let i = 0; i < count; i++) {
    words.push(randomString());
  }
  renderWords();
}

// 顯示畫面
function renderWords() {
  wordArea.innerHTML = "";

  for (let i = 0; i < words.length; i++) {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = words[i];
    wordArea.appendChild(span);
  }

  statusDiv.textContent = `目前字串數量：${words.length}，連續打錯次數：${wrongCount}`;
}

// 檢查輸入
function checkInput() {
  const inputText = inputBox.value.trim();

  if (inputText === "") {
    return;
  }

  const index = words.indexOf(inputText);

  if (index !== -1) {
    // 打對：刪除字串，錯誤次數歸零
    words.splice(index, 1);
    wrongCount = 0;
    msg.textContent = "答對了，已刪除字串";
    msg.style.color = "green";
  } else {
    // 打錯：原本先加 1 個
    wrongCount++;
    addOneWord();

    msg.textContent = `打錯了，第 ${wrongCount} 次`;
    msg.style.color = "red";

    // 連續打錯三次，再額外多加 3 個
    if (wrongCount === 3) {
      addMultipleWords(3);
      msg.textContent = "連續打錯三次！額外新增 3 個亂數字串";
      wrongCount = 0; // 重新計算下一輪
    }
  }

  inputBox.value = "";
  renderWords();
}

// 按鈕送出
submitBtn.addEventListener("click", checkInput);

// 按 Enter 也能送出
inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkInput();
  }
});

// 初始先放 3 個字串
addMultipleWords(3);
