const circle = document.getElementById('circle');
const hourglasses = document.querySelectorAll('.hourglass');
const smiley = document.getElementById('smiley');
const main = document.getElementById('main');
let state = 'initial';
let timerInterval;
let endTime;
let rotation = 0;

setInterval(() => {
  rotation += 180;
  hourglasses.forEach(h => (h.style.transform = `rotate(${rotation}deg)`));
}, 5000);

circle.addEventListener('click', () => {
  if (state === 'initial') {
    startTimer();
  } else if (state === 'ready') {
    circle.textContent = 'I have checked.';
    state = 'checked';
    showSmiley();
  }
});

function startTimer() {
  state = 'timing';
  endTime = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
  timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

function updateCountdown() {
  const remaining = endTime - Date.now();
  if (remaining <= 0) {
    clearInterval(timerInterval);
    circle.textContent = '00:00:00';
    playSound();
    showConfetti();
    setTimeout(() => {
      circle.textContent = 'I will check now';
      state = 'ready';
    }, 5000);
  } else {
    const hours = Math.floor(remaining / 3600000)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((remaining % 3600000) / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((remaining % 60000) / 1000)
      .toString()
      .padStart(2, '0');
    circle.textContent = `${hours}:${minutes}:${seconds}`;
  }
}

function playSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 440;
  oscillator.connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + 1);
}

function showConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

function showSmiley() {
  main.style.display = 'none';
  smiley.style.display = 'flex';
  setTimeout(reset, 5000);
}

function reset() {
  smiley.style.display = 'none';
  main.style.display = 'flex';
  circle.textContent = 'Nom Nom time';
  state = 'initial';
}
