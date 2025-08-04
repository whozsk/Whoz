function randtitle() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\\:;?><,./-=';
    const zalgo = ['\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306', '\u0307', '\u0308', '\u0309'];
    let title = '';
    
    const len = Math.floor(Math.random() * 20) + 10;
    
    for (let i = 0; i < len; i++) {
        let char = chars.charAt(Math.floor(Math.random() * chars.length));
        
        const zalgoamt = Math.floor(Math.random() * 5) + 1;
        for (let j = 0; j < zalgoamt; j++) {
            const z = zalgo[Math.floor(Math.random() * zalgo.length)];
            char += z;
        }
        
        title += char;
    }
    
    return title;
}

setInterval(() => {
    document.title = randtitle();
}, 1000);

function addsymbols() {
    const symbols = ['⛧', '☠', '⚰', '⛥', '⍟', '⚝', '✞', '⚔', '♰', '⛇', '☦', '⚶', '☽', '☮', '♱', '⚕', '⚸'];
    const container = document.body;
    
    for (let i = 0; i < 12; i++) {
        const sym = document.createElement('div');
        sym.className = 'floating-symbol';
        sym.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        sym.style.left = `${Math.random() * 100}vw`;
        sym.style.animationDuration = `${Math.random() * 30 + 15}s`;
        sym.style.animationDelay = `${Math.random() * 10}s`;
        sym.style.opacity = `${Math.random() * 0.2 + 0.05}`;
        sym.style.fontSize = `${Math.random() * 3 + 1}rem`;
        
        container.appendChild(sym);
    }
}

let actx;
let gain;
let audio;

function playsong() {
    if (!actx) {
        actx = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    } else {
        audio = new Audio('knife.mp3');
    }
    
    audio.play().catch(e => console.error('Audio playback failed:', e));
    
    const source = actx.createMediaElementSource(audio);
    gain = actx.createGain();
    
    gain.gain.value = 0;
    
    source.connect(gain);
    gain.connect(actx.destination);
    
    gain.gain.linearRampToValueAtTime(0, actx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, actx.currentTime + 3);
}

function animcards() {
    const cards = document.querySelectorAll('.profile-card, .side-card');
    
    cards.forEach((card, idx) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 300 + (idx * 200));
    });
}

document.getElementById('enterBtn').addEventListener('click', function() {
    const welcome = document.getElementById('welcomeScreen');
    const main = document.getElementById('mainContent');
    
    welcome.style.opacity = '0';
    
    try {
        playsong();
    } catch (e) {
        console.error('Audio playback failed:', e);
    }
    
    setTimeout(() => {
        welcome.style.display = 'none';
        main.style.display = 'block';
        
        setTimeout(() => {
            main.style.opacity = '1';
            
            animcards();
            
            const icons = document.querySelectorAll('.social-icon');
            icons.forEach((icon, idx) => {
                setTimeout(() => {
                    icon.style.transform = 'translateY(0)';
                    icon.style.opacity = '1';
                }, idx * 150);
            });
        }, 100);
        
    }, 500);
});

function setupicons() {
    const icons = document.querySelectorAll('.social-icon');
    const urls = [
        'https://discord.com/users/1390203577292816487',
        'https://www.tiktok.com/@hopingyoudnotice',
        'https://www.instagram.com/fedharm/'
    ];
    
    icons.forEach((icon, idx) => {
        icon.style.transform = 'translateY(20px)';
        icon.style.opacity = '0';
        icon.style.transition = 'transform 0.5s ease, opacity 0.5s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease';
        
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            window.open(urls[idx], '_blank');
        });
    });
}

(function() {
    const og_getid = document.getElementById;
    const og_query = document.querySelector;
    const og_queryall = document.querySelectorAll;
    const og_getclass = document.getElementsByClassName;
    const og_gettag = document.getElementsByTagName;
    
    document.getElementById = function(id) {
        return og_getid.call(document, id);
    };
    
    document.querySelector = function(sel) {
        return og_query.call(document, sel);
    };
    
    document.querySelectorAll = function(sel) {
        return og_queryall.call(document, sel);
    };
    
    document.getElementsByClassName = function(cls) {
        return og_getclass.call(document, cls);
    };
    
    document.getElementsByTagName = function(tag) {
        return og_gettag.call(document, tag);
    };
    
    window.eval = function() {
        throw new Error(atob("QWNjZXNzIGRlbmllZA=="));
    };
    
    Object.defineProperty(window, 'console', {
        get: function() {
            if (new Error().stack.includes('eval')) {
                return {
                    log: function() {},
                    warn: function() {},
                    error: function() {},
                    info: function() {},
                    debug: function() {}
                };
            }
            return console;
        }
    });
    
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.addEventListener('keydown', function(e) {
        if (
            e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || 
            (e.ctrlKey && e.keyCode === 85)
        ) {
            e.preventDefault();
            return false;
        }
    });
    
    setInterval(function() {
        const devtools = /./;
        devtools.toString = function() {
            if (!this.opened) {
                this.opened = true;
                window.location.href = "about:blank";
            }
            return '';
        };
        console.log('%c', devtools);
    }, 1000);
    
    window.addEventListener('devtoolschange', function(e) {
        if (e.detail.open) {
            window.location.href = "about:blank";
        }
    });
})();

(function() {
    const styles = document.createElement('style');
    styles.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
    `;
    document.head.appendChild(styles);
    
    window.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    document.body.setAttribute('unselectable', 'on');
    document.body.setAttribute('onselectstart', 'return false');
})();

window[atob('b25sb2Fk')] = function() {
    setTimeout(function() {
        window[atob('b25jb250ZXh0bWVudQ==')] = function() {
            return false;
        };
        setupicons();
        addsymbols();
    }, 100);
}; 
