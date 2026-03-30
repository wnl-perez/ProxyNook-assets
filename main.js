function openGame(url) {

  if (url.includes("cineos"))
    alert("the block screen is fake click up down up down");

  else if (url.includes("fern"))
    alert("YOU MAY RUN INTO PROBLEMS YOU HAVE BEEN WARNED");

}
(function () {
  const size = localStorage.getItem("fontSize");
  const font = localStorage.getItem("fontFamily");
  const color = localStorage.getItem("accentColor");

  if (size)
    document.documentElement.style.setProperty("--font-size", size + "px");

  if (color)
    document.documentElement.style.setProperty("--accent", color);

  if (font)
    document.body.style.fontFamily = font;
})();

// ===============================
// NOTES TOGGLE
// ===============================
const toggle = document.getElementById("notesToggle");
let notesEnabled = localStorage.getItem("notesEnabled") !== "false";
toggle.checked = notesEnabled;

toggle.addEventListener("change", () => {
  notesEnabled = toggle.checked;
  localStorage.setItem("notesEnabled", notesEnabled);
});

// ===============================
// RANDOM NEXURA IMAGE
// ===============================
const images = [
  "/pics/NexusMA.jpg",
  "/pics/NexusMB.jpg",
  "/pics/NexusMG.jpg"
];
const randomImg = document.getElementById("randomImg");

function setRandomImage() {
  if(randomImg) {
    const index = Math.floor(Math.random() * images.length);
    randomImg.src = images[index];
  }
}

// Set the image on page load
setRandomImage();

// ===============================
// OPEN GAME
// ===============================
function openGame(url) {
  if(notesEnabled){
    if(url === 'fern/index.html') alert("It will say 'Not Found.' Click Settings then go back.");
    if(url === 'cineos.html') alert("Blocked screen is a decoy. Press ↑ ↓ ↑ ↓ then click Initiate.");
  }
  window.location.href = url;
}

// Go to games page
function goToGames() {
  window.location.href = "/games";
}

// ===============================
// FILTER CARDS
// ===============================
function filter(type) {
  document.querySelectorAll('.card').forEach(card => {
    card.style.display = (type === 'all' || card.dataset.type === type) ? 'block' : 'none';
  });
}

// ===============================
// STATUS BOX (BATTERY / TIME / FPS)
// ===============================

// ===== Time =====
function updateTime() {
  const timeEl = document.getElementById('time');
  if(timeEl) timeEl.textContent = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

// ===== FPS =====
let lastFrame = performance.now();
let frameCount = 0;
function updateFPS() {
  const now = performance.now();
  frameCount++;
  if(now - lastFrame >= 1000) {
    const fpsEl = document.getElementById('fps');
    if(fpsEl) fpsEl.textContent = frameCount;
    frameCount = 0;
    lastFrame = now;
  }
  requestAnimationFrame(updateFPS);
}
updateFPS();

// ===== Battery =====
if(navigator.getBattery) {
  navigator.getBattery().then(battery => {
    function updateBattery() {
      const level = Math.floor(battery.level * 100);
      const batteryText = document.getElementById('batteryText');
      const batteryFill = document.getElementById('batteryFill');
      const batteryBox = document.getElementById('battery');

      if(batteryText) batteryText.textContent = level + '%';
      if(batteryFill) batteryFill.style.width = level + '%';

      if(batteryBox) batteryBox.classList.toggle('charging', battery.charging);
    }

    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
    updateBattery();
  });
} else {
  const batteryText = document.getElementById('batteryText');
  if(batteryText) batteryText.textContent = 'N/A';
}