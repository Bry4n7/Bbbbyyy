// --- FEATURE: DATA API FETCH (RUBRIC REQUIREMENT) ---
async function fetchHostWeather() {
  const container = document.getElementById('apiContent');
  try {
    // Fetching live weather data for Estadio Azteca, Mexico City
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=19.3029&longitude=-99.1505&current_weather=true');
    const data = await res.json();
    container.innerHTML = `
      <span>📍 Estadio Azteca, MEX</span>
      <span class="temp">${data.current_weather.temperature}°C</span>
      <span>Wind: ${data.current_weather.windspeed} km/h</span>
      <span style="font-size:0.8rem; color:#aaa;">(Live via Open-Meteo API)</span>
    `;
  } catch (err) {
    container.innerHTML = `<span>Weather data currently unavailable.</span>`;
  }
}

// --- FEATURE: JAVASCRIPT AUDIO (RUBRIC REQUIREMENT) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playClickSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.type = 'sine'; // Smooth clean blip sound
  oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // Start frequency
  oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1); // Drop rapidly
  
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Volume
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1); // Fade out rapidly
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

// Attach audio to all interactive elements on load
document.addEventListener('DOMContentLoaded', () => {
  fetchHostWeather();
  document.querySelectorAll('.interactive, button, .team-entry').forEach(el => {
    el.addEventListener('click', playClickSound);
  });
});


