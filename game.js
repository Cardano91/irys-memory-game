// Rastgele bir sayı oluştur (1-100 arası)
const targetNumber = Math.floor(Math.random() * 100) + 1;
let irys;

// Irys bağlantısını başlat
async function initIrys() {
  if (!window.ethereum) {
    alert("Lütfen Metamask kurun!");
    return null;
  }

  try {
    // Metamask ile cüzdan bağlantısı
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const url = "https://node1.irys.xyz"; // Irys node
    const token = "solana"; // veya "ethereum" seçebilirsiniz
    const provider = window.ethereum;
    const wallet = { provider };
    const irys = new window.Irys({ url, token, wallet });
    return irys;
  } catch (error) {
    console.error("Irys başlatma hatası:", error);
    alert("Irys bağlantısı kurulamadı. Lütfen cüzdanınızı kontrol edin.");
    return null;
  }
}

// Tahmin fonksiyonu
async function makeGuess() {
  const guessInput = document.getElementById("guessInput");
  const resultDiv = document.getElementById("result");
  const guess = parseInt(guessInput.value);

  // Geçerli giriş kontrolü
  if (isNaN(guess) || guess < 1 || guess > 100) {
    resultDiv.innerHTML = "Lütfen 1 ile 100 arasında bir sayı girin!";
    return;
  }

  // Irys başlat
  if (!irys) {
    irys = await initIrys();
    if (!irys) return;
  }

  // Tahmini blockchain'e kaydet
  try {
    const tags = [
      { name: "Content-Type", value: "text/plain" },
      { name: "App-Name", value: "Irys-Number-Game" },
      { name: "Guess", value: guess.toString() },
    ];
    const receipt = await irys.upload(`Tahmin: ${guess}`, { tags });
    console.log("Tahmin kaydedildi, ID:", receipt.id);

    // Sonucu kontrol et
    if (guess === targetNumber) {
      resultDiv.innerHTML = `Tebrikler! Doğru tahmin: ${targetNumber}. Blockchain ID: ${receipt.id}`;
    } else if (guess < targetNumber) {
      resultDiv.innerHTML = `Daha büyük bir sayı girin. Tahmininiz kaydedildi (ID: ${receipt.id}).`;
    } else {
      resultDiv.innerHTML = `Daha küçük bir sayı girin. Tahmininiz kaydedildi (ID: ${receipt.id}).`;
    }
  } catch (error) {
    console.error("Tahmin kaydetme hatası:", error);
    resultDiv.innerHTML = "Tahmin kaydedilemedi. Lütfen tekrar deneyin.";
  }

  // Giriş alanını temizle
  guessInput.value = "";
}

// İlk başlatma
window.onload = async () => {
  irys = await initIrys();
};
