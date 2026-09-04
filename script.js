// ============================================================
//  CONFIG — PIN = 070926
// ============================================================
const BIRTH_PIN = '070926';
const SONG_URL = 'musik.mp3';

// Foto — ganti dengan foto sendiri (foto1.jpg, foto2.jpg, dst.)
const photos = [
    { url: 'foto1.jpeg', caption: '💕 Senyum terindah' },
    { url: 'foto2.jpeg', caption: '🌅 Matahari terbit' },
    { url: 'foto3.jpeg', caption: '🌸 Bunga untukmu' },
    { url: 'foto4.jpeg', caption: '✨ Bintang favoritku' },
    { url: 'foto5.jpeg', caption: '🌹 Cinta abadi' },
    { url: 'foto6.jpeg', caption: '💫 Cahaya hidupku' },
    { url: 'foto7.jpeg', caption: '🌺 Kecantikanmu' },
    { url: 'foto8.jpeg', caption: '🌈 Pelangi cinta' },
    { url: 'foto9.jpeg', caption: '💗 Hatiku untukmu' },
    { url: 'foto10.jpeg', caption: '🌟 Bintang penerang' },
];

// ============================================================
//  DOM REFS
// ============================================================
const pinScreen = document.getElementById('pinScreen');
const giftScreen = document.getElementById('giftScreen');
const birthdayScreen = document.getElementById('birthdayScreen');
const finalScreen = document.getElementById('finalScreen');
const pinInput = document.getElementById('pinInput');
const pinBtn = document.getElementById('pinBtn');
const pinError = document.getElementById('pinError');
const pinBox = document.querySelector('.pin-box');
const giftBox = document.getElementById('giftBox');
const giftLabel = document.getElementById('giftLabel');
const btnContinue = document.getElementById('btnContinue');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.getElementById('envelope');
const cardContainer = document.getElementById('cardContainer');
const cardOutside = document.getElementById('cardOutside');
const cardHeartsDeco = document.getElementById('cardHeartsDeco');
const envelopeHint = document.getElementById('envelopeHint');
const flowerCountFinal = document.getElementById('flowerCountFinal');
const btnBack = document.getElementById('btnBack');
const btnLihatFoto = document.getElementById('btnLihatFoto');
const galleryOverlay = document.getElementById('galleryOverlay');
const galleryTrack = document.getElementById('galleryTrack');
const galleryFloaters = document.getElementById('galleryFloaters');
const btnCloseGallery = document.getElementById('btnCloseGallery');
const pinDigits = document.getElementById('pinDigits');
const pinLoveEntrance = document.getElementById('pinLoveEntrance');
const pinLockBtn = document.getElementById('pinLockBtn');

let flowerBurstCount = 0;
let audio = null;
let isMusicPlaying = false;
let envelopeOpened = false;

// ============================================================
//  RENDER GALERI
// ============================================================
function renderGallery() {
    galleryTrack.innerHTML = '';
    for (let rep = 0; rep < 2; rep++) {
        photos.forEach(p => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${p.url}" alt="" loading="lazy" />`;
            galleryTrack.appendChild(div);
        });
    }
}
    try { renderGallery(); } catch (e) { console.error('renderGallery', e); }

// ============================================================
//  FLOATERS GALERI
// ============================================================
function createFloaters() {
    galleryFloaters.innerHTML = '';
    const icons = ['❤️', '💕', '💗', '💖', '🌸', '🌺', '🌹', '💐'];
    for (let i = 0; i < 16; i++) {
        const el = document.createElement('div');
        el.className = 'floating-icon';
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = (Math.random() * 90 + 5) + '%';
        el.style.top = (Math.random() * 80 + 10) + '%';
        el.style.animationDelay = (Math.random() * 5) + 's';
        el.style.animationDuration = (4 + Math.random() * 4) + 's';
        el.style.fontSize = (1.4 + Math.random() * 1.8) + 'rem';
        galleryFloaters.appendChild(el);
    }
}
    try { createFloaters(); } catch (e) { console.error('createFloaters', e); }