// --- 1. FULL 48 TEAM DATA (Realistic 2026 Rosters) ---
const worldCupData = {
  "Group A": [
    { team: "Mexico", strength: 80, players: { star: "E. Álvarez", prospect: "Yael Padilla", toWatch: "J. Quiñones" } },
    { team: "South Africa", strength: 68, players: { star: "R. Williams", prospect: "S. Mofokeng", toWatch: "T. Zwane" } },
    { team: "South Korea", strength: 78, players: { star: "Hwang Hee-chan", prospect: "Yang Min-hyuk", toWatch: "Kim Min-jae" } },
    { team: "Czech Rep.", strength: 75, players: { star: "T. Souček", prospect: "A. Karabec", toWatch: "A. Hložek" } }
  ],
  "Group B": [
    { team: "Canada", strength: 77, players: { star: "J. David", prospect: "Ismaël Koné", toWatch: "T. Buchanan" } },
    { team: "Bosnia", strength: 70, players: { star: "A. Dedić", prospect: "M. Muharemović", toWatch: "R. Krunić" } },
    { team: "Qatar", strength: 68, players: { star: "A. Ali", prospect: "M. Waad", toWatch: "H. Al-Haydos" } },
    { team: "Switzerland", strength: 82, players: { star: "M. Akanji", prospect: "A. Jashari", toWatch: "R. Vargas" } }
  ],
  "Group C": [
    { team: "Brazil", strength: 95, players: { star: "Raphinha", prospect: "Endrick", toWatch: "L. Paquetá" } },
    { team: "Morocco", strength: 84, players: { star: "Y. Bounou", prospect: "I. Akhomach", toWatch: "S. Amrabat" } },
    { team: "Haiti", strength: 60, players: { star: "C. Arcus", prospect: "J. Placide", toWatch: "F. Pierrot" } },
    { team: "Scotland", strength: 74, players: { star: "J. McGinn", prospect: "B. Doak", toWatch: "C. McGregor" } }
  ],
  "Group D": [
    { team: "USA", strength: 80, players: { star: "G. Reyna", prospect: "Cavan Sullivan", toWatch: "F. Balogun" } },
    { team: "Paraguay", strength: 72, players: { star: "M. Almirón", prospect: "D. Gómez", toWatch: "G. Gómez" } },
    { team: "Australia", strength: 73, players: { star: "M. Ryan", prospect: "A. Robertson", toWatch: "J. Irvine" } },
    { team: "Türkiye", strength: 79, players: { star: "A. Güler", prospect: "S. Kılıçsoy", toWatch: "O. Kökçü" } }
  ],
  "Group E": [
    { team: "Argentina", strength: 96, players: { star: "E. Fernández", prospect: "A. Garnacho", toWatch: "J. Álvarez" } },
    { team: "Nigeria", strength: 79, players: { star: "A. Lookman", prospect: "D. Daga", toWatch: "A. Iwobi" } },
    { team: "Iraq", strength: 65, players: { star: "Z. Iqbal", prospect: "A. Amyn", toWatch: "M. Ali" } },
    { team: "Sweden", strength: 78, players: { star: "D. Kulusevski", prospect: "H. Larsson", toWatch: "V. Lindelöf" } }
  ],
  "Group F": [
    { team: "Spain", strength: 92, players: { star: "Pedri", prospect: "Gavi", toWatch: "D. Olmo" } },
    { team: "Ecuador", strength: 78, players: { star: "W. Pacho", prospect: "K. Mercado", toWatch: "P. Hincapié" } },
    { team: "New Zealand", strength: 66, players: { star: "S. Singh", prospect: "B. Waine", toWatch: "J. Bell" } },
    { team: "Ukraine", strength: 77, players: { star: "M. Mudryk", prospect: "Y. Yarmoliuk", toWatch: "V. Tsygankov" } }
  ],
  "Group G": [
    { team: "France", strength: 95, players: { star: "A. Griezmann", prospect: "Leny Yoro", toWatch: "M. Thuram" } },
    { team: "Ivory Coast", strength: 77, players: { star: "F. Kessié", prospect: "S. Diakité", toWatch: "E. Ndicka" } },
    { team: "Uzbekistan", strength: 67, players: { star: "E. Shomurodov", prospect: "A. Khusanov", toWatch: "O. Urunov" } },
    { team: "Serbia", strength: 80, players: { star: "A. Mitrović", prospect: "K. Nedeljković", toWatch: "S. Milinković-Savić" } }
  ],
  "Group H": [
    { team: "England", strength: 94, players: { star: "H. Kane", prospect: "Rico Lewis", toWatch: "D. Rice" } },
    { team: "Colombia", strength: 81, players: { star: "J. Rodríguez", prospect: "J. Durán", toWatch: "D. Sánchez" } },
    { team: "Jamaica", strength: 71, players: { star: "M. Antonio", prospect: "D. Whisper", toWatch: "E. Pinnock" } },
    { team: "Greece", strength: 75, players: { star: "O. Vlachodimos", prospect: "C. Tzolis", toWatch: "K. Mavropanos" } }
  ],
  "Group I": [
    { team: "Germany", strength: 90, players: { star: "K. Havertz", prospect: "Paul Wanner", toWatch: "L. Sané" } },
    { team: "Mali", strength: 75, players: { star: "A. Haidara", prospect: "K. Doumbia", toWatch: "H. Traoré" } },
    { team: "Costa Rica", strength: 70, players: { star: "J. Campbell", prospect: "W. Madrigal", toWatch: "A. Cruz" } },
    { team: "Poland", strength: 77, players: { star: "P. Zieliński", prospect: "J. Kiwior", toWatch: "M. Cash" } }
  ],
  "Group J": [
    { team: "Portugal", strength: 93, players: { star: "R. Dias", prospect: "A. Silva", toWatch: "D. Jota" } },
    { team: "Chile", strength: 74, players: { star: "E. Vargas", prospect: "L. Assadi", toWatch: "G. Medel" } },
    { team: "Saudi Arabia", strength: 69, players: { star: "S. Al-Shehri", prospect: "A. Radif", toWatch: "M. Kanno" } },
    { team: "Hungary", strength: 76, players: { star: "W. Orbán", prospect: "M. Lisztes", toWatch: "R. Sallai" } }
  ],
  "Group K": [
    { team: "Belgium", strength: 88, players: { star: "R. Lukaku", prospect: "J. Bakayoko", toWatch: "Y. Tielemans" } },
    { team: "Senegal", strength: 81, players: { star: "K. Koulibaly", prospect: "L. Camara", toWatch: "E. Mendy" } },
    { team: "Honduras", strength: 65, players: { star: "A. Lozano", prospect: "D. Ruiz", toWatch: "D. Maldonado" } },
    { team: "Wales", strength: 73, players: { star: "E. Ampadu", prospect: "C. Crew", toWatch: "N. Williams" } }
  ],
  "Group L": [
    { team: "Netherlands", strength: 89, players: { star: "C. Gakpo", prospect: "J. Hato", toWatch: "N. Aké" } },
    { team: "Uruguay", strength: 84, players: { star: "R. Araujo", prospect: "F. Pellistri", toWatch: "M. Ugarte" } },
    { team: "DR Congo", strength: 72, players: { star: "Y. Wissa", prospect: "M. Elia", toWatch: "A. Masuaku" } },
    { team: "Japan", strength: 80, players: { star: "T. Kubo", prospect: "R. Araki", toWatch: "W. Endo" } }
  ]
};

