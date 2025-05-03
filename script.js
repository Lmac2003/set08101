window.onload = () => {
    // Cookbook order button
    const orderBtn = document.getElementById("order-btn");
    const alarmSound = document.getElementById("alarm-sound");
    if (orderBtn) {
      orderBtn.addEventListener("click", () => {
        alert("Thank you for your order! Your CookBook will be with you soon.");
      });
    }
  
    // Timer
    const countdown = document.getElementById("countdown");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
  
    let timerInterval;
    let remainingTime = 0;
  
    // Update display
    const updateDisplay = () => {
      const mins = Math.floor(remainingTime / 60);
      const secs = remainingTime % 60;
      if (countdown) {
        countdown.textContent =
          String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
      }
    };
  
    // Save to localstorage
    const saveTimerState = () => {
      localStorage.setItem("timerRemaining", remainingTime);
      localStorage.setItem("timerLastUpdated", Date.now());
    };
  
    // Load current timer
    const restoreTimer = () => {
      const savedRemaining = parseInt(localStorage.getItem("timerRemaining")) || 0;
      const lastUpdated = parseInt(localStorage.getItem("timerLastUpdated")) || 0;
  
      if (savedRemaining > 0 && lastUpdated > 0) {
        const now = Date.now();
        const elapsed = Math.floor((now - lastUpdated) / 1000);
        remainingTime = Math.max(savedRemaining - elapsed, 0);
      } else {
        remainingTime = 0;
      }
  
      updateDisplay();
  
      if (remainingTime > 0) {
        timerInterval = setInterval(tick, 1000);
      }
    };
  
    const tick = () => {
      if (remainingTime > 0) {
          remainingTime--;
          updateDisplay();
          saveTimerState();
      } else {
          clearInterval(timerInterval);
          alert("Time's up! 🔔");
          alarmSound.play();
          localStorage.removeItem("timerRemaining");
          localStorage.removeItem("timerLastUpdated");
      }
    };
      
  
    // Show on all pages
    window.startTimer = () => {
      const min = parseInt(minutesInput?.value) || 0;
      const sec = parseInt(secondsInput?.value) || 0;
      remainingTime = min * 60 + sec;
  
      clearInterval(timerInterval);
      updateDisplay();
      saveTimerState();
  
      timerInterval = setInterval(tick, 1000);
    };
  
    window.pauseTimer = () => {
      clearInterval(timerInterval);
      saveTimerState();
    };
  
    window.resetTimer = () => {
        clearInterval(timerInterval);
        remainingTime = 0;
        updateDisplay();
        alarmSound.pause();
        alarmSound.currentTime = 0; 
        localStorage.removeItem("timerRemaining");
        localStorage.removeItem("timerLastUpdated");
    };
      
    // Initialize
    restoreTimer();
  };
  