var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var highScorePrint = document.querySelector("#highscores"); //not sure ol
var clearHighScore = document.getElementById("clearScores");


window.addEventListener("load", function(){printHighScore()});

function printHighScore() {
    highscores = scoresSorted(highscores, 'score');

    for (var i = 0; i < highscores.length; i++) {
      console.log(highscores[i].secondsLeft);
      var liTag = document.createElement("li"); 
      liTag.textContent = score.initials + " - " + score.score;
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    }
}

function scoresSorted(array, key) {
  return array.sort(function(a,b) {
    if (a.secondsLeft < b.secondsLeft) {
      return 1;
    }
    return -1;
  });
}


clearHighScore.addEventListener("click", function() {
    localStorage.removeItem("highscores");
    window.location.reload();
});