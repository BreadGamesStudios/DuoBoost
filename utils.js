// utils.js
class DuolingoAuto {
  constructor() {
    this.lessonsCompleted = 0;
    this.xpEarned = 0;
    this.gemasAdded = 0;
    this.running = false;
    this.interval = null;
  }

  start(lessonsPerRun = 5) {
    if (this.running) return;
    this.running = true;
    console.log(`[DuolingoAuto] Iniciando... Lições por execução: ${lessonsPerRun}`);

    this.interval = setInterval(() => {
      this.completeLesson();
    }, 3000); // 3 segundos entre lições
  }

  stop() {
    clearInterval(this.interval);
    this.running = false;
    console.log(`[DuolingoAuto] Parada. Lições: ${this.lessonsCompleted}, Gemas: ${this.gemasAdded}, XP: ${this.xpEarned}`);
  }

  async completeLesson() {
    // 1. Clica no botão de próxima lição (se existir)
    const nextButton = document.querySelector('button[data-test="challenge-next-btn"]');
    if (nextButton) {
      nextButton.click();
      console.log('[DuolingoAuto] Próxima lição iniciada');
      await this.delay(2000);
    }

    // 2. Resolve a lição (exemplo: clicar na resposta correta)
    const correctAnswer = document.querySelector('button[data-test="answer-option"]:not([disabled])');
    if (correctAnswer) {
      correctAnswer.click();
      console.log('[DuolingoAuto] Resposta correta selecionada');
      await this.delay(1500);
    }

    // 3. Verifica se a lição foi completada
    const lessonComplete = document.querySelector('div[data-test="lesson-complete"]');
    if (lessonComplete) {
      this.lessonsCompleted++;
      this.xpEarned += 10; // XP padrão por lição
      console.log(`[DuolingoAuto] Lição ${this.lessonsCompleted} completada! XP: +${10}`);

      // 4. Adiciona gemas (simulação com multiplicador)
      const gemasPerLesson = 10 * 1.2; // +20% por lição
      this.addGemas(Math.floor(gemasPerLesson));
      this.stopIfLimitReached();
    }
  }

  addGemas(amount) {
    chrome.runtime.sendMessage(
      { action: "addGemas", amount },
      (response) => {
        if (response?.success) {
          this.gemasAdded += amount;
          console.log(`[DuolingoAuto] Gemas adicionadas: ${response.newGemas}`);
          chrome.runtime.sendMessage({ action: "updateGemas", gemas: response.newGemas });
        }
      }
    );
  }

  stopIfLimitReached() {
    if (this.lessonsCompleted >= parseInt(document.getElementById('lessonsInput')?.value || 10)) {
      this.stop();
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Inicializa
const duolingoAuto = new DuolingoAuto();
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "startAuto") {
    duolingoAuto.start(request.lessonsPerRun);
  } else if (request.action === "stopAuto") {
    duolingoAuto.stop();
  } else if (request.action === "getStats") {
    return {
      lessons: duolingoAuto.lessonsCompleted,
      gemas: duolingoAuto.gemasAdded,
      xp: duolingoAuto.xpEarned
    };
  }
});
