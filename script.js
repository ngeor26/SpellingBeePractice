const msg = new SpeechSynthesisUtterance();
let words = [];
const input = document.querySelector("#guess");
let activeWord = "";
document.addEventListener("DOMContentLoaded", async () => {
  await fetch("better.txt")
    .then((response) => response.text())
    .then((textString) => {
      words = textString.split("\r\n");
    });
});

document.querySelector("#new").addEventListener("click", newWord);
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    newWord();
  }
});

function newWord() {
  let diff = displayRadioValue();
  let wordPos = 0;
  if (diff == "Easy") {
    wordPos = getRandomInt(0, 893);
  } else if (diff == "Medium") {
    wordPos = getRandomInt(894, 2938);
  } else {
    wordPos = getRandomInt(2938, 4155);
  }

  msg.text = words[wordPos];
  activeWord = words[wordPos];
  console.log(msg.text);
  window.speechSynthesis.speak(msg);
}

document
  .querySelector("#replay")
  .addEventListener("click", () => window.speechSynthesis.speak(msg));

document.addEventListener("keyup", (e) => {
  if (input.value.toLowerCase() == activeWord.toLowerCase()) {
    input.value = "Good!";
    input.readOnly = true;
    setTimeout(() => {
      input.value = "";
      input.readOnly = false;
    }, 400);
  }
});
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayRadioValue() {
  var ele = document.getElementsByName("options");
  const diffs = ["Easy", "Medium", "Hard"];
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) return diffs[i];
  }
}
