const starCanvas = document.getElementById('starCanvas');
const starCtx = starCanvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;

starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;

const trailCanvas = document.getElementById('trailCanvas');
const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  grainCanvas.width = window.innerWidth;
  grainCanvas.height = window.innerHeight;
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
});

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

const container = document.querySelector('.container');
container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  const rotateX = (mouseY / rect.height) * -20;
  const rotateY = (mouseX / rect.width) * 20;
  container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

container.addEventListener('mouseleave', () => {
  container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

const profile = document.querySelector('.profile');
profile.addEventListener('mousemove', (e) => {
  const rect = profile.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  const rotateX = (mouseY / rect.height) * -20;
  const rotateY = (mouseX / rect.width) * 20;
  profile.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

profile.addEventListener('mouseleave', () => {
  profile.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

const serverInvite = document.querySelector('.server-invite');
serverInvite.addEventListener('mousemove', (e) => {
  const rect = serverInvite.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  const rotateX = (mouseY / rect.height) * -20;
  const rotateY = (mouseX / rect.width) * 20;
  serverInvite.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

serverInvite.addEventListener('mouseleave', () => {
  serverInvite.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

const audioControls = document.querySelector('.audio-controls');
audioControls.addEventListener('mousemove', (e) => {
  const rect = audioControls.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const mouseX = e.clientX - centerX;
  const mouseY = e.clientY - centerY;
  const rotateX = (mouseY / rect.height) * -20;
  const rotateY = (mouseX / rect.width) * 20;
  audioControls.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

audioControls.addEventListener('mouseleave', () => {
  audioControls.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
});

const clickToEnter = document.querySelector('.click-to-enter');
clickToEnter.addEventListener('click', () => {
  clickToEnter.classList.add('fading');
  setTimeout(() => {
    clickToEnter.remove();
  }, 500);
});

const grainCanvas = document.getElementById('grainCanvas');
const grainCtx = grainCanvas.getContext('2d');
grainCanvas.width = window.innerWidth;
grainCanvas.height = window.innerHeight;

const grains = [];
const numGrains = 200;

for (let i = 0; i < numGrains; i++) {
  grains.push({
    x: Math.random() * grainCanvas.width,
    y: Math.random() * grainCanvas.height,
    radius: Math.random() * 1 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5
  });
}

function animateGrains() {
  grainCtx.clearRect(0, 0, grainCanvas.width, grainCanvas.height);

  grains.forEach(grain => {
    grain.x += grain.vx;
    grain.y += grain.vy;

    if (grain.x < 0 || grain.x > grainCanvas.width) grain.vx *= -1;
    if (grain.y < 0 || grain.y > grainCanvas.height) grain.vy *= -1;

    grain.opacity = Math.max(0.1, Math.min(0.4, grain.opacity + (Math.random() - 0.5) * 0.02));

    grainCtx.beginPath();
    grainCtx.arc(grain.x, grain.y, grain.radius, 0, Math.PI * 2);
    grainCtx.fillStyle = `rgba(255, 255, 255, ${grain.opacity})`;
    grainCtx.fill();
  });

  if (clickToEnter.parentNode) {
    requestAnimationFrame(animateGrains);
  }
}

animateGrains();

const trailDots = [];

document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 2; i++) {
    trailDots.push({
      x: e.clientX,
      y: e.clientY,
      radius: Math.random() * 0.5 + 0.5,
      opacity: 1,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2 + 1,
      color: Math.random() < 0.5 ? 'rgba(255, 255, 255, ' : 'rgba(255, 0, 0, '
    });
  }
});

function animateTrail() {
  trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

  trailDots.forEach((dot, index) => {
    dot.x += dot.vx;
    dot.y += dot.vy;
    dot.opacity -= 0.02;

    if (dot.opacity <= 0) {
      trailDots.splice(index, 1);
      return;
    }

    trailCtx.beginPath();
    trailCtx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    trailCtx.fillStyle = `${dot.color}${dot.opacity})`;
    trailCtx.fill();
  });

  requestAnimationFrame(animateTrail);
}

animateTrail();

const stars = [];
const numStars = 50;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    originX: Math.random() * starCanvas.width,
    originY: Math.random() * starCanvas.height,
    radius: Math.random() * 2 + 1,
    angle: Math.random() * Math.PI * 2,
    orbitRadius: Math.random() * 20 + 10,
    speed: (Math.random() * 0.005 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
    mouseInfluence: 0,
    color: Math.random() < 0.3 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
  });
}

function animateStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  stars.forEach(star => {
    const dx = mouseX - star.originX;
    const dy = mouseY - star.originY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 300;

    star.mouseInfluence = distance < maxDistance ? (1 - distance / maxDistance) * 0.02 : 0;

    star.angle += star.speed + star.mouseInfluence;

    star.x = star.originX + Math.cos(star.angle) * star.orbitRadius;
    star.y = star.originY + Math.sin(star.angle) * star.orbitRadius;

    if (star.x < 0) star.x = starCanvas.width;
    if (star.x > starCanvas.width) star.x = 0;
    if (star.y < 0) star.y = starCanvas.height;
    if (star.y > starCanvas.height) star.y = 0;

    starCtx.beginPath();
    starCtx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    starCtx.fillStyle = star.color;
    starCtx.shadowBlur = 10;
    starCtx.shadowColor = star.color.includes('255, 0, 0') ? '#f00' : '#fff';
    starCtx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();

const audio = document.getElementById('backgroundMusic');
const volumeSlider = document.getElementById('volumeSlider');

audio.volume = 0.3;
volumeSlider.style.setProperty('--volume', `${audio.volume * 100}%`);

const playAudio = () => {
  if (audio.paused) {
    audio.play().then(() => {
      console.log('Autoplay successful');
    }).catch(error => {
      console.log('Autoplay failed:', error);
      const tryPlayOnInteraction = () => {
        audio.play().then(() => {
          console.log('Interaction play successful');
          document.removeEventListener('click', tryPlayOnInteraction);
          document.removeEventListener('touchstart', tryPlayOnInteraction);
          document.removeEventListener('keydown', tryPlayOnInteraction);
        }).catch(err => console.log('Interaction play failed:', err));
      };
      document.addEventListener('click', tryPlayOnInteraction, { once: true });
      document.addEventListener('touchstart', tryPlayOnInteraction, { once: true });
      document.addEventListener('keydown', tryPlayOnInteraction, { once: true });
    });
  }
};
window.addEventListener('load', playAudio);

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
  volumeSlider.style.setProperty('--volume', `${audio.volume * 100}%`);
});

// Secret key feature
const infoIcon = document.querySelector('.info-icon');
const secretPopup = document.getElementById('secretPopup');
const secretKeyInput = document.getElementById('secretKeyInput');
const errorMessage = document.getElementById('errorMessage');
const secretContent = document.getElementById('secretContent');
let inputSequence = '';
let isInfoHovered = false;

infoIcon.addEventListener('mouseenter', () => {
  isInfoHovered = true;
});

infoIcon.addEventListener('mouseleave', () => {
  isInfoHovered = false;
  inputSequence = ''; // Reset sequence on mouse leave
});

document.addEventListener('keypress', (e) => {
  if (!isInfoHovered) return;
  inputSequence += e.key.toLowerCase();
  if (inputSequence.length > 5) {
    inputSequence = inputSequence.slice(-5);
  }
  if (inputSequence === 'skelt') {
    secretPopup.style.display = 'block';
    secretKeyInput.focus();
    inputSequence = ''; // Reset sequence
  }
});

async function validateKey(key) {
    const response = await fetch('https://whoz-backend.onrender.com/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    return response.json();
  }
  try {
    const response = await fetch('http://localhost:3000/api/validate-key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key })
    });
    const data = await response.json();
    if (data.valid) {
      secretPopup.style.display = 'none';
      secretContent.style.display = 'block';
      secretKeyInput.value = '';
    } else {
      errorMessage.textContent = data.message || 'Invalid or expired key';
    }
  } catch (error) {
    errorMessage.textContent = 'Error validating key';
    console.error('Validation error:', error);
  }

function closeSecretContent() {
  secretContent.style.display = 'none';
}