const venues = ["Estadio Azteca", "SoFi Stadium", "MetLife Stadium", "AT&T Stadium", "Lumen Field", "Mercedes-Benz Stadium"];

function renderGroups() {
  const container = document.getElementById("groupsContainer");
  container.innerHTML = '';
  for (const [groupName, teams] of Object.entries(worldCupData)) {
    let teamsHtml = teams.map(t => `
      <div class="team-entry interactive" onclick="selectTeam('${t.team}')">
        <span class="team-name">${t.team} <span style="font-size:0.8rem; color:#888;">(OVR ${t.strength})</span></span>
        <span class="team-players">★ Star: ${t.players.star}</span>
        <span class="team-players">🌱 Prospect: ${t.players.prospect}</span>
        <span class="team-players">👀 Watch: ${t.players.toWatch}</span>
      </div>`).join('');
    container.innerHTML += `<div class="fifa-tile"><div class="tile-header">${groupName}</div>${teamsHtml}</div>`;
  }
}

function selectTeam(teamName) {
  playClickSound();
  document.getElementById('userProfile').innerText = teamName.toUpperCase() + "_FAN";
  document.getElementById('userProfile').style.background = "rgba(247, 37, 133, 0.3)";
  document.getElementById('userProfile').style.borderColor = "var(--wc-magenta)";
  goHome();
}

function renderSchedule() {
  const container = document.getElementById("scheduleContainer");
  container.innerHTML = ''; 
  let dateCounter = 11; 
  
  const matchPairs = [[0,1], [2,3], [0,2], [1,3], [0,3], [1,2]];
  
  for (const [groupName, teams] of Object.entries(worldCupData)) {
    container.innerHTML += `<div style="margin-top: 20px; color: var(--wc-cyan); font-weight: bold; font-size: 1.2rem;">${groupName.toUpperCase()} FIXTURES</div>`;
    
    for(let i=0; i<matchPairs.length; i++) {
        const tA = teams[matchPairs[i][0]];
        const tB = teams[matchPairs[i][1]];
        
        let diff = tA.strength - tB.strength;
        let drawProb = Math.max(5, Math.min(30, 25 - Math.abs(diff) * 0.8));
        let remProb = 100 - drawProb;
        
        let weightA = Math.exp(diff * 0.1); 
        let weightB = Math.exp(-diff * 0.1);
        
        let wA = Math.round((weightA / (weightA + weightB)) * remProb);
        let wB = Math.round((weightB / (weightA + weightB)) * remProb);
        let finalDraw = 100 - wA - wB; 
        
        container.innerHTML += `
          <div class="match-row">
            <div class="match-teams">${tA.team} <span>VS</span> ${tB.team}</div>
            <div style="text-align: right;">
              <div class="match-meta">JUN ${dateCounter + Math.floor(i/2)} | ${venues[Math.floor(Math.random()*venues.length)]}</div>
              <div class="odds-container">
                <div class="odds-box" title="${tA.team} Win %">1 <strong>${wA}%</strong></div>
                <div class="odds-box" title="Draw %">X <strong>${finalDraw}%</strong></div>
                <div class="odds-box" title="${tB.team} Win %">2 <strong>${wB}%</strong></div>
              </div>
              <button class="sim-btn interactive" onclick="simulateMatch(this, ${tA.strength}, ${tB.strength})">⚽ SIM MATCH</button>
            </div>
          </div>`;
    }
    dateCounter++; 
  }
}

function simulateMatch(btn, strA, strB) {
  playClickSound();
  let rollA = Math.random() * (strA / 12); 
  let rollB = Math.random() * (strB / 12);
  if (strA > strB) rollA += (strA-strB)/15;
  if (strB > strA) rollB += (strB-strA)/15;

  let goalsA = Math.floor(Math.max(0, rollA - 2)); 
  let goalsB = Math.floor(Math.max(0, rollB - 2)); 

  btn.innerHTML = `<span style="font-size: 1.5rem; letter-spacing: 2px;">${goalsA} - ${goalsB}</span>`;
  btn.style.background = "transparent";
  btn.style.color = "var(--wc-green)";
  btn.style.border = "1px solid var(--wc-green)";
  btn.onclick = null; 
  btn.classList.remove('interactive');
}