// ============================================================
//  PIN LOVE ENTRANCE ANIMATION
// ============================================================
function createPinLoveEntrance() {
    pinLoveEntrance.innerHTML = '';
    const items = ['❤️', '💕', '💗', '💖', '🌸', '🌺', '🌹', '🌷', '🌻', '💐'];
    for (let i = 0; i < 15; i++) {
        const el = document.createElement('div');
        el.className = 'love-particle';
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = (5 + Math.random() * 90) + '%';
        el.style.top = (10 + Math.random() * 80) + '%';
        el.style.setProperty('--delay', (Math.random() * 2) + 's');
        el.style.setProperty('--dur', (3 + Math.random() * 2) + 's');
        el.style.fontSize = (1.4 + Math.random() * 2) + 'rem';
        pinLoveEntrance.appendChild(el);
    }
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            const el = document.createElement('div');
            el.className = 'love-particle';
            el.textContent = items[Math.floor(Math.random() * items.length)];
            el.style.left = (5 + Math.random() * 90) + '%';
            el.style.top = (10 + Math.random() * 80) + '%';
            el.style.setProperty('--delay', (Math.random() * 2) + 's');
            el.style.setProperty('--dur', (3 + Math.random() * 2) + 's');
            el.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
            pinLoveEntrance.appendChild(el);
        }
    }, 2500);
}
    try { createPinLoveEntrance(); } catch (e) { console.error('createPinLoveEntrance', e); }

// ============================================================
//  SCREEN HELPER
// ============================================================
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active', 'hidden');
        s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
    screen.classList.add('active');
}

// ============================================================
//  PIN — FIXED with debug logs
// ============================================================
function handlePin() {
    const val = pinInput.value.trim();
    console.log('PIN entered:', val);

    const digits = pinDigits.querySelectorAll('.pin-digit');

    if (val === BIRTH_PIN) {
        console.log('PIN correct!');
        pinError.classList.remove('show');
        pinInput.classList.add('success');
        pinBtn.textContent = '✅ Berhasil!';
        pinBtn.classList.add('success-state');
        pinLockBtn.style.display = 'none';

        digits.forEach((d, i) => {
            setTimeout(() => {
                d.classList.remove('filled');
                d.classList.add('success');
                d.textContent = '✓';
            }, i * 120);
        });

        setTimeout(() => {
            pinBox.classList.add('pin-success-msg');
        }, 400);

        setTimeout(() => {
            pinBox.classList.remove('pin-success-msg');
            pinBox.classList.add('pin-loading');
        }, 1200);

        setTimeout(() => {
            showScreen(giftScreen);
            pinBox.classList.remove('pin-loading');
            pinLockBtn.style.display = '';
            setTimeout(() => openGiftBox(), 600);
        }, 2800);
    } else {
        console.log('PIN wrong');
        pinError.textContent = '💔 PIN salah, coba lagi ya sayang!';
        pinError.classList.add('show');
        pinInput.classList.add('shake');
        pinInput.value = '';
        pinInput.focus();

        digits.forEach((d, i) => {
            setTimeout(() => {
                d.classList.remove('filled');
                d.classList.add('error');
            }, i * 80);
        });

        setTimeout(() => {
            pinInput.classList.remove('shake');
            digits.forEach(d => {
                d.classList.remove('error');
                d.textContent = '';
            });
        }, 800);
    }
}

// Event listeners
pinBtn.addEventListener('click', function(e) {
    e.preventDefault();
    handlePin();
});

pinInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handlePin();
    }
});

pinDigits.addEventListener('click', function(e) {
    e.preventDefault();
    pinInput.focus();
});

pinLockBtn.addEventListener('click', function(e) {
    e.preventDefault();
    pinInput.focus();
});

pinInput.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 6);
    pinError.classList.remove('show');
    pinInput.classList.remove('shake', 'success');
    pinBtn.textContent = '✨ Buka';
    pinBtn.classList.remove('success-state');
    pinBtn.style.background = '';

    const digits = pinDigits.querySelectorAll('.pin-digit');
    digits.forEach((d, i) => {
        d.classList.remove('filled', 'error', 'success');
        if (i < this.value.length) {
            d.classList.add('filled');
            d.textContent = '●';
        } else {
            d.textContent = '';
        }
    });
});

// ============================================================
//  GIFT BOX
// ============================================================
let giftOpened = false;

