const gameSummary = {
  numbers: 0,
  wins: 0,
  losses: 0,
  draws: 0,
}

const game = {
  playerHand: "",
  aiHand: "",
}
const playBtn = document.querySelector(".start")
const hands = [...document.querySelectorAll('.select img')];

// Pierwsza funkcja
function handSelection() {

  game.playerHand = this.dataset.option
  console.log(game.playerHand);
  hands.forEach(hand => hand.style.boxShadow = '');
  this.style.boxShadow = '0 0 0 4px red';
}
// const handSelection = (e) => {
//  // this - nie tworzy
//  console.log(e.target);
//  console.log(e.currentTarget);
// }
function aiChoice() {
  const aiHand = hands[Math.floor(Math.random() * hands.length)].dataset.option;
  return aiHand;

}

function checkResult(player, ai) {
  console.log(player, ai);
  if (player === ai) {
    return "draw - , -";
  } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
    return "Player :)";
  } else {
    return "Computer :(";
  }
}
//Passing Result
function publishResult(player, ai, result) { //arguments passed from publishResult()
  document.querySelector('[data-summary = "your-choice"]').textContent = player
  document.querySelector('[data-summary = "ai-choice"]').textContent = player
  document.querySelector('[data-summary = "who-win"]').textContent = result

  document.querySelector(".numbers span").textContent =
    ++gameSummary.numbers //preincrementation

  if (result === "Computer :(") {
    document.querySelector(".losses span").textContent = ++gameSummary.losses
    document.querySelector('[data-summary = "who-win"]').style.color = "red";
  } else if (result === "Player :)") {
    document.querySelector(".wins span").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary = "who-win"]').style.color = "green"

  } else {
    document.querySelector(".draws span").textContent = ++gameSummary.draws
    document.querySelector('[data-summary = "who-win"]').style.color = "grey"
  }
  // ^^^ we can also use preincrementation and it's drier
  // document.querySelector(".wins span").textContent = gameSummary.wins

  // document.querySelector(".losses span").textContent = gameSummary.losses

  // document.querySelector(".draws span").textContent = gameSummary.draws
}

function endGame(player, ai) {
  document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = "";
  game.playerHand = "";
  game.aiHand = "";
}


//Control gameFlow
function startGame() {
  if (!game.playerHand) {
    return alert("wybierz dlon!");
  }
  game.aiHand = aiChoice();
  console.log(game.aiHand);
  const gameResult = checkResult(game.playerHand, game.aiHand)
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame(game.playerHand, game.aiHand);
}



playBtn.addEventListener("click", startGame)
hands.forEach(hand => hand.addEventListener('click', handSelection))

// hands.forEach(function (hand) {
//   hand.addEventListener('click', handSelection)
// })

// ES5 Method
