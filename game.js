// Oyun değişkenleri
let score = 0;
let gameActive = true;
let balloons = [];

const scoreDisplay = document.getElementById("score");
const resultDiv = document.getElementById("result");
const gameContainer = document.getElementById("gameContainer");

// Balon oluşturma
function createBalloon() {
    if (!gameActive || balloons.length >= 10) return;

    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 750 + "px";
    balloon.style.top = Math.random() * 330 + "px";
    gameContainer.appendChild(balloon);

    balloon.addEventListener("click", () => {
        balloon.style.display = "none";
        balloons = balloons.filter(b => b !== balloon);
        score += 1;
        scoreDisplay.textContent = `Skor: ${score}`;
        if (score >= 10) endGame();
        createBalloon(); // Yeni balon oluştur
    });

    balloons.push(balloon);
}

// Oyunu başlat
function startGame() {
    score = 0;
    scoreDisplay.textContent = `Skor: ${score}`;
    resultDiv.style.display = "none";
    balloons = [];
    for (let i = 0; i < 3; i++) createBalloon(); // 3 balonla başla
}

// Oyunu bitir
function endGame() {
    gameActive = false;
    resultDiv.style.display = "block";
    resultDiv.textContent = `Oyun Bitti! Skor: ${score}`;
    balloons.forEach(b => b.remove());
}

// Başlangıç
window.onload = () => {
    startGame();
};