function openGiftBox() {
    if (giftOpened) return;
    giftOpened = true;
    giftBox.classList.add('open');
    giftLabel.textContent = '🎉 Selamat! Kado terbuka!';

    const emojis = ['🌸', '🌺', '🌹', '🌷', '🌻', '💐', '🌼', '🌸', '🌺', '🌹', '🌷', '🌻', '💐', '🌼'];
    const colors = ['#e8437a', '#f8a5b8', '#ffdde4', '#ff6b8a', '#ffb3c6', '#ffd1dc', '#ffd700', '#ff6f61'];
    const rect = giftBox.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2 - 40;

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'flower-burst';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = 150 + Math.random() * 500;
            el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            el.style.setProperty('--ty', Math.sin(angle) * dist - 200 - Math.random() * 300 + 'px');
            el.style.left = (cx + (Math.random() - 0.5) * 80) + 'px';
            el.style.top = (cy + (Math.random() - 0.5) * 60) + 'px';
            el.style.fontSize = (1.8 + Math.random() * 3) + 'rem';
            el.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 3500);
            flowerBurstCount++;
            flowerCountFinal.textContent = flowerBurstCount;
        }, i * 70);
    }
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'celebration-piece';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.width = (5 + Math.random() * 10) + 'px';
            el.style.height = (5 + Math.random() * 10) + 'px';
            el.style.left = (cx + (Math.random() - 0.5) * 600) + 'px';
            el.style.top = (cy + (Math.random() - 0.5) * 400) + 'px';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            el.style.animationDuration = (2 + Math.random() * 2.5) + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 4500);
        }, i * 80);
    }
    setTimeout(() => {
        showScreen(birthdayScreen);
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const el = document.createElement('div');
                el.className = 'flower-burst';
                el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.5;
                el.style.setProperty('--tx', (Math.random() - 0.5) * 400 + 'px');
                el.style.setProperty('--ty', -300 - Math.random() * 400 + 'px');
                el.style.left = x + 'px';
                el.style.top = y + 'px';
                el.style.fontSize = (1.6 + Math.random() * 2.6) + 'rem';
                el.style.animationDuration = (2 + Math.random() * 1.5) + 's';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 3500);
                flowerBurstCount++;
                flowerCountFinal.textContent = flowerBurstCount;
            }, i * 120);
        }
    }, 3000);
}

// ============================================================
//  CONTINUE → SURAT
// ============================================================
btnContinue.addEventListener('click', function(e) {
    e.preventDefault();
    showScreen(finalScreen);
    generateCardHearts();

    envelope.classList.remove('open');
    cardOutside.classList.remove('show');
    cardOutside.style.transform = '';
    cardOutside.style.opacity = '';

    envelopeOpened = false;
    envelopeHint.textContent = '👆 Klik amplop untuk membuka';
    envelopeWrapper.classList.remove('hidden-envelope', 'opening');
    envelopeWrapper.style.opacity = '';
    envelopeWrapper.style.transform = '';
    envelopeWrapper.style.height = '';
    envelopeWrapper.style.margin = '';
    cardContainer.classList.remove('hidden-card');

    if (audio) { audio.pause();
        isMusicPlaying = false; }
});

// ============================================================
//  ENVELOPE
// ============================================================
function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;
    envelope.classList.add('open');
    envelopeHint.textContent = '💌 Membuka surat...';

    setTimeout(() => {
        envelopeWrapper.classList.add('opening');
    }, 400);

    setTimeout(() => {
        envelopeWrapper.classList.add('hidden-envelope');
        envelopeHint.textContent = '';
        cardOutside.classList.add('show');
        playMusik();
        burstCelebration();
    }, 1100);
}

envelopeWrapper.addEventListener('click', function(e) {
    e.stopPropagation();
    openEnvelope();
});
envelopeHint.addEventListener('click', function(e) {
    e.stopPropagation();
    openEnvelope();
});

// ============================================================
//  TOMBOL LIHAT FOTO
// ============================================================
btnLihatFoto.addEventListener('click', function(e) {
    e.stopPropagation();
    galleryOverlay.classList.add('active');
});

// ============================================================
//  TUTUP GALERI
// ============================================================
btnCloseGallery.addEventListener('click', () => {
    galleryOverlay.classList.remove('active');
});
galleryOverlay.addEventListener('click', (e) => {
    if (e.target === galleryOverlay) {
        galleryOverlay.classList.remove('active');
    }
});

// ============================================================
//  MUSIK
// ============================================================
function playMusik() {
    if (!audio) {
        audio = new Audio(SONG_URL);
        audio.loop = true;
        audio.volume = 0.5;
    }
    audio.play().then(() => isMusicPlaying = true).catch(() => isMusicPlaying = false);
}