// --- 2. NAVIGATION & GAME LOOP MANAGER ---
let activeTab = 'homeTab';

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  document.getElementById('backBtn').style.display = (tabId === 'homeTab') ? 'none' : 'block';
  activeTab = tabId;
  window.scrollTo(0, 0);
  if(tabId === 'triviaTab' && currentTriviaIndex === 0) startNewTriviaSession();
  if(tabId === 'dribbleTab') resetDribble();
}
function goHome() { showTab('homeTab'); }

let particles = [];
function createConfetti(x, y, colorPalette) {
  for(let i = 0; i < 50; i++) {
    particles.push({
      x: x, y: y,
      vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 1) * 15,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      size: Math.random() * 6 + 2
    });
  }
}
function drawParticles(ctx) {
  for(let i = 0; i < particles.length; i++) {
    let p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += 0.5;
    ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, p.size, p.size);
  }
}

function gameLoop() {
  if(activeTab === 'gameTab') updatePenalty();
  else if(activeTab === 'juggleTab') updateJuggle();
  else if(activeTab === 'targetTab') updateTarget();
  else if(activeTab === 'crossbarTab') updateCrossbar();
  else if(activeTab === 'dribbleTab') updateDribble();
  requestAnimationFrame(gameLoop);
}

// --- 3. GAME 1: PENALTY HERO ---
const pCtx = document.getElementById('gameCanvas').getContext('2d');
let pScore = 0; let pCelebrating = false;
let pBall = { x: 400, y: 350, speedX: 0, speedY: 0, moving: false };
let goalie = { x: 345, y: 55, width: 110, height: 45, dir: 4.5 };
let goal = { x: 250, y: 30, width: 300, height: 100 };
const diffs = { easy: { speed: 3, width: 90 }, medium: { speed: 6, width: 110 }, hard: { speed: 10, width: 130 } };
let currentDiff = 'medium';

