document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const gemasCount = document.getElementById('gemasCount');
  const xpCount = document.getElementById('xpCount');
  const lessonsCount = document.getElementById('lessonsCount');
  const lessonsInput = document.getElementById('lessonsInput');

  // Atualiza estatísticas em tempo real
  function updateStats() {
    chrome.runtime.sendMessage({ action: "getStats" }, (stats) => {
      lessonsCount.textContent = stats.lessons;
      gemasCount.textContent = stats.gemas;
      xpCount.textContent = stats.xp;
    });
  }

  // Inicia a extensão
  startBtn.addEventListener('click', () => {
    const lessonsPerRun = parseInt(lessonsInput.value) || 10;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "startAuto",
        lessonsPerRun
      });
      startBtn.textContent = "⚡ Iniciando...";
      setTimeout(() => { startBtn.textContent = "⚡ Iniciar"; }, 2000);
      updateStats();
    });
  });

  // Para a extensão
  stopBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopAuto" });
      stopBtn.textContent = "⏹️ Parando...";
      setTimeout(() => { stopBtn.textContent = "⏹️ Parar"; }, 1000);
    });
  });

  // Atualiza stats a cada 1s
  setInterval(updateStats, 1000);
});