// ============================================================
//  CELEBRATION
// ============================================================
function burstCelebration() {
    const emojis = ['🌸', '🌺', '🌹', '🌷', '🌻', '💐', '🌼', '🌸', '🌺', '🌹', '🌷', '🌻', '💐', '🌼'];
    const colors = ['#e8437a', '#f8a5b8', '#ffdde4', '#ff6b8a', '#ffb3c6', '#ffd1dc', '#ffd700', '#ff6f61'];
    const rect = envelopeWrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'flower-burst';
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            const angle = Math.random() * Math.PI * 2;
            const dist = 80 + Math.random() * 400;
            el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            el.style.setProperty('--ty', Math.sin(angle) * dist - 100 - Math.random() * 300 + 'px');
            el.style.left = (cx + (Math.random() - 0.5) * 60) + 'px';
            el.style.top = (cy + (Math.random() - 0.5) * 40) + 'px';
            el.style.fontSize = (1.6 + Math.random() * 2.8) + 'rem';
            el.style.animationDuration = (1.8 + Math.random() * 1.5) + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 3500);
            flowerBurstCount++;
            flowerCountFinal.textContent = flowerBurstCount;
        }, i * 80);
    }
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'celebration-piece';
            el.style.background = colors[Math.floor(Math.random() * colors.length)];
            el.style.width = (5 + Math.random() * 10) + 'px';
            el.style.height = (5 + Math.random() * 10) + 'px';
            el.style.left = (cx + (Math.random() - 0.5) * 500) + 'px';
            el.style.top = (cy + (Math.random() - 0.5) * 300) + 'px';
            el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            el.style.animationDuration = (2 + Math.random() * 2.5) + 's';
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 4500);
        }, i * 90);
    }
}

// ============================================================
//  CARD HEARTS
// ============================================================
function generateCardHearts() {
    cardHeartsDeco.innerHTML = '';
    const hearts = ['❤️', '💕', '💗', '💖', '🌸', '🌺'];
    for (let i = 0; i < 14; i++) {
        const el = document.createElement('div');
        el.className = 'h-part';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDelay = (Math.random() * 3) + 's';
        el.style.fontSize = (0.8 + Math.random() * 1.6) + 'rem';
        cardHeartsDeco.appendChild(el);
    }
}

// ============================================================
//  NAVIGASI KEMBALI
// ============================================================
btnBack.addEventListener('click', function(e) {
    e.preventDefault();
    showScreen(birthdayScreen);
    if (audio) { audio.pause();
        isMusicPlaying = false; }
});

// ============================================================
//  BACKGROUND PARTICLES (Canvas)
// ============================================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resizeCanvas() { w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const heartsBg = [];
const HEART_COUNT = 18;
class HeartParticle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = 10 + Math.random() * 22;
        this.speedX = (Math.random() - 0.5) * 0.25;
        this.speedY = (Math.random() - 0.5) * 0.25 - 0.08;
        this.opacity = 0.08 + Math.random() * 0.18;
        this.phase = Math.random() * Math.PI * 2;
        this.type = Math.random() > 0.5 ? 'heart' : 'circle';
    }
    update() {
        this.x += this.speedX + Math.sin(this.phase) * 0.15;
        this.y += this.speedY + Math.cos(this.phase * 0.7) * 0.1;
        this.phase += 0.01;
        if (this.x < -30) this.x = w + 30;
        if (this.x > w + 30) this.x = -30;
        if (this.y < -30) this.y = h + 30;
        if (this.y > h + 30) this.y = -30;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        const s = this.size * 0.5;
        ctx.fillStyle = '#e8437a';
        ctx.translate(this.x, this.y);
        if (this.type === 'heart') {
            ctx.beginPath();
            ctx.moveTo(0, s * 0.3);
            ctx.bezierCurveTo(-s * 0.7, -s * 0.4, -s * 0.9, s * 0.3, 0, s * 0.9);
            ctx.bezierCurveTo(s * 0.9, s * 0.3, s * 0.7, -s * 0.4, 0, s * 0.3);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}
for (let i = 0; i < HEART_COUNT; i++) heartsBg.push(new HeartParticle());

function animateBg() {
    ctx.clearRect(0, 0, w, h);
    heartsBg.forEach(h => { h.update();
        h.draw(); });
    requestAnimationFrame(animateBg);
}
animateBg();

// ============================================================
//  FLOATING HEARTS (DOM)
// ============================================================
function createFloatingHeart() {
    const el = document.createElement('div');
    el.className = 'floating-heart';
    el.textContent = ['❤️', '💕', '💗', '🌸'][Math.floor(Math.random() * 4)];
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    el.style.animationDuration = (15 + Math.random() * 20) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 35000);
}
for (let i = 0; i < 5; i++) setTimeout(createFloatingHeart, i * 1000);
setInterval(() => {
    if (document.querySelector('.screen.active')) createFloatingHeart();
}, 6000);

// ============================================================
//  INIT
// ============================================================
setTimeout(() => pinInput.focus(), 400);
showScreen(pinScreen);
console.log('✅ Semua siap! PIN: ' + BIRTH_PIN);
console.log('📸 Tombol "Lihat Foto" di samping tombol Kembali.');