function setDifficulty(level) {
  document.querySelectorAll('.diff-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`diff-${level}`).classList.add('active');
  currentDiff = level; goalie.width = diffs[level].width;
  goalie.dir = goalie.dir > 0 ? diffs[level].speed : -diffs[level].speed;
  pScore = 0; document.getElementById('scoreBoard').innerText = pScore;
}

function updatePenalty() {
  pCtx.clearRect(0, 0, 800, 400);
  pCtx.strokeStyle = 'rgba(255,255,255,0.3)'; pCtx.lineWidth = 3;
  pCtx.strokeRect(150, 0, 500, 150); 
  pCtx.beginPath(); pCtx.arc(400, 150, 60, 0, Math.PI); pCtx.stroke(); 
  pCtx.beginPath(); pCtx.rect(goal.x, goal.y, goal.width, goal.height);
  pCtx.fillStyle = 'rgba(0, 255, 135, 0.05)'; pCtx.fill();
  pCtx.strokeStyle = '#00ff87'; pCtx.lineWidth = 4; pCtx.stroke(); pCtx.lineWidth = 1;

  goalie.x += goalie.dir;
  if(goalie.x + goalie.width > goal.x + goal.width || goalie.x < goal.x) goalie.dir *= -1;
  pCtx.fillStyle = '#e3001b'; pCtx.fillRect(goalie.x, goalie.y, goalie.width, goalie.height);
  pCtx.fillStyle = '#fff'; pCtx.font = "bold 16px 'Oswald'"; pCtx.fillText("VOLPI", goalie.x + goalie.width/2 - 18, goalie.y + 28);

  if(pBall.moving) {
    pBall.y -= pBall.speedY; pBall.x += pBall.speedX;
    if(pBall.y <= goalie.y + goalie.height) { pBall.moving = false; checkPenaltyGoal(); }
  } else if(!pCelebrating) {
    pCtx.fillStyle = '#0033a0'; pCtx.fillRect(375, 360, 50, 40); 
  }

  pCtx.beginPath(); pCtx.arc(pBall.x, pBall.y, 10, 0, Math.PI * 2);
  pCtx.fillStyle = '#ffffff'; pCtx.fill(); pCtx.stroke();
  drawParticles(pCtx);
}

document.getElementById('gameCanvas').addEventListener('click', (e) => {
  if(!pBall.moving && activeTab === 'gameTab' && !pCelebrating) {
    const rect = document.getElementById('gameCanvas').getBoundingClientRect();
    let targetX = (e.clientX - rect.left) * (800 / rect.width);
    pBall.speedY = Math.random() * 10 + 8; 
    let framesToReach = (pBall.y - (goalie.y + goalie.height)) / pBall.speedY;
    pBall.speedX = (targetX - pBall.x) / framesToReach; 
    pBall.moving = true;
  }
});

function checkPenaltyGoal() {
  let hitGoalie = (pBall.x > goalie.x && pBall.x < goalie.x + goalie.width);
  let insideNet = (pBall.x > goal.x && pBall.x < goal.x + goal.width);
  if(insideNet && !hitGoalie) {
    pScore++; pCelebrating = true;
    createConfetti(pBall.x, pBall.y, ['#00ff87', '#4cc9f0', '#ffffff']);
    triggerOverlay('gameOverlay', "GOLAZO!", "#00ff87");
    if(currentDiff === 'hard') goalie.dir *= 1.1; 
  } else {
    triggerOverlay('gameOverlay', hitGoalie ? "SAVE!" : "MISS!", hitGoalie ? "#f72585" : "#ffffff");
    pScore = 0;
  }
  document.getElementById('scoreBoard').innerText = pScore;
}


// --- 4. GAME 2: KEEPIE UPPIE ---
const jCtx = document.getElementById('juggleCanvas').getContext('2d');
let jScore = 0; let jBall = { x: 400, y: 100, vy: 0, vx: 0, radius: 25 };
let jGravity = 0.4; let jDead = false;

function updateJuggle() {
  jCtx.clearRect(0, 0, 800, 400);
  jCtx.fillStyle = 'rgba(0, 255, 135, 0.1)'; jCtx.fillRect(0, 350, 800, 50);
  
  if(!jDead) {
    jBall.vy += jGravity; jBall.y += jBall.vy; jBall.x += jBall.vx;
    if(jBall.x < jBall.radius || jBall.x > 800 - jBall.radius) jBall.vx *= -1;
    if(jBall.y > 350 - jBall.radius) {
      jDead = true; triggerOverlay('juggleOverlay', "DROPPED!", "#f72585");
      setTimeout(() => { jBall.y = 100; jBall.x = 400; jBall.vy = 0; jBall.vx = 0; jScore = 0; jGravity = 0.4; document.getElementById('juggleScoreBoard').innerText = jScore; jDead = false; }, 1500);
    }
  }

  jCtx.beginPath(); jCtx.arc(jBall.x, jBall.y, jBall.radius, 0, Math.PI * 2);
  jCtx.fillStyle = '#ffffff'; jCtx.fill(); jCtx.strokeStyle = '#000'; jCtx.lineWidth = 3; jCtx.stroke();
}

document.getElementById('juggleCanvas').addEventListener('click', (e) => {
  if(activeTab === 'juggleTab' && !jDead) {
    const rect = document.getElementById('juggleCanvas').getBoundingClientRect();
    let cx = (e.clientX - rect.left) * (800 / rect.width);
    let cy = (e.clientY - rect.top) * (400 / rect.height);
    if(Math.hypot(cx - jBall.x, cy - jBall.y) < jBall.radius + 15) { 
      jBall.vy = -12; jBall.vx = (jBall.x - cx) * 0.4; jScore++; jGravity += 0.02; 
      document.getElementById('juggleScoreBoard').innerText = jScore;
      playClickSound(); // Audio cue for juggling
    }
  }
});


// --- 5. GAME 3: TARGET SHOOT ---
const tCtx = document.getElementById('targetCanvas').getContext('2d');
let tScore = 0;
let tBall = { x: 400, y: 350, speedX: 0, speedY: 0, speedScale: 0, scale: 1.0, moving: false };
let targets = [
  { x: 250, y: 100, r: 40, dx: 2.5, dy: 0.5, color: '#4cc9f0' },
  { x: 550, y: 80, r: 35, dx: -3.5, dy: 1, color: '#f72585' },
  { x: 400, y: 130, r: 30, dx: 4, dy: -0.5, color: '#00ff87' }
];

function updateTarget() {
  tCtx.clearRect(0, 0, 800, 400);
  
  targets.forEach(t => {
    t.x += t.dx; t.y += t.dy;
    if(t.x < 150 + t.r || t.x > 650 - t.r) t.dx *= -1;
    if(t.y < 30 + t.r || t.y > 180 - t.r) t.dy *= -1;
    
    tCtx.beginPath(); tCtx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
    tCtx.strokeStyle = t.color; tCtx.lineWidth = 6; tCtx.stroke();
    tCtx.beginPath(); tCtx.arc(t.x, t.y, t.r - 3, 0, Math.PI * 2);
    tCtx.strokeStyle = 'rgba(255,255,255,0.5)'; tCtx.lineWidth = 2; tCtx.stroke();
  });

  if(tBall.moving) {
    tBall.y -= tBall.speedY; 
    tBall.x += tBall.speedX;
    tBall.scale -= tBall.speedScale;
    
    if(tBall.scale <= 0.25) {
      tBall.moving = false;
      let hit = false;
      for(let t of targets) {
        if(Math.hypot(tBall.x - t.x, tBall.y - t.y) < t.r) {
          tScore += 100; hit = true;
          createConfetti(t.x, t.y, [t.color, '#fff']);
          t.r = Math.max(20, t.r - 2); t.dx *= 1.15; 
          break;
        }
      }
      if(hit) triggerOverlay('targetOverlay', "SWISH +100", "#00ff87");
      else { tScore = 0; triggerOverlay('targetOverlay', "MISS", "#f72585"); }
      document.getElementById('targetScoreBoard').innerText = tScore;
    }
  }

  tCtx.beginPath(); tCtx.arc(tBall.x, tBall.y, Math.max(2, 12 * tBall.scale), 0, Math.PI * 2);
  tCtx.fillStyle = '#fff'; tCtx.fill(); tCtx.strokeStyle = '#000'; tCtx.lineWidth = 1; tCtx.stroke();
  drawParticles(tCtx);
}

document.getElementById('targetCanvas').addEventListener('click', (e) => {
  if(!tBall.moving && activeTab === 'targetTab') {
    const rect = document.getElementById('targetCanvas').getBoundingClientRect();
    let targetX = (e.clientX - rect.left) * (800 / rect.width);
    let targetY = (e.clientY - rect.top) * (400 / rect.height);
    
    let framesToTravel = 35;
    tBall.speedX = (targetX - tBall.x) / framesToTravel;
    tBall.speedY = (tBall.y - targetY) / framesToTravel;
    tBall.speedScale = (1.0 - 0.25) / framesToTravel; 
    tBall.scale = 1.0; tBall.moving = true;
  }
});

// --- 6. GAME 4: RANDOMIZED TRIVIA ---
const allTriviaQuestions = [
  { q: "Which player holds the record for most goals in a single World Cup tournament?", options: ["Pele", "Just Fontaine", "Gerd Muller", "Ronaldo"], ans: 1 },
  { q: "Which country became the first to win the World Cup outside of its own continent?", options: ["Brazil", "Germany", "Argentina", "Italy"], ans: 0 },
  { q: "Who won the Golden Ball as the best player of the 2010 World Cup?", options: ["Andres Iniesta", "Wesley Sneijder", "Diego Forlan", "Xavi"], ans: 2 },
  { q: "What animal was the official mascot of the 1998 World Cup in France?", options: ["Lion", "Rooster", "Dog", "Eagle"], ans: 1 },
  { q: "Which nation has appeared in three World Cup finals without ever winning the trophy?", options: ["Hungary", "Netherlands", "Sweden", "Czechoslovakia"], ans: 1 },
  { q: "In what year did the World Cup feature 32 teams for the first time?", options: ["1994", "1998", "2002", "2006"], ans: 1 },
  { q: "Which country famously defeated Argentina 2-1 in the opening match of the 2022 World Cup?", options: ["Japan", "Mexico", "Saudi Arabia", "South Korea"], ans: 2 },
  { q: "Who scored the winning goal in extra time in the 2014 World Cup final?", options: ["Thomas Muller", "Bastian Schweinsteiger", "Mario Gotze", "Andre Schurrle"], ans: 2 },
  { q: "Which 3 countries will co-host the 2026 World Cup?", options: ["USA, Mexico, Canada", "Spain, Portugal, Morocco", "Japan, South Korea, China", "UK, Ireland, France"], ans: 0 },
  { q: "Who is the oldest player to ever score in a World Cup?", options: ["Roger Milla", "Pele", "Rafa Marquez", "Cristiano Ronaldo"], ans: 0 }
];

let sessionTrivia = [];
let currentTriviaIndex = 0;
let triviaScore = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startNewTriviaSession() {
  let shuffled = shuffleArray([...allTriviaQuestions]);
  sessionTrivia = shuffled.slice(0, 5);
  currentTriviaIndex = 0;
  triviaScore = 0;
  document.getElementById('triviaScore').innerText = triviaScore;
  loadTriviaQuestion();
}

function loadTriviaQuestion() {
  const container = document.getElementById('triviaMain');
  if(currentTriviaIndex >= sessionTrivia.length) {
    container.innerHTML = `
      <div class="trivia-question">Quiz Complete!</div>
      <div class="trivia-feedback" style="color:var(--wc-green);">Final Score: ${triviaScore} / ${sessionTrivia.length * 100}</div>
      <button class="trivia-btn interactive" style="margin-top:20px; border-color:var(--wc-cyan);" onclick="startNewTriviaSession()">PLAY NEW ROUND</button>
    `;
    return;
  }

  let qData = sessionTrivia[currentTriviaIndex];
  let optionsHtml = qData.options.map((opt, idx) => 
    `<button class="trivia-btn interactive" onclick="checkTriviaAnswer(${idx}, ${qData.ans})">${opt}</button>`
  ).join('');

  container.innerHTML = `
    <div class="trivia-question">${qData.q}</div>
    <div class="trivia-options">${optionsHtml}</div>
    <div id="triviaFeedback" class="trivia-feedback"></div>
  `;
  
  // Re-attach audio click listeners to new DOM buttons
  document.querySelectorAll('.trivia-btn').forEach(el => {
    el.addEventListener('click', playClickSound);
  });
}

function checkTriviaAnswer(selected, correct) {
  const feedback = document.getElementById('triviaFeedback');
  const buttons = document.querySelectorAll('.trivia-btn');
  buttons.forEach(b => b.disabled = true);

  if(selected === correct) {
    feedback.innerText = "CORRECT! +100";
    feedback.style.color = "var(--wc-green)";
    triviaScore += 100;
  } else {
    feedback.innerText = "WRONG!";
    feedback.style.color = "var(--wc-magenta)";
  }
  
  document.getElementById('triviaScore').innerText = triviaScore;
  
  setTimeout(() => {
    currentTriviaIndex++;
    loadTriviaQuestion();
  }, 1500);
}

// --- 7. GAME 5: CROSSBAR CHALLENGE ---
const cCtx = document.getElementById('crossbarCanvas').getContext('2d');
let cScore = 0;
let cPower = 0; let cPowerDir = 2; let cShotActive = false; let cAnimating = false;
let cbBall = { x: 400, y: 350, r: 10, targetY: 350 };
const cbZoneMin = 75; const cbZoneMax = 85;

function updateCrossbar() {
  cCtx.clearRect(0, 0, 800, 400);

  cCtx.fillStyle = '#fff';
  cCtx.fillRect(240, 50, 320, 10); 
  cCtx.fillRect(240, 50, 10, 150); 
  cCtx.fillRect(550, 50, 10, 150); 
  
  if(!cShotActive) {
    cPower += cPowerDir;
    if(cPower > 100 || cPower < 0) cPowerDir *= -1;
  }

  cCtx.fillStyle = 'rgba(255,255,255,0.2)'; cCtx.fillRect(700, 50, 30, 300);
  cCtx.fillStyle = 'rgba(0,255,135,0.5)'; cCtx.fillRect(700, 350 - (cbZoneMax/100 * 300), 30, ((cbZoneMax-cbZoneMin)/100 * 300));
  
  let pHeight = (cPower / 100) * 300;
  cCtx.fillStyle = cShotActive ? '#ff5400' : '#4cc9f0';
  cCtx.fillRect(700, 350 - pHeight, 30, pHeight);

  if(cAnimating) {
    cbBall.y += (cbBall.targetY - cbBall.y) * 0.1;
    cbBall.r -= (cbBall.r - 4) * 0.1; 
    if(Math.abs(cbBall.y - cbBall.targetY) < 2) {
      cAnimating = false;
      let hit = (cPower >= cbZoneMin && cPower <= cbZoneMax);
      if(hit) {
        cScore++; document.getElementById('crossbarScoreBoard').innerText = cScore;
        createConfetti(400, 55, ['#ff5400', '#fff', '#00ff87']);
        triggerOverlay('crossbarOverlay', "CLANG!", "#ff5400");
      } else {
        cScore = 0; document.getElementById('crossbarScoreBoard').innerText = cScore;
        triggerOverlay('crossbarOverlay', cPower > cbZoneMax ? "OVER!" : "TOO LOW!", "#f72585");
      }
      setTimeout(() => { cShotActive = false; cbBall.y = 350; cbBall.r = 10; cPower = 0; }, 1500);
    }
  }

  cCtx.beginPath(); cCtx.arc(cbBall.x, cbBall.y, cbBall.r, 0, Math.PI*2);
  cCtx.fillStyle = '#fff'; cCtx.fill(); cCtx.stroke();
  drawParticles(cCtx);
}

document.getElementById('crossbarCanvas').addEventListener('click', () => {
  if(!cShotActive && activeTab === 'crossbarTab') {
    cShotActive = true; cAnimating = true;
    cbBall.targetY = 350 - (cPower / 100 * 350); 
    if(cPower >= cbZoneMin && cPower <= cbZoneMax) cbBall.targetY = 55; 
  }
});


// --- 8. GAME 6: DRIBBLE DASH (REAL DEFENDER IMAGES) ---
const dCtx = document.getElementById('dribbleCanvas').getContext('2d');
let dScore = 0; let dFrames = 0; let dSpeedMultiplier = 1; let dDead = false;
let dbBall = { x: 400, y: 350, r: 12 };
let dEnemies = [];

// Real picture of a defender slide tackling
const defenderImg = new Image();
defenderImg.src = 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=150&q=80';

function resetDribble() {
  dScore = 0; dFrames = 0; dSpeedMultiplier = 1; dDead = false; dEnemies = [];
  dbBall.x = 400; document.getElementById('dribbleScoreBoard').innerText = dScore;
}

function updateDribble() {
  dCtx.clearRect(0, 0, 800, 400);

  if(!dDead) {
    dFrames++;
    if(dFrames % 10 === 0) { dScore += 10; document.getElementById('dribbleScoreBoard').innerText = dScore; }
    if(dFrames % 600 === 0) dSpeedMultiplier += 0.5; 

    if(Math.random() < 0.05 * dSpeedMultiplier) {
      dEnemies.push({ x: Math.random() * 730, y: -50, w: 70, h: 40, speed: Math.random() * 3 + 2 * dSpeedMultiplier });
    }

    for(let i = dEnemies.length - 1; i >= 0; i--) {
      let e = dEnemies[i];
      e.y += e.speed;
      
      dCtx.drawImage(defenderImg, e.x, e.y, e.w, e.h);

      if(dbBall.x + dbBall.r > e.x && dbBall.x - dbBall.r < e.x + e.w &&
         dbBall.y + dbBall.r > e.y && dbBall.y - dbBall.r < e.y + e.h) {
        dDead = true;
        triggerOverlay('dribbleOverlay', "TACKLED!", "#9d4edd");
        setTimeout(resetDribble, 2000);
      }
      if(e.y > 400) dEnemies.splice(i, 1);
    }
  }

  dCtx.beginPath(); dCtx.arc(dbBall.x, dbBall.y, dbBall.r, 0, Math.PI*2);
  dCtx.fillStyle = '#fff'; dCtx.fill(); dCtx.lineWidth = 2; dCtx.strokeStyle = '#000'; dCtx.stroke();
}

document.getElementById('dribbleCanvas').addEventListener('mousemove', (e) => {
  if(!dDead && activeTab === 'dribbleTab') {
    const rect = document.getElementById('dribbleCanvas').getBoundingClientRect();
    dbBall.x = (e.clientX - rect.left) * (800 / rect.width);
    if(dbBall.x < dbBall.r) dbBall.x = dbBall.r;
    if(dbBall.x > 800 - dbBall.r) dbBall.x = 800 - dbBall.r;
  }
});


// --- UTILS ---
function triggerOverlay(id, text, color) {
  const overlay = document.getElementById(id);
  overlay.innerText = text; overlay.style.color = color;
  overlay.style.textShadow = `0 0 20px ${color}`; overlay.classList.add('show');
  if(id === 'gameOverlay') pCelebrating = true;
  
  setTimeout(() => {
    overlay.classList.remove('show');
    if(id === 'gameOverlay') { pCelebrating = false; pBall.x = 400; pBall.y = 350; }
    if(id === 'targetOverlay') { tBall.x = 400; tBall.y = 350; tBall.scale = 1.0; }
    particles = [];
  }, 1500);
}

// Initialize on Load
renderGroups();
renderSchedule();
gameLoop();
