
  let timerInterval;
  let remainingTime = 0;

  function updateDisplay() {
    const mins = Math.floor(remainingTime / 60);
    const secs = remainingTime % 60;
    document.getElementById("countdown").textContent =
      String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  function startTimer() {
    const minInput = parseInt(document.getElementById("minutes").value) || 0;
    const secInput = parseInt(document.getElementById("seconds").value) || 0;
    remainingTime = minInput * 60 + secInput;

    clearInterval(timerInterval);
    updateDisplay();

    timerInterval = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        alert("Time's up! 🔔");
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }

  function resetTimer() {
    clearInterval(timerInterval);
    remainingTime = 0;
    updateDisplay();
  }

  // Initialize on load
  updateDisplay();